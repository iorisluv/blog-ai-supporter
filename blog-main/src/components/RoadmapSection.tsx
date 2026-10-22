import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions.ts';
import { calculateCompetencyLevel, generatePersonalizedRoadmap, calculateProgress, CompetencyResult, RoadmapMilestone } from '../utils/roadmapLogic.ts';
import { CheckCircle2, Circle, Award, RotateCcw, ArrowRight, BookOpen, Clock, Wrench, Sparkles, Check, Download, Share2, HelpCircle } from 'lucide-react';

interface RoadmapSectionProps {
  onOpenPromptLab?: () => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ onOpenPromptLab }) => {
  // Wizard state: 'quiz' | 'customize' | 'roadmap'
  const [currentStep, setCurrentStep] = useState<'quiz' | 'customize' | 'roadmap'>('quiz');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [studentName, setStudentName] = useState<string>('Sinh viên Việt Nam');
  const [selectedMajor, setSelectedMajor] = useState<string>('tech');
  const [selectedGoal, setSelectedGoal] = useState<string>('study');
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('genai_student_completed_tasks');
      if (savedTasks) {
        setCompletedTaskIds(JSON.parse(savedTasks));
      }
      const savedAnswers = localStorage.getItem('genai_student_quiz_answers');
      if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers));
        setCurrentStep('roadmap');
      }
      const savedMajor = localStorage.getItem('genai_student_major');
      if (savedMajor) setSelectedMajor(savedMajor);
      const savedName = localStorage.getItem('genai_student_name');
      if (savedName) setStudentName(savedName);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save tasks on change
  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const exists = prev.includes(taskId);
      const next = exists ? prev.filter(id => id !== taskId) : [...prev, taskId];
      try {
        localStorage.setItem('genai_student_completed_tasks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSelectOption = (score: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = score;
    setSelectedAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Completed quiz, move to customize
      try {
        localStorage.setItem('genai_student_quiz_answers', JSON.stringify(selectedAnswers));
      } catch {}
      setCurrentStep('customize');
    }
  };

  const handleFinishCustomization = () => {
    try {
      localStorage.setItem('genai_student_major', selectedMajor);
      localStorage.setItem('genai_student_name', studentName);
    } catch {}
    setCurrentStep('roadmap');
  };

  const handleResetRoadmap = () => {
    if (confirm('Bạn có chắc muốn làm lại bài trắc nghiệm năng lực và thiết lập lại lộ trình?')) {
      setSelectedAnswers([]);
      setCurrentQuestionIndex(0);
      setCompletedTaskIds([]);
      try {
        localStorage.removeItem('genai_student_quiz_answers');
        localStorage.removeItem('genai_student_completed_tasks');
      } catch {}
      setCurrentStep('quiz');
    }
  };

  const competency: CompetencyResult = calculateCompetencyLevel(selectedAnswers);
  const roadmapMilestones: RoadmapMilestone[] = generatePersonalizedRoadmap(selectedMajor, selectedGoal, competency.level);

  // Compute progress
  const allTasks = roadmapMilestones.flatMap(m => m.tasks.map(t => ({ id: t.id, completed: completedTaskIds.includes(t.id) })));
  const progress = calculateProgress(allTasks);

  const majorOptions = [
    { id: 'tech', label: 'Công nghệ thông tin & Kỹ thuật', desc: 'Lập trình, giải thuật, kiến trúc hệ thống, debug' },
    { id: 'business', label: 'Kinh tế & Quản trị kinh doanh', desc: 'Phân tích tài chính, Marketing, SWOT, mô hình định giá' },
    { id: 'medicine', label: 'Y Dược & Khoa học Tự nhiên', desc: 'Cơ chế bệnh sinh, tổng quan y văn, dược động học' },
    { id: 'social', label: 'Khoa học Xã hội, Ngôn ngữ & Luật', desc: 'Án lệ, lý thuyết xã hội học, viết luận học thuật' },
  ];

  const goalOptions = [
    { id: 'study', label: 'Ôn thi cuối kỳ & Đạt GPA cao' },
    { id: 'research', label: 'Nghiên cứu khoa học (NCKH) & Luận văn' },
    { id: 'career', label: 'Chuẩn bị CV & Phỏng vấn đi thực tập' },
    { id: 'automation', label: 'Tự động hóa học nhóm & Tiết kiệm thời gian' },
  ];

  return (
    <section id="roadmap-section" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with generated visual */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 mb-10">
          <img
            src="/src/assets/images/roadmap_banner_1792592965307.jpg"
            alt="Lộ trình học tập GenAI cá nhân hóa cho sinh viên"
            className="w-full h-48 sm:h-56 object-cover object-center opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent flex flex-col justify-center px-6 sm:px-10 text-white">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
              Khung Lộ Trình Cá Nhân Hóa 2026
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Lộ Trình Học Tập & Ứng Dụng GenAI Theo Ngành Học
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              Đo lường năng lực hiện tại qua trắc nghiệm, nhận lộ trình 4 chặng chi tiết và mở khóa chứng nhận kỹ năng sau khi hoàn thành các nhiệm vụ thực hành.
            </p>
          </div>
        </div>

        {/* STEP 1: QUIZ */}
        {currentStep === 'quiz' && (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            
            {/* Quiz Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                Trắc nghiệm chẩn đoán năng lực (Câu {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Khoảng 2 phút hoàn thành
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Content */}
            <div className="mt-6">
              <span className="text-xs text-slate-500 font-medium italic block mb-1">
                {QUIZ_QUESTIONS[currentQuestionIndex].scenario}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {QUIZ_QUESTIONS[currentQuestionIndex].question}
              </h3>

              {/* Options */}
              <div className="mt-6 space-y-3">
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === option.score;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(option.score)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 text-slate-900 font-medium shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div className="space-y-1">
                        <div>{option.text}</div>
                        {isSelected && (
                          <div className="text-xs text-blue-700 pt-1 font-normal border-t border-blue-100">
                            <strong>Nhận xét:</strong> {option.feedback}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Button */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer ${
                  currentQuestionIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Quay lại câu trước
              </button>

              <button
                disabled={!selectedAnswers[currentQuestionIndex]}
                onClick={handleNextQuestion}
                className={`px-5 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow-xs ${
                  selectedAnswers[currentQuestionIndex]
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Xem kết quả & Thiết lập lộ trình' : 'Câu tiếp theo'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: CUSTOMIZE ROADMAP */}
        {currentStep === 'customize' && (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Competency result header */}
            <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Kết quả chẩn đoán năng lực của bạn
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {competency.levelName} ({competency.percentage}%)
                </h3>
                <p className="text-xs text-slate-600 mt-1">{competency.summary}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-700 tabular-nums">{competency.totalScore}/20</span>
                <span className="text-xs text-slate-500 block">Điểm năng lực AI</span>
              </div>
            </div>

            {/* Student info */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Họ và Tên sinh viên (Để cấp chứng chỉ hoàn thành)
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Nhập họ và tên..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            {/* Major Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Chọn khối ngành học của bạn
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {majorOptions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMajor(m.id)}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      selectedMajor === m.id
                        ? 'border-blue-600 bg-blue-50/60 font-semibold text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold text-slate-900">{m.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Mục tiêu ưu tiên trong học kỳ này
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {goalOptions.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left ${
                      selectedGoal === g.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleFinishCustomization}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Khởi tạo Lộ trình 4 chặng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: INTERACTIVE ROADMAP DISPLAY */}
        {currentStep === 'roadmap' && (
          <div className="space-y-8">
            
            {/* Top Stats Banner */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Học viên: <strong>{studentName}</strong></span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-blue-700 font-semibold">{competency.levelName}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tiến độ hoàn thiện kỹ năng GenAI của bạn
                </h3>
                <p className="text-xs text-slate-500">
                  Đánh dấu hoàn thành từng nhiệm vụ thực hành để mở khóa Chứng nhận Kỹ năng GenAI Sinh viên.
                </p>
              </div>

              {/* Progress & Certificate CTA */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-blue-700 tabular-nums">
                    {progress.percentage}%
                  </div>
                  <div className="text-[11px] text-slate-500 tabular-nums">
                    {progress.completedCount}/{progress.totalCount} nhiệm vụ
                  </div>
                </div>

                <button
                  onClick={() => setShowCertificateModal(true)}
                  disabled={!progress.isUnlockedCertificate}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                    progress.isUnlockedCertificate
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 animate-bounce'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                  title={progress.isUnlockedCertificate ? 'Xem và tải chứng chỉ' : 'Hoàn thành ít nhất 80% nhiệm vụ để mở khóa'}
                >
                  <Award className="w-4 h-4" />
                  <span>{progress.isUnlockedCertificate ? 'Nhận Chứng Chỉ' : 'Mở khóa (≥ 80%)'}</span>
                </button>

                <button
                  onClick={handleResetRoadmap}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  title="Thiết lập lại lộ trình"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>

            {/* 4 Milestones */}
            <div className="space-y-6">
              {roadmapMilestones.map((milestone) => {
                const milestoneTasks = milestone.tasks;
                const completedInMilestone = milestoneTasks.filter(t => completedTaskIds.includes(t.id)).length;
                const isMilestoneDone = completedInMilestone === milestoneTasks.length;

                return (
                  <div
                    key={milestone.id}
                    className={`bg-white border rounded-2xl p-6 transition-all shadow-xs ${
                      isMilestoneDone ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                    }`}
                  >
                    {/* Stage Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-700">CHẶNG 0{milestone.stageNumber}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500">
                            {completedInMilestone}/{milestoneTasks.length} nhiệm vụ hoàn thành
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                          {milestone.stageTitle}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">{milestone.stageSubtitle}</p>
                      </div>

                      {isMilestoneDone && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã hoàn thành chặng</span>
                        </span>
                      )}
                    </div>

                    {/* Tasks List */}
                    <div className="mt-4 space-y-3">
                      {milestoneTasks.map((task) => {
                        const isDone = completedTaskIds.includes(task.id);

                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                              isDone
                                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                                : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300 text-slate-800'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                className="mt-0.5 text-blue-600 shrink-0 cursor-pointer"
                                aria-label={isDone ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                                )}
                              </button>
                              <div className="space-y-1">
                                <div className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                  {task.title}
                                </div>
                                <div className="text-xs text-slate-600 leading-relaxed">
                                  {task.description}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                                  <span className="font-semibold text-blue-700">Sản phẩm đầu ra:</span>
                                  <span>{task.actionableArtifact}</span>
                                </div>
                              </div>
                            </div>

                            {/* Task meta */}
                            <div className="text-right shrink-0 hidden sm:block">
                              <span className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
                                <Clock className="w-3 h-3" />
                                {task.estimatedMinutes} phút
                              </span>
                              <span className="text-[11px] font-medium text-slate-600 block mt-1">
                                Công cụ: {task.toolRequired}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Certificate Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-amber-300 text-center relative space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                  Chứng Nhận Năng Lực Ứng Dụng GenAI
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  GENAI ACADEMIC COMPETENCY CERTIFICATE
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Mã xác thực: GNAI-VN-2026-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>

              <div className="py-4 border-y border-slate-200 space-y-2">
                <p className="text-xs text-slate-600">Trang trọng trao tặng cho sinh viên:</p>
                <div className="text-xl font-bold text-blue-700">{studentName || 'Sinh viên Việt Nam'}</div>
                <p className="text-xs text-slate-600">
                  Đã hoàn thành xuất sắc lộ trình đào tạo và thực hành chuẩn hóa <strong>Khung RTCE</strong> và ứng dụng <strong>GenAI trong Học tập & Làm việc</strong> đạt cấp độ:
                </p>
                <div className="text-sm font-extrabold text-emerald-700">{competency.levelName}</div>
              </div>

              <div className="text-xs text-slate-500">
                Xác nhận ngày {new Date().toLocaleDateString('vi-VN')} · Mạng lưới Đào tạo GenAI Sinh viên Việt Nam
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    alert('Đã lưu chứng nhận vào hồ sơ sinh viên của bạn!');
                    setShowCertificateModal(false);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Lưu chứng chỉ về máy</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
