import React, { useState, useEffect } from 'react';
import { assembleRTCEPrompt, evaluatePromptQuality, PromptParams, PromptEvaluation } from '../utils/promptBuilder.ts';
import { Sparkles, Copy, Check, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

interface PromptLabSectionProps {
  initialPrompt?: string;
}

export const PromptLabSection: React.FC<PromptLabSectionProps> = ({ initialPrompt }) => {
  const [role, setRole] = useState<string>('Giáo sư Cố vấn học thuật & Chuyên gia phản biện đồ án');
  const [context, setContext] = useState<string>('Tôi là sinh viên đại học đang nghiên cứu hoàn thiện bài tập lớn.');
  const [task, setTask] = useState<string>(initialPrompt || 'Phân tích các yếu tố ảnh hưởng và đề xuất giải pháp cụ thể cho vấn đề nghiên cứu.');
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([
    'Trình bày lập luận khách quan, có trích dẫn logic suy luận từng bước (Chain-of-Thought).',
    'Nếu dữ liệu chưa chắc chắn hãy nêu rõ giả định, tuyệt đối không tự bịa nguồn hay số liệu (chống hallucination).',
    'Đưa ra 2 câu hỏi phản biện mở để kích thích người học tự tư duy sâu hơn.'
  ]);
  const [outputFormat, setOutputFormat] = useState<string>('- Tóm tắt tổng quan 3 điểm cốt lõi\n- Phân tích chi tiết từng luận điểm có ví dụ thực tiễn\n- Bảng đối chiếu so sánh hoặc checklist hành động');
  
  const [assembledPrompt, setAssembledPrompt] = useState<string>('');
  const [evaluation, setEvaluation] = useState<PromptEvaluation>({
    score: 0,
    hasRole: false,
    hasContext: false,
    hasConstraints: false,
    hasOutputFormat: false,
    hasHallucinationSafeguards: false,
    suggestions: [],
    levelLabel: ''
  });

  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Update prompt whenever params change
  useEffect(() => {
    const promptParams: PromptParams = {
      role,
      context,
      task,
      constraints: selectedConstraints,
      outputFormat
    };
    const assembled = assembleRTCEPrompt(promptParams);
    setAssembledPrompt(assembled);
    setEvaluation(evaluatePromptQuality(assembled));
  }, [role, context, task, selectedConstraints, outputFormat]);

  const handleToggleConstraint = (text: string) => {
    setSelectedConstraints(prev =>
      prev.includes(text) ? prev.filter(c => c !== text) : [...prev, text]
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOptimizeWithGemini = async () => {
    setIsOptimizing(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawPrompt: task,
          major: 'Đại học',
          goal: 'Nghiên cứu & Học tập chất lượng cao'
        })
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error('Failed to optimize prompt with server API:', err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const samplePresets = [
    {
      name: 'Phân tích SWOT & Chiến lược',
      role: 'Giám đốc Chiến lược và Giảng viên Quản trị Kinh doanh',
      context: 'Sinh viên năm 3 làm bài tập phân tích tình huống doanh nghiệp',
      task: 'Lập ma trận SWOT và đề xuất chiến lược kết hợp SO, WO, ST, WT cho một chuỗi cà phê bán lẻ tại Việt Nam',
    },
    {
      name: 'Literature Review NCKH',
      role: 'Biên tập viên bình duyệt tạp chí khoa học quốc tế Scopus',
      context: 'Sinh viên đang viết Chương 1 Tổng quan nghiên cứu đề tài NCKH cấp trường',
      task: 'So sánh và chỉ ra khoảng trống nghiên cứu (Research Gap) giữa 3 phương pháp thu thập dữ liệu định lượng',
    },
    {
      name: 'Review Thuật toán & Code',
      role: 'Staff Software Engineer & Giảng viên môn Giải thuật',
      context: 'Sinh viên CNTT đang nộp bài thực hành thuật toán tìm đường đi ngắn nhất',
      task: 'Phân tích độ phức tạp thời gian/không gian của thuật toán Dijkstra và đề xuất 2 trường hợp kiểm thử biên (Edge-cases)',
    }
  ];

  return (
    <section id="promptlab-section" className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
            Phòng Thí Nghiệm Prompt RTCE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Bộ Tạo & Đánh Giá Chất Lượng Prompt Chuẩn Học Thuật
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Áp dụng cấu trúc Role - Task - Context - Execution để AI hiểu rõ bối cảnh môn học, loại bỏ ảo giác và cho ra kết quả áp dụng được ngay.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Bộ gợi ý nhanh:</span>
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setRole(preset.role);
                setContext(preset.context);
                setTask(preset.task);
              }}
              className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Main Grid: Form Left, Preview & Quality Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200">
            
            {/* R - Role */}
            <div>
              <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">R</span>
                <span>Role / Persona (Vai trò chuyên gia cho AI)</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ví dụ: Bạn là Giáo sư hướng dẫn môn..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            {/* C - Context */}
            <div>
              <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">C</span>
                <span>Context & Audience (Bối cảnh sinh viên & Ngành học)</span>
              </label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ví dụ: Tôi là sinh viên năm 3 làm tiểu luận..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            {/* T - Task */}
            <div>
              <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">T</span>
                <span>Task (Nhiệm vụ cốt lõi cần giải quyết)</span>
              </label>
              <textarea
                rows={3}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Nhập nhiệm vụ bài tập cụ thể..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 leading-relaxed"
              />
            </div>

            {/* E - Constraints */}
            <div>
              <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">E</span>
                <span>Execution Constraints (Rào chắn chống ảo giác & Tiêu chuẩn học thuật)</span>
              </label>
              <div className="space-y-2 pt-1">
                {[
                  'Trình bày lập luận khách quan, có trích dẫn logic suy luận từng bước (Chain-of-Thought).',
                  'Nếu dữ liệu chưa chắc chắn hãy nêu rõ giả định, tuyệt đối không tự bịa nguồn hay số liệu (chống hallucination).',
                  'Đưa ra 2 câu hỏi phản biện mở để kích thích người học tự tư duy sâu hơn.',
                  'Giữ văn phong học thuật chuẩn mực, không dùng từ ngữ cảm xúc thái quá.'
                ].map((cText, i) => {
                  const isChecked = selectedConstraints.includes(cText);
                  return (
                    <label
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleConstraint(cText)}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{cText}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-1.5">
                Định dạng đầu ra mong muốn
              </label>
              <textarea
                rows={2}
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleOptimizeWithGemini}
                disabled={isOptimizing || !task.trim()}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:bg-slate-300"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Mentor đang tối ưu...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tối ưu hóa với Gemini AI</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Live Preview & Quality Analysis */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quality Scorecard */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Chỉ số chất lượng Prompt
                  </span>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {evaluation.levelLabel}
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-blue-700 tabular-nums">
                  {evaluation.score}/100
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    evaluation.score >= 80 ? 'bg-emerald-500' : evaluation.score >= 50 ? 'bg-blue-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${evaluation.score}%` }}
                />
              </div>

              {/* Quality Checklist */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${evaluation.hasRole ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className={evaluation.hasRole ? 'text-slate-800 font-medium' : 'text-slate-400'}>Persona Chuyên gia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${evaluation.hasContext ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className={evaluation.hasContext ? 'text-slate-800 font-medium' : 'text-slate-400'}>Bối cảnh Sinh viên</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${evaluation.hasConstraints ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className={evaluation.hasConstraints ? 'text-slate-800 font-medium' : 'text-slate-400'}>Ràng buộc thực thi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${evaluation.hasHallucinationSafeguards ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className={evaluation.hasHallucinationSafeguards ? 'text-slate-800 font-medium' : 'text-slate-400'}>Chống ảo giác (Anti-hallucination)</span>
                </div>
              </div>

              {/* Suggestions */}
              {evaluation.suggestions.length > 0 && (
                <div className="pt-2 text-xs text-slate-600 space-y-1">
                  {evaluation.suggestions.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-500">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assembled RTCE Prompt Box */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Prompt Hoàn Chỉnh Sẵn Sàng Gửi AI</span>
                </span>
                <button
                  onClick={() => handleCopy(assembledPrompt)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto text-slate-200 opacity-95">
                {assembledPrompt}
              </div>
            </div>

            {/* AI Optimization Feedback (if triggered) */}
            {aiResult && (
              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-6 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Đánh Giá Của Gemini AI Mentor (Điểm: {aiResult.score}/100)</span>
                  </span>
                  <button
                    onClick={() => handleCopy(aiResult.optimizedPrompt)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Sao chép bản nâng cấp</span>
                  </button>
                </div>

                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  {aiResult.explanation}
                </p>

                {aiResult.exampleOutputPreview && (
                  <div className="p-3 bg-white/80 rounded-xl border border-blue-100 text-xs text-slate-600 italic">
                    <strong>Minh họa kết quả:</strong> {aiResult.exampleOutputPreview}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
