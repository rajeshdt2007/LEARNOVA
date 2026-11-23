import React from 'react';
import { CloudSun, Droplet, Sun } from 'lucide-react';
import { CohortOverview } from '../../types';

interface PanoramicHeroBannerProps {
  cohort?: CohortOverview;
  onExplore: () => void;
}

export const PanoramicHeroBanner: React.FC<PanoramicHeroBannerProps> = ({
  onExplore,
}) => {
  return (
    <div className="relative rounded-[32px] overflow-hidden shadow-sm h-[280px] sm:h-[310px] select-none group">
      {/* 
        High-Resolution Modern Architectural Sail Canopy
        Matching the Sydney Opera House / Modern Pavilions in the reference photo
      */}
      <img
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=85"
        alt="Architectural Canopy"
        className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700"
      />

      {/* Subtle architectural gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />

      {/* ----------------------------------------------------------------- */}
      {/* Floating Badges on Top-Left (Matching 29° blue & 15% orange badge) */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute top-5 left-5 z-20 flex flex-col items-start">
        {/* Blue Pill Card */}
        <div className="w-[84px] h-[78px] rounded-[22px] bg-[#2b66ff] text-white flex flex-col items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-2xl font-bold tracking-tight">29°</span>
          <span className="text-[10px] font-medium text-blue-100 uppercase tracking-wider">
            Average
          </span>
        </div>

        {/* Orange Badge (Overlapping right below blue pill) */}
        <div className="w-[84px] h-[70px] rounded-[20px] bg-[#ea7024] text-white flex flex-col items-center justify-center shadow-lg shadow-orange-500/30 -mt-3 ml-4">
          <span className="text-xl font-bold">15%</span>
          <span className="text-[9px] font-medium text-orange-100 tracking-tight">
            Fair chances
          </span>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom-Left Information Overlay */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute bottom-6 left-8 z-20 text-white space-y-1">
        {/* Weather Icon (Cloud with sun) */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
            <CloudSun className="w-5 h-5" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
          Yuanyang County
        </h2>
        <p className="text-xs text-white/90 font-medium drop-shadow-sm">
          South of Kunmingcity
        </p>
        <p className="text-[11px] text-white/70 font-normal">
          as of 3:44 am GST
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom-Right Information Overlay */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute bottom-6 right-8 z-20 text-white flex items-center gap-6">
        {/* Humidity / Attendance Metric */}
        <div className="flex items-center gap-2 text-right">
          <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-cyan-300">
            <Droplet className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-white/70 font-medium">Humidity</div>
            <div className="text-sm font-bold text-white">25%</div>
          </div>
        </div>

        {/* Sunrise / Active Benchmark */}
        <div className="flex items-center gap-2 text-right">
          <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-amber-300">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-white/70 font-medium">Sunrise</div>
            <div className="text-sm font-bold text-white">6:10am</div>
          </div>
        </div>
      </div>

      {/* Clickable transparent trigger */}
      <button
        onClick={onExplore}
        className="absolute inset-0 w-full h-full z-10 cursor-pointer"
        title="Click to view course materials & analytics"
        aria-label="View course details"
      />
    </div>
  );
};
