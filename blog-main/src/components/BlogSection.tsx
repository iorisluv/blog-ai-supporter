import React, { useState } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles.ts';
import { Search, BookOpen, Clock, Heart, Bookmark, ArrowRight, Share2, Check, X, Sparkles, AlertCircle, Quote } from 'lucide-react';

interface BlogSectionProps {
  onOpenPromptLabWithPrompt?: (prompt: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenPromptLabWithPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [savedArticles, setSavedArticles] = useState<Record<string, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = ['Tất cả', 'Phương pháp luận', 'Nghiên cứu khoa học', 'Kỹ năng làm việc', 'Liêm chính học thuật', 'Công cụ thực hành'];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCat = selectedCategory === 'Tất cả' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleToggleLike = (articleId: string, initialLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap(prev => {
      const current = prev[articleId] ?? initialLikes;
      const isLiked = prev[`${articleId}_liked`];
      return {
        ...prev,
        [articleId]: isLiked ? current - 1 : current + 1,
        [`${articleId}_liked`]: isLiked ? 0 : 1,
      };
    });
  };

  const handleToggleSave = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="blog-section" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
            Chuyên mục Học thuật & Kỹ năng
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Chuyên Đề Tối Ưu Năng Lực GenAI Cho Sinh Viên
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Các bài viết nghiên cứu chuyên sâu, khung tư duy học thuật và cẩm nang thực hành đúc kết từ giảng viên và thủ khoa đại học.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Segmented Control Filter (Functional buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết, tác giả, tag..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder-slate-400 transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc chọn chuyên mục "Tất cả" để xem danh sách đầy đủ.
            </p>
            <button
              onClick={() => { setSelectedCategory('Tất cả'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
            >
              Xem tất cả bài viết
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const currentLikes = likesMap[article.id] ?? article.likes;
              const isLiked = !!likesMap[`${article.id}_liked`];
              const isSaved = !!savedArticles[article.id];

              return (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer group hover:border-blue-300"
                >
                  <div>
                    {/* Unboxed Metadata Header (NO PILLS) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-blue-700">{article.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {article.readTimeMinutes} phút đọc
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{article.publishDate}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Tags (Unboxed text with dots) */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      {article.tags.map((tag, i) => (
                        <React.Fragment key={tag}>
                          {i > 0 && <span aria-hidden="true" className="text-slate-300">·</span>}
                          <span className="text-slate-500 hover:text-blue-600">#{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Author + Interactions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                        {article.author.avatarInitials}
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-semibold text-slate-800 block leading-tight">
                          {article.author.name}
                        </span>
                        <span className="text-[11px] text-slate-500 block leading-tight truncate max-w-[130px]">
                          {article.author.university}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleToggleLike(article.id, article.likes, e)}
                        className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                          isLiked ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Thích bài viết"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                        <span className="tabular-nums">{currentLikes}</span>
                      </button>

                      <button
                        onClick={(e) => handleToggleSave(article.id, e)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Lưu bài viết"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-500' : ''}`} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-700">{selectedArticle.category}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{selectedArticle.readTimeMinutes} phút đọc</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Đóng bài viết"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Title & Author Info */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {selectedArticle.title}
                </h1>
                
                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold text-sm flex items-center justify-center border border-blue-200">
                    {selectedArticle.author.avatarInitials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{selectedArticle.author.name}</div>
                    <div className="text-xs text-slate-500">
                      {selectedArticle.author.role} · {selectedArticle.author.university}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Điểm Mấu Chốt Sinh Viên Cần Nắm</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content Sections */}
              <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedArticle.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {/* Callouts */}
                    {section.callout && (
                      <div className={`mt-3 p-4 rounded-xl border ${
                        section.callout.type === 'warning'
                          ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                          : section.callout.type === 'prompt'
                          ? 'bg-slate-900 text-slate-100 border-slate-800'
                          : 'bg-amber-50/70 border-amber-200 text-amber-950'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 font-bold text-xs">
                            {section.callout.type === 'warning' && <AlertCircle className="w-4 h-4 text-rose-600" />}
                            {section.callout.type === 'prompt' && <Sparkles className="w-4 h-4 text-amber-400" />}
                            {section.callout.type === 'tip' && <Quote className="w-4 h-4 text-amber-600" />}
                            <span>{section.callout.title}</span>
                          </div>
                          {section.callout.type === 'prompt' && (
                            <button
                              onClick={() => handleCopyText(section.callout!.content, sIdx)}
                              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-slate-200 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedIndex === sIdx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Đã chép!</span>
                                </>
                              ) : (
                                <>
                                  <span>Sao chép Prompt</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed opacity-90">
                          {section.callout.content}
                        </pre>
                        {section.callout.type === 'prompt' && onOpenPromptLabWithPrompt && (
                          <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                            <button
                              onClick={() => {
                                onOpenPromptLabWithPrompt(section.callout!.content);
                                setSelectedArticle(null);
                              }}
                              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                            >
                              <span>Mở prompt này trong Bộ Tối Ưu RTCE</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Article Footer Actions */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleToggleLike(selectedArticle.id, selectedArticle.likes, e)}
                    className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Hữu ích ({likesMap[selectedArticle.id] ?? selectedArticle.likes})</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedArticle.title,
                          text: selectedArticle.summary,
                          url: window.location.href,
                        }).catch(() => {});
                      } else {
                        handleCopyText(window.location.href, 999);
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-slate-500" />
                    <span>Chia sẻ cho bạn học</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Đóng bài viết
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
