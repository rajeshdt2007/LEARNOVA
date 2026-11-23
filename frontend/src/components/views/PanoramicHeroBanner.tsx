import React from 'react';
import { ArrowRight, Video, TrendingUp, Users, Award, Code } from 'lucide-react';
import { CohortOverview } from '../../types';

interface PanoramicHeroBannerProps {
  cohort: CohortOverview;
  onExplore: () => void;
  onOpenLiveClass: () => void;
  onOpenProgressTracking: () => void;
  onOpenMentors: () => void;
}

export const PanoramicHeroBanner: React.FC<PanoramicHeroBannerProps> = ({
  cohort,
  onExplore,
  onOpenLiveClass,
  onOpenProgressTracking,
  onOpenMentors,
}) => {
  return (
    <div className="space-y-10">
      {/* 
        Hero Grid matching user's uploaded image (Ruang Edit style):
        Left: Tag badge, Level Up Your Learning Skills headline, subtitle, Join Us Now button, 2K+ students avatars
        Right: Lavender circle disk, student with laptop, floating Live Class card, floating Progress Tracking card
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 sm:pt-4">
        {/* Left Column (Hero Content) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Pill Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EDFD] text-[#5B4BD8] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#5B4BD8] animate-pulse" />
            <span>LEARNOVA PLATFORM</span>
            <span className="text-purple-300">•</span>
            <span>{cohort.activeTerm || '2026.FALL'}</span>
            <span className="text-purple-300">•</span>
          </div>

          {/* Massive Typography matching reference image */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Level Up Your <br />
            <span className="text-[#5B4BD8] inline-flex items-center gap-2">
              Learning Skills
              {/* Amber Sparkle Star matching reference image */}
              <span className="text-amber-400 text-3xl sm:text-4xl lg:text-5xl drop-shadow-sm select-none">
                ✦
              </span>
            </span> <br />
            With Our Platform
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
            Join thousands of creative minds and upgrade your academic skills with faculty-led classes, live diagnostic analytics, and real-world projects.
          </p>

          {/* Action Row: Purple CTA button + 2K+ Members Social Proof */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
            {/* Join Us Now Pill Button */}
            <button
              onClick={onExplore}
              className="bg-[#5B4BD8] hover:bg-[#4D3EC4] text-white font-medium text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 active:scale-95 transition-all group"
            >
              <span>Join Us Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Social Proof: Avatars + 2K+ Members Joined */}
            <div
              onClick={onExplore}
              className="flex items-center gap-3 cursor-pointer group"
              title="View Active Student Cohort"
            >
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar 1"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar 2"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar 3"
                />
                <div className="inline-flex h-9 w-9 rounded-full bg-[#5B4BD8] text-white text-[11px] font-bold items-center justify-center ring-2 ring-white shadow-sm">
                  +2K
                </div>
              </div>
              <div className="text-xs font-bold text-slate-700 group-hover:text-[#5B4BD8] transition-colors">
                2K+ Students Enrolled
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Visual Composition with Lavender Disk & Floating Cards) */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] select-none">
          {/* Lavender circular backdrop disk matching image */}
          <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[410px] lg:h-[410px] rounded-full bg-[#EAE5FC] absolute -z-0 flex items-center justify-center">
            {/* Subtle inner ambient ring */}
            <div className="w-full h-full rounded-full border border-purple-200/50" />
          </div>

          {/* Sparkle decorative star top-left */}
          <div className="absolute top-2 left-6 text-[#5B4BD8] text-2xl animate-pulse">
            ✦
          </div>

          {/* Sparkle decorative star bottom-left */}
          <div className="absolute bottom-12 left-10 text-purple-400 text-lg">
            ✦
          </div>

          {/* Dot matrix grid pattern on far right */}
          <div className="absolute top-1/4 -right-1 sm:right-2 grid grid-cols-3 gap-2 opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            ))}
          </div>

          {/* Student Cutout Visual matching the reference photo */}
          <div className="relative z-0 max-w-[320px] sm:max-w-[380px] flex items-end justify-center">
            <div className="relative overflow-hidden rounded-b-full pb-2">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Smiling student with laptop"
                className="w-full h-auto object-cover rounded-3xl drop-shadow-2xl max-h-[360px] sm:max-h-[400px]"
              />
              {/* Soft purple tone tint overlay to blend naturally */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5B4BD8]/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
            </div>
          </div>

          {/* Floating Card 1: Top-Left (Live Class with Video Icon & Ongoing status) */}
          <div
            onClick={onOpenLiveClass}
            className="absolute -top-2 -left-2 sm:-left-6 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl shadow-purple-900/10 border border-purple-100/70 w-56 sm:w-64 cursor-pointer hover:scale-105 active:scale-95 transition-all group"
            title="Launch Interactive Live Class / Quiz"
          >
            <div className="flex items-center gap-3">
              {/* Purple square icon with video camera */}
              <div className="w-10 h-10 rounded-xl bg-[#6C5CE7] flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-400/30 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight group-hover:text-[#5B4BD8] transition-colors">
                  Live Class
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  UI/UX Design Basics
                </p>
              </div>
            </div>

            {/* Avatars pile + Ongoing progress bar */}
            <div className="mt-3 pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <img
                    className="inline-block h-5 w-5 rounded-full ring-1 ring-white"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50"
                    alt="avatar"
                  />
                  <img
                    className="inline-block h-5 w-5 rounded-full ring-1 ring-white"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50"
                    alt="avatar"
                  />
                  <img
                    className="inline-block h-5 w-5 rounded-full ring-1 ring-white"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50"
                    alt="avatar"
                  />
                  <span className="inline-flex h-5 w-5 rounded-full bg-purple-100 text-[#5B4BD8] text-[9px] font-bold items-center justify-center ring-1 ring-white">
                    +32
                  </span>
                </div>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  Ongoing
                </span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#6C5CE7] h-full rounded-full w-[65%]" />
              </div>
            </div>
          </div>

          {/* Floating Card 2: Bottom-Right (Beginner to Advanced with Progress Tracking 75%) */}
          <div
            onClick={onOpenProgressTracking}
            className="absolute -bottom-4 right-0 sm:-right-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl shadow-purple-900/10 border border-purple-100/70 w-56 sm:w-64 cursor-pointer hover:scale-105 active:scale-95 transition-all group"
            title="Inspect Student Learning Trajectory"
          >
            <div className="flex items-center gap-3">
              {/* Amber square icon with trend line */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-amber-400/30 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">
                  Beginner to Advanced
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Progress Tracking
                </p>
              </div>
            </div>

            {/* Progress bar with 75% indicator */}
            <div className="mt-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span className="text-slate-400 text-[10px] font-medium">Curriculum Mastery</span>
                <span className="text-[#5B4BD8]">75%</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#5B4BD8] h-full rounded-full w-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        3 Bottom Feature Highlight Cards matching exact layout in reference image:
        1. Live Classes (Interactive Learning)
        2. Expert Mentors (Industry Professionals)
        3. Practical Projects (Real World Experience)
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Card 1: Live Classes */}
        <button
          onClick={onExplore}
          className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-purple-50/50 border border-purple-100/80 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 group cursor-pointer active:scale-98"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#5B4BD8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#5B4BD8] transition-colors leading-snug">
              Live Classes
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Interactive Learning
            </p>
          </div>
        </button>

        {/* Card 2: Expert Mentors */}
        <button
          onClick={onOpenMentors}
          className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-amber-50/50 border border-purple-100/80 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 group cursor-pointer active:scale-98"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
              Expert Mentors
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Industry Professionals
            </p>
          </div>
        </button>

        {/* Card 3: Practical Projects */}
        <button
          onClick={onExplore}
          className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-indigo-50/50 border border-purple-100/80 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 group cursor-pointer active:scale-98"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#5B4BD8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#5B4BD8] transition-colors leading-snug">
              Practical Projects
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Real World Experience
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
