import React from 'react';

interface ModernDashboardContainerProps {
  children: React.ReactNode;
}

export const ModernDashboardContainer: React.FC<ModernDashboardContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* 
        Master Canvas Card matching user's uploaded reference:
        Pure white canvas, soft curved edges (rounded-[44px]), and diffuse soft shadow
      */}
      <div className="w-full max-w-6xl bg-white rounded-[42px] sm:rounded-[46px] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.07)] border border-slate-200/50 p-5 sm:p-8 space-y-5 transition-all">
        {children}
      </div>
    </div>
  );
};
