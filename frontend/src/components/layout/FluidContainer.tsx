import React from 'react';

interface FluidContainerProps {
  children: React.ReactNode;
}

export const FluidContainer: React.FC<FluidContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-12 flex items-center justify-center">
      {/* 
        Master Floating Window Frame:
        Matches the curved corners, frosted glass border, and soft studio backdrop
        from the user's uploaded reference image.
      */}
      <div className="w-full max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-slate-200/90 via-slate-300/80 to-slate-400/90 border border-white/50 shadow-glass-frame backdrop-blur-2xl overflow-hidden relative transition-all duration-300">
        {/* Subtle glass reflection highlight along top edge */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-40 pointer-events-none" />

        {/* Content Inside Floating Frame */}
        <div className="relative z-10 flex flex-col min-h-[660px]">
          {children}
        </div>
      </div>
    </div>
  );
};
