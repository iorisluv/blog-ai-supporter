export interface QuizAnswer {
  questionId: number;
  score: number; // 1 to 4
}

export type CompetencyLevel = 'novice' | 'practitioner' | 'architect' | 'synthesizer';

export interface CompetencyResult {
  level: CompetencyLevel;
  levelName: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  tagline: string;
  summary: string;
  recommendedFocus: string[];
}

export interface RoadmapMilestone {
  id: string;
  stageNumber: number;
  stageTitle: string;
  stageSubtitle: string;
  tasks: RoadmapTask[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  toolRequired: string;
  actionableArtifact: string;
}

export function calculateCompetencyLevel(scores: number[]): CompetencyResult {
  if (!scores || scores.length === 0) {
    return {
      level: 'novice',
      levelName: 'Khởi đầu (AI Novice)',
      totalScore: 0,
      maxScore: 20,
      percentage: 0,
      tagline: 'Làm quen với AI cơ bản',
      summary: 'Bạn mới bắt đầu tiếp cận GenAI. Cần nắm vững cấu trúc prompt cơ bản và hiểu ranh giới liêm chính học thuật.',
      recommendedFocus: ['Cấu trúc prompt RTCE cơ bản', 'Phân biệt AI trợ giúp và đạo văn', 'Thực hành tóm tắt bài giảng với NotebookLM']
    };
  }

  const totalScore = scores.reduce((sum, s) => sum + s, 0);
  const maxScore = scores.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  if (percentage < 40) {
    return {
      level: 'novice',
      levelName: 'Khởi đầu (AI Novice)',
      totalScore,
      maxScore,
      percentage,
      tagline: 'Giai đoạn xây dựng nền tảng tư duy AI',
      summary: 'Bạn đang dùng AI như một công cụ tìm kiếm đơn thuần. Cần nâng cấp sang tư duy đối thoại phản biện và xây dựng prompt có cấu trúc.',
      recommendedFocus: [
        'Cấu trúc lệnh RTCE (Role - Task - Context - Execution)',
        'Cách tránh lỗi hallucination khi tra cứu tài liệu',
        'Sử dụng NotebookLM để biến slide bài giảng thành flashcard'
      ]
    };
  } else if (percentage < 65) {
    return {
      level: 'practitioner',
      levelName: 'Thực hành vững vàng (AI Practitioner)',
      totalScore,
      maxScore,
      percentage,
      tagline: 'Đã ứng dụng AI vào bài tập và tự học',
      summary: 'Bạn đã quen thuộc với ChatGPT/Gemini trong học tập nhưng vẫn còn phụ thuộc vào kết quả đầu tiên mà AI sinh ra mà chưa có kỹ năng phản biện chuyên sâu.',
      recommendedFocus: [
        'Kỹ thuật Few-Shot & Chain-of-Thought trong giải bài tập phức tạp',
        'Kỹ năng Fact-Checking đa nguồn với Perplexity và Consensus',
        'Tự động hóa ghi chú và quản lý tài liệu tham khảo với Zotero'
      ]
    };
  } else if (percentage < 85) {
    return {
      level: 'architect',
      levelName: 'Chiến lược gia Prompt (Prompt Architect)',
      totalScore,
      maxScore,
      percentage,
      tagline: 'Làm chủ quy trình tối ưu hiệu suất học tập & đồ án',
      summary: 'Bạn làm chủ kỹ năng prompt theo ngữ cảnh, biết kết hợp nhiều mô hình AI theo thế mạnh riêng và bảo vệ tính liêm chính học thuật.',
      recommendedFocus: [
        'Quy trình nghiên cứu khoa học với AI (Literature Review 3 vòng)',
        'Tự động hóa quy trình làm việc nhóm & chuẩn bị báo cáo thực tập',
        'Tối ưu hóa lập trình/phân tích dữ liệu với Cursor & Gemini'
      ]
    };
  } else {
    return {
      level: 'synthesizer',
      levelName: 'Bậc thầy tổng hợp (AI Synthesizer)',
      totalScore,
      maxScore,
      percentage,
      tagline: 'Dẫn đầu năng lực làm việc & nghiên cứu trong kỷ nguyên AI',
      summary: 'Bạn sở hữu tư duy AI cấp cao: coi GenAI là đối tác tư duy phản biện (Thought Partner), xây dựng quy trình tự động hóa cá nhân và cố vấn cho bạn học.',
      recommendedFocus: [
        'Xây dựng trợ lý học tập cá nhân tùy biến (Custom GPTs / System Prompts)',
        'Ứng dụng AI trong viết luận văn tốt nghiệp và công bố quốc tế',
        'Đóng góp ca thực tế trên diễn đàn cộng đồng sinh viên'
      ]
    };
  }
}

export function generatePersonalizedRoadmap(
  majorId: string,
  goalId: string,
  level: CompetencyLevel
): RoadmapMilestone[] {
  // Major specific artifacts & tools
  let majorSpecificTool = 'NotebookLM & ChatGPT';
  let domainTask = 'Phân tích tài liệu môn học chuyên ngành';
  let capstoneTitle = 'Đồ án môn học tích hợp phân tích AI';

  if (majorId === 'tech') {
    majorSpecificTool = 'Cursor & GitHub Copilot';
    domainTask = 'Thiết kế cấu trúc thuật toán & Review mã nguồn theo chuẩn Clean Code';
    capstoneTitle = 'Xây dựng dự án Full-stack/AI Mini-App chuẩn bị phỏng vấn IT';
  } else if (majorId === 'business') {
    majorSpecificTool = 'Gemini & Julius AI';
    domainTask = 'Phân tích báo cáo tài chính & Lập mô hình ma trận SWOT/PESTLE';
    capstoneTitle = 'Bản kế hoạch kinh doanh & Đề án Marketing số hoàn chỉnh';
  } else if (majorId === 'medicine') {
    majorSpecificTool = 'Consensus & PubMed AI';
    domainTask = 'Hệ thống hóa cơ chế bệnh sinh & Dược động học từ tài liệu chuẩn Y khoa';
    capstoneTitle = 'Báo cáo ca lâm sàng & Tổng quan y văn theo chuẩn y khoa quốc tế';
  } else if (majorId === 'social') {
    majorSpecificTool = 'Claude & Zotero';
    domainTask = 'Phân tích khung lý thuyết xã hội học & Đối chiếu án lệ pháp lý';
    capstoneTitle = 'Tiểu luận nghiên cứu chuyên sâu 5000 từ với trích dẫn APA chuẩn';
  }

  return [
    {
      id: 'stage-1',
      stageNumber: 1,
      stageTitle: 'Chặng 1: Nền tảng tư duy & Kỹ thuật Prompt RTCE',
      stageSubtitle: 'Xây dựng tư duy đối thoại phản biện và loại bỏ thói quen ra lệnh thô sơ',
      tasks: [
        {
          id: 'task-1-1',
          title: 'Nắm vững khung cấu trúc RTCE (Role - Task - Context - Execution)',
          description: 'Học cách thiết lập Persona học thuật và đưa ra các ràng buộc loại bỏ hallucination.',
          estimatedMinutes: 30,
          toolRequired: 'Gemini / Claude',
          actionableArtifact: 'Tạo bộ 3 prompt mẫu cho 3 môn học khó nhất học kỳ này'
        },
        {
          id: 'task-1-2',
          title: 'Thực hành kỹ thuật "Few-Shot Prompting" với 2 ví dụ chuẩn mẫu',
          description: 'Cung cấp ví dụ đầu vào và đầu ra mẫu để AI nắm bắt văn phong và chuẩn mực học thuật.',
          estimatedMinutes: 25,
          toolRequired: 'Prompt Lab',
          actionableArtifact: '1 bài tập mẫu kèm format phản hồi chuẩn chỉnh'
        },
        {
          id: 'task-1-3',
          title: 'Ký cam kết Liêm chính học thuật cá nhân',
          description: 'Xác định rõ ranh giới giữa AI hỗ trợ tư duy và hành vi gian lận vi phạm quy chế trường.',
          estimatedMinutes: 15,
          toolRequired: 'Quy chế trường & Hướng dẫn',
          actionableArtifact: 'Checklist 5 điểm tự kiểm tra tính nguyên bản của bài viết'
        }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      stageTitle: 'Chặng 2: Tăng tốc tổng hợp & Xử lý tài liệu 100+ trang',
      stageSubtitle: 'Chuyển hóa dữ liệu học phần đồ sộ thành trí nhớ dài hạn và flashcards',
      tasks: [
        {
          id: 'task-2-1',
          title: 'Xây dựng "Kho tri thức môn học" với Google NotebookLM',
          description: 'Tải lên slide bài giảng PDF, giáo trình môn học và tạo Audio Overview (Podcast tóm tắt bài học).',
          estimatedMinutes: 45,
          toolRequired: 'NotebookLM',
          actionableArtifact: '1 Notebook chứa toàn bộ 10 chương bài giảng kèm câu hỏi ôn tập'
        },
        {
          id: 'task-2-2',
          title: 'Kỹ thuật Literature Review 3 vòng tra cứu tài liệu khoa học',
          description: 'Sử dụng công cụ tìm kiếm học thuật có đối chứng để tìm các bài báo quốc tế uy tín.',
          estimatedMinutes: 40,
          toolRequired: 'Consensus & Perplexity',
          actionableArtifact: 'Bảng tổng hợp 5 bài báo khoa học liên quan trực tiếp đến đề tài'
        },
        {
          id: 'task-2-3',
          title: domainTask,
          description: 'Áp dụng prompt chuyên sâu vào nhiệm vụ cốt lõi của ngành học đã chọn.',
          estimatedMinutes: 50,
          toolRequired: majorSpecificTool,
          actionableArtifact: 'Bản phân tích chuyên sâu có cấu trúc logic và minh chứng'
        }
      ]
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      stageTitle: 'Chặng 3: Phản biện kép & Nâng tầm bài làm học thuật',
      stageSubtitle: 'Dùng AI làm đối thủ tranh biện (Adversarial Thinking) trước khi nộp bài cho Giảng viên',
      tasks: [
        {
          id: 'task-3-1',
          title: 'Quy trình "Devil\'s Advocate": Buộc AI tìm 3 lỗ hổng trong bài tiểu luận',
          description: 'Đưa toàn bộ đề cương hoặc đoạn văn vào AI với prompt đóng vai giám khảo khó tính nhất.',
          estimatedMinutes: 35,
          toolRequired: 'Claude 3.7 / Gemini 2.5',
          actionableArtifact: 'Bản chỉnh sửa phản hồi phản biện với các luận điểm được củng cố'
        },
        {
          id: 'task-3-2',
          title: 'Chuẩn hóa danh mục trích dẫn và kiểm định nguồn gốc (Fact-check)',
          description: 'Kiểm tra chéo từng đường link, DOI và tác giả để đảm bảo không dính tài liệu ma do AI bịa đặt.',
          estimatedMinutes: 30,
          toolRequired: 'Google Scholar & Zotero',
          actionableArtifact: 'Danh mục tài liệu tham khảo chuẩn APA 7th đã được xác thực 100%'
        }
      ]
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      stageTitle: 'Chặng 4: Tốt nghiệp & Bước đệm sự nghiệp chuyên nghiệp',
      stageSubtitle: 'Ứng dụng GenAI vào đồ án tốt nghiệp, CV, portfolio và phỏng vấn việc làm',
      tasks: [
        {
          id: 'task-4-1',
          title: capstoneTitle,
          description: 'Hoàn thiện dự án/đồ án hoàn chỉnh áp dụng toàn bộ kỹ năng GenAI đã được tích lũy.',
          estimatedMinutes: 120,
          toolRequired: majorSpecificTool,
          actionableArtifact: 'Báo cáo đồ án hoàn chỉnh kèm slide thuyết trình chuyên nghiệp'
        },
        {
          id: 'task-4-2',
          title: 'Tối ưu CV và Mock Interview phỏng vấn với AI Recruiter',
          description: 'Mô phỏng buổi phỏng vấn với nhà tuyển dụng chuyên môn cao qua chế độ đàm thoại tương tác.',
          estimatedMinutes: 45,
          toolRequired: 'Gemini Live / ChatGPT Voice',
          actionableArtifact: 'CV chuẩn ATS và kịch bản trả lời 10 câu hỏi tình huống hóc búa'
        }
      ]
    }
  ];
}

export function calculateProgress(tasks: { id: string; completed: boolean }[]): {
  completedCount: number;
  totalCount: number;
  percentage: number;
  isUnlockedCertificate: boolean;
} {
  if (!tasks || tasks.length === 0) {
    return { completedCount: 0, totalCount: 0, percentage: 0, isUnlockedCertificate: false };
  }
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const isUnlockedCertificate = percentage >= 80;

  return { completedCount, totalCount, percentage, isUnlockedCertificate };
}
