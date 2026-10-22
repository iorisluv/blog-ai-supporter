import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { PlaybookSection } from './components/PlaybookSection.tsx';
import { RoadmapSection } from './components/RoadmapSection.tsx';
import { ForumSection } from './components/ForumSection.tsx';
import { PromptLabSection } from './components/PromptLabSection.tsx';
import { AcademicReviewModal } from './components/AcademicReviewModal.tsx';
import { Footer } from './components/Footer.tsx';
import { PromptTemplate } from './data/promptLibrary.ts';
import { Sparkles, MessageSquare, Compass, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('blog');
  const [preloadedPrompt, setPreloadedPrompt] = useState<string>('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const handleOpenPromptLabWithPrompt = (promptText: string) => {
    setPreloadedPrompt(promptText);
    setActiveTab('promptlab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPromptLabWithTemplate = (template: PromptTemplate) => {
    setPreloadedPrompt(template.promptText);
    setActiveTab('promptlab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuizFromHero = () => {
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuiz={handleStartQuizFromHero}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section shown on default view or when exploring */}
        {activeTab === 'blog' && (
          <HeroSection
            onNavigate={setActiveTab}
            onStartQuiz={handleStartQuizFromHero}
          />
        )}

        {/* Tab 1: Blog Articles */}
        {activeTab === 'blog' && (
          <BlogSection
            onOpenPromptLabWithPrompt={handleOpenPromptLabWithPrompt}
          />
        )}

        {/* Tab 2: Hands-on Playbook & AI Tools Directory */}
        {activeTab === 'playbook' && (
          <PlaybookSection
            onOpenPromptLabWithTemplate={handleOpenPromptLabWithTemplate}
          />
        )}

        {/* Tab 3: Personalized Learning Roadmap */}
        {activeTab === 'roadmap' && (
          <RoadmapSection
            onOpenPromptLab={() => setActiveTab('promptlab')}
          />
        )}

        {/* Tab 4: Student Forum */}
        {activeTab === 'forum' && (
          <ForumSection />
        )}

        {/* Tab 5: Prompt Lab & RTCE Optimizer */}
        {activeTab === 'promptlab' && (
          <PromptLabSection
            initialPrompt={preloadedPrompt}
          />
        )}

      </main>

      {/* Floating Action: Quick AI Academic Review */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer border border-blue-500/30 group"
          title="Thử phản biện một đoạn văn luận của bạn với AI Mentor"
        >
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span>AI Mentor: Phản biện bài viết</span>
        </button>
      </div>

      {/* Academic Review Modal */}
      <AcademicReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
