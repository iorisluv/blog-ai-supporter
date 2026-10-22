export interface PromptParams {
  role: string;
  task: string;
  context: string;
  constraints: string[];
  outputFormat: string;
  major?: string;
}

export interface PromptEvaluation {
  score: number; // 0 - 100
  hasRole: boolean;
  hasContext: boolean;
  hasConstraints: boolean;
  hasOutputFormat: boolean;
  hasHallucinationSafeguards: boolean;
  suggestions: string[];
  levelLabel: string;
}

export function assembleRTCEPrompt(params: PromptParams): string {
  const constraintsList = params.constraints && params.constraints.length > 0
    ? params.constraints.map((c, i) => `${i + 1}. ${c}`).join('\n')
    : '1. Trình bày lập luận khách quan, có trích dẫn logic suy luận từng bước (Chain-of-Thought).\n2. Không tự bịa đặt số liệu hay nguồn tài liệu không có thực (chống hallucination).';

  return `### [VAI TRÒ / PERSONA]
${params.role.trim() || 'Bạn là một Chuyên gia cố vấn học thuật và Giảng viên hướng dẫn đại học.'}

### [BỐI CẢNH & ĐỐI TƯỢNG (CONTEXT)]
${params.context.trim() || 'Tôi là sinh viên đại học đang nghiên cứu và hoàn thiện học phần.'}

### [NHIỆM VỤ CỐT LÕI (TASK)]
${params.task.trim()}

### [RÀNG BUỘC & TIÊU CHUẨN THỰC THI (CONSTRAINTS)]
${constraintsList}

### [ĐỊNH DẠNG ĐẦU RA (OUTPUT FORMAT)]
${params.outputFormat.trim() || '- Tóm tắt ngắn gọn các luận điểm chính\n- Phân tích chi tiết từng khía cạnh kèm ví dụ thực tế\n- 2 câu hỏi phản biện mở để người học tự tư duy'}`;
}

export function evaluatePromptQuality(promptText: string): PromptEvaluation {
  if (!promptText || promptText.trim().length === 0) {
    return {
      score: 0,
      hasRole: false,
      hasContext: false,
      hasConstraints: false,
      hasOutputFormat: false,
      hasHallucinationSafeguards: false,
      suggestions: ['Hãy nhập nội dung prompt để hệ thống phân tích và chấm điểm.'],
      levelLabel: 'Chưa có dữ liệu'
    };
  }

  const textLower = promptText.toLowerCase();
  const suggestions: string[] = [];
  let score = 30; // base score for having non-empty input

  // Check Persona / Role
  const roleKeywords = ['bạn là', 'đóng vai', 'vai trò', 'chuyên gia', 'giáo sư', 'giảng viên', 'mentor', 'persona', 'as an expert', 'act as'];
  const hasRole = roleKeywords.some(k => textLower.includes(k));
  if (hasRole) {
    score += 15;
  } else {
    suggestions.push('Thiếu thiết lập Persona: Hãy bắt đầu bằng cách gán vai trò cụ thể cho AI (Ví dụ: "Bạn là giảng viên hướng dẫn môn...")');
  }

  // Check Context
  const contextKeywords = ['bối cảnh', 'tôi là', 'sinh viên', 'đang làm', 'đồ án', 'tiểu luận', 'nghiên cứu', 'context', 'năm 2', 'năm 3', 'năm 4'];
  const hasContext = contextKeywords.some(k => textLower.includes(k));
  if (hasContext) {
    score += 15;
  } else {
    suggestions.push('Thiếu bối cảnh người học: Nêu rõ trình độ hiện tại, môn học và mục tiêu đầu ra cụ thể.');
  }

  // Check Constraints
  const constraintKeywords = ['ràng buộc', 'lưu ý', 'yêu cầu', 'không được', 'tuyệt đối không', 'chú ý', 'constraints', 'quy tắc', 'tiêu chuẩn'];
  const hasConstraints = constraintKeywords.some(k => textLower.includes(k));
  if (hasConstraints) {
    score += 15;
  } else {
    suggestions.push('Thiếu ràng buộc thực thi: Cần giới hạn độ dài, phong cách diễn đạt hoặc cấm câu trả lời chung chung.');
  }

  // Check Hallucination safeguards
  const safeguardKeywords = ['hallucination', 'ảo giác', 'bịa đặt', 'chính xác', 'kiểm chứng', 'trích dẫn', 'nguồn gốc', 'suy luận từng bước', 'chain-of-thought', 'nếu không chắc'];
  const hasHallucinationSafeguards = safeguardKeywords.some(k => textLower.includes(k));
  if (hasHallucinationSafeguards) {
    score += 15;
  } else {
    suggestions.push('Chưa có rào chắn chống ảo giác: Hãy thêm điều kiện "Nếu dữ liệu chưa chắc chắn hãy nêu rõ giả định, không tự bịa nguồn trích dẫn".');
  }

  // Check Output Format
  const formatKeywords = ['định dạng', 'format', 'bảng', 'gạch đầu dòng', 'danh sách', 'mục lục', 'json', 'markdown', 'các bước'];
  const hasOutputFormat = formatKeywords.some(k => textLower.includes(k));
  if (hasOutputFormat) {
    score += 10;
  } else {
    suggestions.push('Thiếu chỉ định định dạng đầu ra: Yêu cầu AI trình bày theo bảng so sánh, danh sách có thứ tự hoặc các gạch đầu dòng rõ ràng.');
  }

  // Length factor
  if (promptText.trim().length > 120) {
    score += 5;
  }

  const finalScore = Math.min(100, Math.max(10, score));

  let levelLabel = 'Cần cải thiện (Sơ cấp)';
  if (finalScore >= 85) {
    levelLabel = 'Xuất sắc (Chuẩn RTCE Master)';
  } else if (finalScore >= 65) {
    levelLabel = 'Khá tốt (Đầy đủ tiêu chí cốt lõi)';
  } else if (finalScore >= 45) {
    levelLabel = 'Trung bình (Cần bổ sung ràng buộc)';
  }

  return {
    score: finalScore,
    hasRole,
    hasContext,
    hasConstraints,
    hasOutputFormat,
    hasHallucinationSafeguards,
    suggestions: suggestions.length > 0 ? suggestions : ['Prompt đã đạt cấu trúc học thuật hoàn chỉnh!'],
    levelLabel
  };
}
