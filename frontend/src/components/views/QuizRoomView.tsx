import React, { useState } from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award
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
      <div className="p-12 text-center space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Quiz Selected</h3>
        <p className="text-xs text-slate-400">
          Please select a quiz from the Course Content tab to begin your test.
        </p>
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold"
        >
          Return to Course Content
        </button>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (result) return; // locked after submission
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
    <div className="p-6 sm:p-10 space-y-8 select-none max-w-3xl mx-auto">
      {/* Header with Title and Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
            {quiz.courseName}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            {quiz.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 text-right flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-white">
              {quiz.durationMinutes}:00 Min Limit
            </span>
          </div>
          <button
            onClick={onExit}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Exit Room
          </button>
        </div>
      </div>

      {/* Result Card when Quiz is Completed */}
      {result ? (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/20 backdrop-blur-md space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-black ${
            result.passed
              ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400'
              : 'bg-amber-500/20 text-amber-300 border-2 border-amber-400'
          }`}>
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white">
              Quiz Evaluation: {result.percentage}%
            </h3>
            <p className="text-xs text-slate-300">
              You correctly answered <strong className="text-cyan-300">{result.score}</strong> out of <strong className="text-white">{result.totalQuestions}</strong> questions.
            </p>
            <div className="pt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                result.passed
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-950 text-amber-300 border border-amber-500/40'
              }`}>
                {result.passed ? 'PASSED & RECORDED TO GRADEBOOK' : 'REVIEW CONCEPTS & RETRY'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 text-left space-y-2">
            <div className="font-semibold text-white">Concept Diagnostic Feedback:</div>
            <p className="text-slate-400">
              Your results have been automatically synchronized with the Faculty Analytics Radar for {quiz.courseName}.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetake}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onExit}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Return to Courses
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/20 backdrop-blur-md space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between group active:scale-99 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-black/30 border-white/10 hover:border-white/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-white/10 text-slate-400 group-hover:text-white'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'
                  }`}>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                <span>{submitting ? 'Scoring...' : 'Submit Quiz for Grading'}</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
