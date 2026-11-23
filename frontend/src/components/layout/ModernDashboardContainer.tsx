import React from 'react';

interface ModernDashboardContainerProps {
  children: React.ReactNode;
}

export const ModernDashboardContainer: React.FC<ModernDashboardContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-6 lg:px-10 flex flex-col items-center justify-start bg-[#F5F3FB] text-slate-900 font-sans antialiased selection:bg-purple-100 selection:text-purple-900">
      {/* 
        Master Canvas Card matching uploaded "Ruang Edit" reference design:
        Crisp white rounded card, soft drop-shadow, and subtle purple boundary
      */}
      <div className="w-full max-w-7xl bg-white rounded-[32px] sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(91,75,216,0.07)] border border-purple-100/50 p-5 sm:p-8 lg:p-10 space-y-7 transition-all overflow-hidden relative">
        {children}
      </div>

      {/* Footer institutional branding */}
      <footer className="mt-6 mb-2 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-4">
        <span>© 2026 LEARNOVA Platform</span>
        <span>•</span>
        <span>Faculty & Student Learning Analytics</span>
        <span>•</span>
        <span>Single Institutional Tenant</span>
      </footer>
    </div>
  );
};
