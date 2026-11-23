import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Activity, Menu, X, ShieldCheck } from 'lucide-react';
import { checkBackendHealth } from '../../lib/api';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    checkBackendHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'Analytics Preview', href: '/#analytics' },
    { name: 'Architecture', href: '/#features' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                  LEARNOVA
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    Phase 1
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 -mt-0.5 font-medium">
                  Faculty-Student Learning Analytics
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Backend Connectivity Status Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700" title="Live status with FastAPI backend">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>Backend:</span>
              {apiOnline === null ? (
                <span className="inline-flex items-center text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-slate-400 mr-1.5 animate-pulse" />
                  Checking...
                </span>
              ) : apiOnline ? (
                <span className="inline-flex items-center text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                  Online
                </span>
              ) : (
                <span className="inline-flex items-center text-amber-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
                  Offline
                </span>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {location.pathname !== '/login' && (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
            {location.pathname !== '/register' && (
              <Link to="/register">
                <Button variant="primary" size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />}>
                  Institutional Access
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-brand-600"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" fullWidth className="mb-2">
                Sign In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" fullWidth>
                Institutional Access
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
