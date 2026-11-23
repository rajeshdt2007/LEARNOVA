import React, { useState, useEffect } from 'react';
import {
  Server,
  Database,
  RefreshCw,
  Cpu,
  Activity
} from 'lucide-react';
import { checkBackendHealth } from '../../lib/api';
import { HealthResponse } from '../../types';

export const SystemHealthView: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const probeBackend = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const data = await checkBackendHealth();
      const end = performance.now();
      setLatency(Math.round(end - start));
      setHealthData(data);
    } catch {
      setHealthData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    probeBackend();
  }, []);

  return (
    <div className="p-6 sm:p-10 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Live Infrastructure Heartbeat
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Backend Telemetry & Diagnostics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time API probe between React client, Python FastAPI runtime, and Supabase database.
          </p>
        </div>

        <button
          onClick={probeBackend}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-cyan-950/50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Probe Backend Health</span>
        </button>
      </div>

      {/* Telemetry Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FastAPI Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-400">
              FastAPI Runtime
            </span>
            {healthData ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Unreachable
              </span>
            )}
          </div>

          <div className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <span>LEARNOVA API</span>
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-1">
            <div>Version: <span className="text-slate-200 font-mono">{healthData?.version || '0.1.0'}</span></div>
            <div>Latency: <span className="text-cyan-300 font-mono">{latency !== null ? `${latency} ms` : '-'}</span></div>
            <div>Endpoint: <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono">/api/v1/health</code></div>
          </div>
        </div>

        {/* Supabase Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-400">
              Database & Auth Layer
            </span>
            {healthData?.services.database?.configured ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Pending Keys
              </span>
            )}
          </div>

          <div className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            <span>Supabase PostgreSQL</span>
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-1">
            <div>Auth: <span className="text-slate-200">Supabase GoTrue</span></div>
            <div>Storage: <span className="text-slate-200">Supabase S3 Buckets</span></div>
            <div className="text-[11px] text-amber-300/80">
              {healthData?.services.database?.details?.note || 'Supply SUPABASE_URL in backend/.env'}
            </div>
          </div>
        </div>

        {/* Deployment Readiness Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-400">
              Deployment Blueprints
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Ready
            </span>
          </div>

          <div className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span>Render Blueprint</span>
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-1">
            <div>Infrastructure: <span className="text-slate-200 font-mono">render.yaml</span></div>
            <div>API Service: <span className="text-slate-200">learnova-api (Python)</span></div>
            <div>Web Site: <span className="text-slate-200">learnova-web (Static)</span></div>
          </div>
        </div>
      </div>

      {/* Live Raw JSON Payload Inspection */}
      {healthData && (
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/10">
            <span className="font-mono text-cyan-300">GET /api/v1/health Response Contract</span>
            <span>HTTP 200 OK</span>
          </div>
          <pre className="text-xs font-mono text-cyan-200/80 overflow-x-auto p-3 bg-black/40 rounded-xl">
            {JSON.stringify(healthData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
