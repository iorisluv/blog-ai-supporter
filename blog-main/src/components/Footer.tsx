import React from 'react';
import { GraduationCap, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span>GenAI Sinh Viên</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Nền tảng blog, cẩm nang thực hành và lộ trình học tập cá nhân hóa nhằm tối ưu năng lực ứng dụng Trí tuệ Nhân tạo tạo sinh (GenAI) cho sinh viên đại học Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">Chuyên Mục</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer">
                  Chuyên đề Blog Học thuật
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('playbook')} className="hover:text-white transition-colors cursor-pointer">
                  Playbook Prompt & AI Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-white transition-colors cursor-pointer">
                  Lộ trình cá nhân hóa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forum')} className="hover:text-white transition-colors cursor-pointer">
                  Diễn đàn kinh nghiệm sinh viên
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Frameworks */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">Khung Tiêu Chuẩn</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Khung RTCE (Role - Task - Context - Execution)</li>
              <li>• Kỹ thuật Adversarial / Devil's Advocate</li>
              <li>• Grounded Knowledge với NotebookLM</li>
              <li>• Literature Review 3 vòng chuẩn Scopus</li>
              <li>• Bộ lọc chống Hallucination & Fact-Check</li>
            </ul>
          </div>

          {/* Academic Integrity Statement */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Liêm Chính Học Thuật</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Mọi tài liệu và prompt trên nền tảng tuân thủ nguyên tắc tôn trọng quyền tác giả và liêm chính học thuật. GenAI được định vị như một đối tác tư duy (Thought Partner), không thay thế quá trình nghiên cứu và sáng tạo tự thân của sinh viên.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Clean copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 GenAI Sinh Viên · Sáng kiến vì cộng đồng giáo dục đại học Việt Nam
          </div>
          <div className="flex items-center gap-4">
            <span>Thiết kế chuẩn hóa cho sinh viên các trường đại học</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
