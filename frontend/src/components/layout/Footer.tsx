import React from 'react';
import { GraduationCap, Shield, Server, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">LEARNOVA</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-4">
              Institutional Faculty-Student Learning Analytics Platform designed to provide actionable academic intelligence, early student intervention, and longitudinal course outcome tracking.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                FERPA-Compliant Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-brand-400" />
                FastAPI + Supabase Backed
              </span>
            </div>
          </div>

          {/* Institutional Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Student Success Dashboard</span></li>
              <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Faculty Gradebook Intelligence</span></li>
              <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Cohort Risk Analytics</span></li>
              <li><span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Curriculum Assessment Logs</span></li>
            </ul>
          </div>

          {/* System & Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              System Telemetry
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors">
                  OpenAPI / Swagger Docs
                </a>
              </li>
              <li>
                <a href="http://localhost:8000/api/v1/health" target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors">
                  Backend Health Endpoint
                </a>
              </li>
              <li>
                <span className="text-slate-500">Release: Phase 1 (v0.1.0)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LEARNOVA Analytics. Institutional Single-Tenant Architecture.</p>
          <div className="flex items-center gap-6">
            <span>Academic Integrity Protocol</span>
            <span>Privacy & Access Control</span>
            <span>Campus IT Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
