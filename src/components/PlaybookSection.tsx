import React, { useState } from 'react';
import { PROMPT_TEMPLATES, PromptTemplate, AI_TOOLS_DIRECTORY, AITool } from '../data/promptLibrary.ts';
import { Copy, Check, ExternalLink, ArrowRight, Sparkles, Filter, Wrench, BookOpen, Layers } from 'lucide-react';

interface PlaybookSectionProps {
  onOpenPromptLabWithTemplate: (template: PromptTemplate) => void;
}

export const PlaybookSection: React.FC<PlaybookSectionProps> = ({ onOpenPromptLabWithTemplate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'prompts' | 'tools'>('prompts');
  const [selectedMajorFilter, setSelectedMajorFilter] = useState<string>('Tất cả');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const majorCategories = ['Tất cả', 'Kinh tế & QTKD', 'CNTT & Kỹ thuật', 'Y Dược & Tự nhiên', 'KHXH & Ngôn ngữ', 'Nghiên cứu & Học thuật'];

  const filteredTemplates = PROMPT_TEMPLATES.filter((template) => {
    return selectedMajorFilter === 'Tất cả' || template.category === selectedMajorFilter;
  });

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="playbook-section" className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 pb-8 border-b border-slate-200">
          <div className="lg:col-span-8">
            <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
              Kho Công Cụ & Thư Viện Thực Hành
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Playbook Thực Chiến: Prompt Mẫu & AI Stack Sinh Viên
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Các bộ khung prompt chuyên ngành theo chuẩn RTCE được kiểm định bởi giảng viên, kèm bộ công cụ AI tối ưu chi phí và hiệu suất cho sinh viên.
            </p>

            {/* Sub-tab navigation */}
            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => setActiveSubTab('prompts')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                  activeSubTab === 'prompts'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thư viện Prompt Mẫu Chuyên Ngành ({PROMPT_TEMPLATES.length})</span>
              </button>
              
              <button
                onClick={() => setActiveSubTab('tools')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                  activeSubTab === 'tools'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Danh bạ AI Stack Sinh Viên ({AI_TOOLS_DIRECTORY.length})</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img
                src="/src/assets/images/prompt_lab_cover_1792592965940.jpg"
                alt="Góc làm việc học tập với kỹ thuật Prompt Engineering"
                className="w-full h-44 object-cover object-center group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-medium text-white">
                  Không gian thực hành chuẩn hóa kỹ năng AI 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SUBTAB 1: PROMPT TEMPLATES */}
        {activeSubTab === 'prompts' && (
          <div>
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 mb-8 p-1 bg-slate-100 rounded-xl max-w-fit">
              {majorCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedMajorFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedMajorFilter === cat
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => {
                const isCopied = copiedId === template.id;

                return (
                  <div
                    key={template.id}
                    className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 transition-colors shadow-xs"
                  >
                    <div>
                      {/* Unboxed Metadata (NO PILLS) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-blue-700">{template.category}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>Độ khó: {template.difficulty}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-slate-600">Dùng tốt nhất: {template.bestFor}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {template.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        {template.description}
                      </p>

                      {/* Prompt Box */}
                      <div className="mt-4 relative rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
                        <pre className="whitespace-pre-wrap">{template.promptText}</pre>
                      </div>

                      {/* Tips */}
                      <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
                        <span className="font-bold text-amber-600 shrink-0">Mẹo nhỏ:</span>
                        <span>{template.tips}</span>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => handleCopyPrompt(template.id, template.promptText)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã sao chép vào bộ nhớ!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Sao chép Prompt</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onOpenPromptLabWithTemplate(template)}
                        className="px-3.5 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Chỉnh sửa trong Trợ lý RTCE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBTAB 2: AI TOOLS DIRECTORY */}
        {activeSubTab === 'tools' && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between flex-wrap gap-3">
              <div>
                <h4 className="text-sm font-bold text-blue-900">Ma trận AI Stack chuẩn dành riêng cho Sinh viên</h4>
                <p className="text-xs text-blue-700 mt-0.5">
                  Tập trung vào các công cụ có phiên bản miễn phí mạnh mẽ và tối ưu tính liêm chính học thuật.
                </p>
              </div>
              <span className="text-xs text-blue-800 font-semibold">Cập nhật kỳ 2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI_TOOLS_DIRECTORY.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div>
                    {/* Unboxed Metadata (NO PILLS) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-blue-700">{tool.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-emerald-700 font-medium">{tool.pricing}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>{tool.name}</span>
                      <span className="text-[11px] font-normal text-slate-400">({tool.badge})</span>
                    </h3>

                    {/* Best use cases list */}
                    <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                      <div className="font-semibold text-slate-800">Các kịch bản dùng tốt nhất:</div>
                      {tool.bestUseCases.map((uc, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{uc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pros and Limitations */}
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-2">
                      <div>
                        <span className="font-semibold text-emerald-700">Điểm mạnh cho SV:</span>{' '}
                        <span className="text-slate-600">{tool.studentPros}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-700">Hạn chế cần lưu ý:</span>{' '}
                        <span className="text-slate-600">{tool.limitations}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visit link */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Truy cập công cụ</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
