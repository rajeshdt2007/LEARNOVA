import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { ActiveTab, CohortOverview } from '../../types';

interface HeroFluidViewProps {
  onExplore: () => void;
  cohort: CohortOverview;
  setActiveTab?: (tab: ActiveTab) => void;
}

export const HeroFluidView: React.FC<HeroFluidViewProps> = ({
  onExplore,
  cohort,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hudActive, setHudActive] = useState(false);
  const [barValues, setBarValues] = useState([45, 75, 90, 60, 85, 95, 70, 80]);

  // Interactive toggle for bottom right control
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // Interactive pulse for HUD bars
  const pulseBars = () => {
    setBarValues(barValues.map(() => Math.floor(Math.random() * 50) + 50));
    setHudActive(!hudActive);
  };

  return (
    <div className="relative min-h-[580px] sm:min-h-[620px] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
      {/* ------------------------------------------------------------------- */}
      {/* 3D Organic Fluid Landscape Background (SVG & Gradient Mesh) */}
      {/* ------------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft studio light & metallic fluid reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/40 via-slate-100/30 to-slate-400/20" />
        
        {/* Fluid wave curvature matching the image */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chromeFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#cbd5e1" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#94a3b8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="liquidReflect" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#64748b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="mossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Upper silvery-pearlescent undulating flow */}
          <path
            d="M0,0 C300,180 800,80 1200,260 L1200,800 C900,650 400,750 0,600 Z"
            fill="url(#liquidReflect)"
            opacity="0.55"
          />

          {/* Main sweeping chrome liquid spine flowing across center */}
          <path
            d="M0,350 Q450,150 750,450 T1200,320 L1200,800 L0,800 Z"
            fill="url(#chromeFlow)"
            opacity="0.85"
          />

          {/* Deep curving ridge shadow */}
          <path
            d="M150,550 C380,420 700,520 1200,380 L1200,550 C800,680 400,620 150,550 Z"
            fill="#1e293b"
            opacity="0.35"
          />

          {/* Organic moss / cellular biotope cluster (Bottom Left) */}
          <g opacity="0.85">
            <ellipse cx="140" cy="720" rx="130" ry="75" fill="url(#mossGradient)" />
            <circle cx="90" cy="690" r="28" fill="#34d399" opacity="0.6" filter="url(#softGlow)" />
            <circle cx="160" cy="700" r="34" fill="#059669" opacity="0.8" />
            <circle cx="210" cy="730" r="22" fill="#6ee7b7" opacity="0.5" />
            <circle cx="120" cy="650" r="18" fill="#10b981" opacity="0.7" />
          </g>

          {/* Organic moss cluster (Bottom Right crevice) */}
          <g opacity="0.85">
            <ellipse cx="1080" cy="660" rx="110" ry="65" fill="url(#mossGradient)" />
            <circle cx="1050" cy="630" r="24" fill="#34d399" opacity="0.7" />
            <circle cx="1110" cy="650" r="30" fill="#047857" opacity="0.8" />
            <circle cx="1020" cy="680" r="20" fill="#10b981" opacity="0.6" />
          </g>
        </svg>

        {/* Ambient light streak */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Center Hero: "Intelligent Flow" & Glowing "CATDA" Button */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative z-10 my-auto text-center max-w-2xl mx-auto space-y-4 pt-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
          Intelligent Flow
        </h1>

        <p className="text-xs sm:text-sm text-slate-200/90 font-normal tracking-wide max-w-xl mx-auto leading-relaxed drop-shadow-sm lowercase">
          intelligent material field : predictive learning trajectories, cohort diagnostics, automated early academic interventions.
        </p>

        {/* Glowing Neon Cyan CTA Button matching image */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center justify-center px-10 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 bg-cyan-950/40 border-2 border-cyan-300 shadow-neon-cyan hover:shadow-neon-hover hover:border-white hover:bg-cyan-900/60 backdrop-blur-md"
          >
            {/* Luminous Inner Glow */}
            <span className="relative z-10 flex items-center gap-2 text-cyan-50 group-hover:text-white">
              <span>CATDA</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:rotate-45 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Bottom HUD: Left Telemetry Instrument & Right Mechanical Switch */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative z-20 flex flex-col sm:flex-row items-end justify-between gap-6 pt-8">
        {/* Bottom Left: Curved Glass HUD Cockpit with Realtime Metrics */}
        <div
          onClick={pulseBars}
          className="cursor-pointer group relative p-4 rounded-2xl bg-slate-900/60 border border-cyan-400/40 backdrop-blur-xl shadow-hud-glow hover:border-cyan-300 transition-all w-full sm:w-64"
          title="Click to pulse telemetry data"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-cyan-300 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Hmdlar
            </span>
            <span className="text-[10px] text-slate-400">TELEMETRY</span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {cohort.totalStudents}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">
              Active Cohort
            </div>
          </div>

          {/* Equalizer Bar meters matching the image */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-end gap-1.5 h-10">
            {barValues.map((val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-cyan-950 rounded-t-sm overflow-hidden flex flex-col justify-end h-full"
              >
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t-sm transition-all duration-300"
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-300/80">
            <span>Retention: {cohort.retentionRate}%</span>
            <span>At Risk: {cohort.studentsAtRisk}</span>
          </div>
        </div>

        {/* Bottom Right: Chrome Mechanical Track with LED Indicator and Pill Switch */}
        <div className="flex items-center gap-3 bg-slate-950/70 p-2.5 px-4 rounded-full border border-white/20 backdrop-blur-md shadow-lg">
          {/* LED status indicator pill */}
          <div className="flex items-center gap-2 pr-2 border-r border-white/15">
            <span className="w-6 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4] animate-pulse" />
            <span className="text-[10px] text-slate-300 font-mono">LIVE</span>
          </div>

          {/* Dual dots matching image */}
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>

          {/* Circular interactive toggle button */}
          <button
            onClick={toggleSound}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center text-slate-200 hover:text-white transition-all active:scale-95"
            title={soundEnabled ? "Disable ambient sound" : "Enable ambient feedback"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
