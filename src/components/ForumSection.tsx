import React, { useState } from 'react';
import { INITIAL_FORUM_POSTS, ForumPost, ForumComment } from '../data/quizQuestions.ts';
import { MessageSquare, Heart, Bookmark, PlusCircle, Search, Send, Copy, Check, Filter, X, Sparkles, User, GraduationCap } from 'lucide-react';

export const ForumSection: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // New Post Modal
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newUni, setNewUni] = useState<string>('');
  const [newMajor, setNewMajor] = useState<string>('');
  const [newYear, setNewYear] = useState<string>('Năm 3');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Học tập & Ôn thi');
  const [newContent, setNewContent] = useState<string>('');
  const [newPrompt, setNewPrompt] = useState<string>('');
  const [newTags, setNewTags] = useState<string>('Kinh nghiệm, Sinh viên');

  // Expanded comments map
  const [expandedCommentPostId, setExpandedCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const categories = ['Tất cả', 'Kinh nghiệm NCKH', 'Học tập & Ôn thi', 'Đồ án & Nhóm', 'Kỹ năng đi làm', 'Đạo đức & Tranh luận'];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handleToggleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isBookmarked: !p.isBookmarked };
      }
      return p;
    }));
  };

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleAddComment = (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      authorName: 'Bạn (Sinh viên)',
      university: 'Đại học tại Việt Nam',
      timestamp: 'Vừa xong',
      content: commentText
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) {
      alert('Vui lòng điền đầy đủ tiêu đề, họ tên và nội dung chia sẻ!');
      return;
    }

    const createdPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle.trim(),
      authorName: newAuthor.trim(),
      university: newUni.trim() || 'Đại học Quốc gia',
      major: newMajor.trim() || 'Đa ngành',
      year: newYear,
      category: newCategory,
      content: newContent.trim(),
      promptShared: newPrompt.trim() || undefined,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      upvotes: 1,
      comments: []
    };

    setPosts(prev => [createdPost, ...prev]);
    setShowNewPostModal(false);

    // Reset form
    setNewTitle('');
    setNewContent('');
    setNewPrompt('');
  };

  return (
    <section id="forum-section" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
              Diễn Đàn Trao Đổi Kinh Nghiệm
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Cộng Đồng Sinh Viên Ứng Dụng GenAI
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Nơi sinh viên các trường đại học chia sẻ ca thực tế, mẹo làm đồ án, thảo luận về liêm chính học thuật và các bộ prompt cứu cánh lúc 2h sáng.
            </p>
          </div>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Đăng bài chia sẻ</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Categories */}
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

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm thảo luận, prompt, trường..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder-slate-400 shadow-xs"
            />
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800">Chưa có bài thảo luận phù hợp</h3>
              <p className="text-xs text-slate-500 mt-1">Hãy là người đầu tiên chia sẻ kinh nghiệm của bạn cho cộng đồng!</p>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
              >
                Viết bài ngay
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isCommentsOpen = expandedCommentPostId === post.id;
              const isCopied = copiedPromptId === post.id;

              return (
                <div
                  key={post.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
                >
                  {/* Post Header: Author info & Category */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">
                        {post.authorName.split(' ').map(n => n[0]).slice(-2).join('')}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                          <span>{post.authorName}</span>
                          <span className="text-[11px] font-normal text-slate-400">({post.year} · {post.major})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-slate-400" />
                          <span>{post.university}</span>
                        </div>
                      </div>
                    </div>

                    {/* Unboxed Metadata (NO PILLS) */}
                    <div className="text-xs font-semibold text-blue-700">
                      {post.category}
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Attached Prompt (if any) */}
                  {post.promptShared && (
                    <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                        <span className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-amber-400">
                          <Sparkles className="w-3 h-3" />
                          <span>Prompt Chia Sẻ Từ Tác Giả</span>
                        </span>
                        <button
                          onClick={() => handleCopyPrompt(post.id, post.promptShared!)}
                          className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Đã chép!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap leading-relaxed text-slate-200 max-h-48 overflow-y-auto">
                        {post.promptShared}
                      </pre>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    {post.tags.map((t, idx) => (
                      <React.Fragment key={t}>
                        {idx > 0 && <span aria-hidden="true" className="text-slate-300">·</span>}
                        <span className="text-slate-500">#{t}</span>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Actions: Upvote, Comment, Bookmark */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <span className="tabular-nums">Hữu ích ({post.upvotes})</span>
                      </button>

                      <button
                        onClick={() => setExpandedCommentPostId(isCommentsOpen ? null : post.id)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span className="tabular-nums">Bình luận ({post.comments.length})</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleBookmark(post.id)}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        post.isBookmarked
                          ? 'border-blue-200 bg-blue-50 text-blue-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title="Lưu bài thảo luận"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${post.isBookmarked ? 'fill-blue-600' : ''}`} />
                    </button>
                  </div>

                  {/* Expanded Comments Thread */}
                  {isCommentsOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in">
                      {/* Comments List */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                              <div className="flex items-center justify-between text-slate-500">
                                <span className="font-bold text-slate-800">{comment.authorName} ({comment.university})</span>
                                <span>{comment.timestamp}</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                          placeholder="Viết phản hồi hoặc đặt câu hỏi cho tác giả..."
                          className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Gửi</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Modal: Đăng bài chia sẻ mới */}
        {showNewPostModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Chia Sẻ Kinh Nghiệm Ứng Dụng GenAI</h3>
                  <p className="text-xs text-slate-500">Đóng góp kinh nghiệm thực tế giúp cộng đồng sinh viên cùng tiến bộ.</p>
                </div>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                
                {/* Author + University row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên của bạn</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Trường đại học</label>
                    <input
                      type="text"
                      required
                      value={newUni}
                      onChange={(e) => setNewUni(e.target.value)}
                      placeholder="Ví dụ: ĐH Bách Khoa / ĐH Ngoại Thương"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    />
                  </div>
                </div>

                {/* Major + Year + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Chuyên ngành</label>
                    <input
                      type="text"
                      value={newMajor}
                      onChange={(e) => setNewMajor(e.target.value)}
                      placeholder="Ví dụ: CNTT, Kinh tế..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Năm học</label>
                    <select
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    >
                      <option>Năm 1</option>
                      <option>Năm 2</option>
                      <option>Năm 3</option>
                      <option>Năm 4</option>
                      <option>Học viên cao học</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Chủ đề chia sẻ</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    >
                      <option value="Học tập & Ôn thi">Học tập & Ôn thi</option>
                      <option value="Kinh nghiệm NCKH">Kinh nghiệm NCKH</option>
                      <option value="Đồ án & Nhóm">Đồ án & Nhóm</option>
                      <option value="Kỹ năng đi làm">Kỹ năng đi làm</option>
                      <option value="Đạo đức & Tranh luận">Đạo đức & Tranh luận</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tiêu đề bài viết</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ví dụ: Cách mình tận dụng AI làm slide thuyết trình đồ án..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-bold"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nội dung chi tiết (Phương pháp, kết quả, bài học rút ra)</label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Mô tả cụ thể cách bạn đã áp dụng công cụ AI..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 leading-relaxed"
                  />
                </div>

                {/* Optional Prompt */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Đính kèm Prompt bạn đã dùng (Tùy chọn)</label>
                  <textarea
                    rows={3}
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    placeholder="Dán câu lệnh prompt chuẩn mà bạn thấy hiệu quả nhất..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 text-slate-100 font-mono rounded-lg focus:outline-none border border-slate-800"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Thẻ tag (Phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="Ôn thi, Mẹo hay, Đồ án"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                  >
                    Đăng bài ngay
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
