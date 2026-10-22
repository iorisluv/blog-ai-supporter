import React from 'react';
import { ArrowRight, Compass, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onStartQuiz }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background soft accent */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-blue-50/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-indigo-50/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed editorial category kicker (Anti-slop: NO PILLS) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
              <span>Sổ tay Năng lực AI 2026</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Dành riêng cho Sinh viên Đại học Việt Nam</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Tối Ưu Hóa Năng Lực Ứng Dụng GenAI Trong Học Tập & Làm Việc
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Nâng cấp từ việc dùng AI như công cụ tìm kiếm đơn thuần sang đối tác tư duy phản biện (Thought Partner). 
              Làm chủ kỹ thuật Prompt RTCE, tự động hóa đọc tài liệu 100+ trang và xây dựng lợi thế cạnh tranh cho đồ án, NCKH và phỏng vấn việc làm.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartQuiz}
                className="px-5 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Khởi tạo Lộ trình cá nhân hóa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('playbook')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Thực hành Prompt Lab</span>
              </button>
            </div>

            {/* 3 Value Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chuẩn hóa RTCE:</strong> Rõ Persona, Bối cảnh, Ràng buộc và Định dạng.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Liêm chính học thuật:</strong> Chống ảo giác (Hallucination) và trích dẫn chuẩn DOI.</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Thực chiến 5 khối ngành:</strong> Kinh tế, IT, Y Dược, KHXH và Đồ án tốt nghiệp.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-900 group">
              <img
                src="/src/assets/images/student_genai_hero_1792592965185.jpg"
                alt="Sinh viên đại học ứng dụng GenAI trong thư viện học tập nhóm"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
                  Môi trường học tập thế hệ mới
                </span>
                <p className="text-sm font-medium text-slate-100 leading-snug">
                  "AI không thay thế sinh viên, nhưng sinh viên biết ứng dụng AI thông minh sẽ dẫn đầu."
                </p>
                <span className="text-[11px] text-slate-300 mt-1">
                  Đại học Quốc gia & Khảo sát Năng lực Sinh viên 2026
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
