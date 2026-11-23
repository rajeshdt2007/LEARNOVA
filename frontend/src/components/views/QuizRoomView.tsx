import React, { useState } from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Sparkles
} from 'lucide-react';
import { Quiz, QuizAttemptResult, User as UserType } from '../../types';
import { attemptQuiz } from '../../lib/api';

interface QuizRoomViewProps {
  quiz: Quiz | null;
  currentUser: UserType | null;
  onExit: () => void;
}

export const QuizRoomView: React.FC<QuizRoomViewProps> = ({
  quiz,
  currentUser,
  onExit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizAttemptResult | null>(null);

  if (!quiz) {
    return (
      <div className="p-12 text-center space-y-4 bg-white rounded-3xl border border-purple-100">
        <HelpCircle className="w-12 h-12 text-purple-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">No Quiz Selected</h3>
        <p className="text-xs text-slate-500">
          Please select an interactive quiz from the Classes or Home tab to begin your test.
        </p>
        <button
          onClick={onExit}
          className="px-5 py-2.5 rounded-full bg-[#5B4BD8] text-white text-xs font-semibold shadow-md shadow-purple-500/20"
        >
          Return to Classes
        </button>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (result) return;
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    const res = await attemptQuiz({
      quizId: quiz.id,
      studentId: currentUser?.institutionalId || "STU-2026-09",
      studentName: currentUser?.fullName || "Student Examinee",
      selectedAnswers: selectedAnswers
    });
    setResult(res);
    setSubmitting(false);
  };

  const handleRetake = () => {
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="p-6 sm:p-10 space-y-6 select-none max-w-3xl mx-auto bg-white rounded-3xl border border-purple-100 shadow-sm">
      {/* Header with Title and Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-50">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B4BD8] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            {quiz.courseName}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            {quiz.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>{quiz.durationMinutes} min timed</span>
          </div>
          <button
            onClick={onExit}
            className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors"
          >
            Exit Exam
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-[#5B4BD8]">{Math.round(progressPercentage)}% completed</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#5B4BD8] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Result Card if submitted */}
      {result ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-200 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 text-[#5B4BD8] flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-7 h-7" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B4BD8]">
              Diagnostic Evaluation Complete
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Score: {result.score} / {result.totalQuestions} ({result.percentage}%)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {result.passed
                ? 'Congratulations! You demonstrated strong mastery of the curriculum material.'
                : 'Review the lecture notes and re-attempt to solidify core concepts.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-purple-50 text-[#5B4BD8] border border-purple-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onExit}
              className="px-6 py-2.5 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs font-semibold shadow-md shadow-purple-500/20 active:scale-95 transition-all"
            >
              Back to Classes
            </button>
          </div>
        </div>
      ) : (
        /* Active Question & Options */
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-purple-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-50/80 border-[#5B4BD8] shadow-sm text-slate-900 ring-2 ring-purple-100'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-purple-200 hover:bg-purple-50/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-[#5B4BD8] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium">{option}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#5B4BD8]" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-6 py-2.5 rounded-full bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
              >
                {submitting ? 'Submitting...' : 'Submit Answers'}
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-full bg-slate-900 hover:bg-[#5B4BD8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
