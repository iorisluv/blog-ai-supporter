import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

interface AcademicReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicReviewModal: React.FC<AcademicReviewModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [focusArea, setFocusArea] = useState<string>('Tính logic, lập luận phản biện và nguy cơ ảo giác/đạo văn');
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleReview = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setReviewResult(null);

    try {
      const res = await fetch('/api/review-academic-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, focusArea })
      });
      const data = await res.json();
      setReviewResult(data);
    } catch (err) {
      console.error('Error reviewing academic text:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                AI Mentor: Phản Biện Luận Điểm Tiểu Luận
              </h3>
              <p className="text-xs text-slate-500">Mô phỏng góc nhìn phản biện của Giảng viên hướng dẫn.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dán đoạn văn luận, đề cương hoặc luận điểm bạn chuẩn bị nộp:
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ví dụ: Đề tài của em tập trung vào việc áp dụng GenAI trong dịch thuật y khoa, tuy nhiên hiện tại các thuật ngữ chuyên sâu vẫn còn nhiều sai sót..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Trọng tâm phản biện cần AI kiểm tra:
            </label>
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="Tính logic, lập luận phản biện và nguy cơ ảo giác/đạo văn">
                Tính logic, lập luận phản biện và nguy cơ ảo giác/đạo văn
              </option>
              <option value="Tính xác thực của số liệu và căn cứ học thuật">
                Tính xác thực của số liệu và căn cứ học thuật
              </option>
              <option value="Độ sâu của giải pháp và tính khả thi trong thực tế">
                Độ sâu của giải pháp và tính khả thi trong thực tế
              </option>
            </select>
          </div>

          <button
            onClick={handleReview}
            disabled={loading || !content.trim()}
            className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Mentor đang mổ xẻ luận điểm...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bắt đầu phản biện luận điểm</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {reviewResult && (
          <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Kết Quả Đánh Giá Phản Biện
              </span>
              <span className="text-sm font-extrabold text-blue-700 tabular-nums">
                Điểm học thuật: {reviewResult.scoreOutOf10}/10
              </span>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Điểm mạnh đã đạt:</span>
                </span>
                <ul className="space-y-1 text-slate-700">
                  {reviewResult.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>• {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
                <span className="font-bold text-rose-800 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Lỗ hổng cần gia cố:</span>
                </span>
                <ul className="space-y-1 text-slate-700">
                  {reviewResult.weaknesses?.map((w: string, idx: number) => (
                    <li key={idx}>• {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Counter Arguments */}
            {reviewResult.counterArguments && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-900">Câu hỏi chất vấn hội đồng có thể đặt ra:</span>
                <ul className="space-y-1 text-slate-700">
                  {reviewResult.counterArguments.map((c: string, idx: number) => (
                    <li key={idx} className="italic">• "{c}"</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestion */}
            {reviewResult.improvementSuggestion && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-700 space-y-1">
                <span className="font-bold text-blue-900">Gợi ý cách viết lại nâng cấp:</span>
                <p className="leading-relaxed">{reviewResult.improvementSuggestion}</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
