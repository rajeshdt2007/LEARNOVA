import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  AlertTriangle,
  Award,
  Layers,
  ArrowRight,
  RefreshCw,
  Server,
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { checkBackendHealth } from '../lib/api';
import { HealthResponse } from '../types';

// Demonstration cohort learning analytics data for Recharts preview
const cohortAnalyticsData = [
  { week: 'W1', avgQuizScore: 78, engagementRate: 85, attendance: 96 },
  { week: 'W2', avgQuizScore: 82, engagementRate: 88, attendance: 94 },
  { week: 'W3', avgQuizScore: 80, engagementRate: 82, attendance: 92 },
  { week: 'W4', avgQuizScore: 75, engagementRate: 79, attendance: 88 },
  { week: 'W5 (Midterm)', avgQuizScore: 79, engagementRate: 91, attendance: 90 },
  { week: 'W6', avgQuizScore: 84, engagementRate: 89, attendance: 91 },
  { week: 'W7', avgQuizScore: 86, engagementRate: 92, attendance: 93 },
  { week: 'W8', avgQuizScore: 89, engagementRate: 95, attendance: 94 },
];

export const LandingPage: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState<boolean>(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setHealthLoading(true);
    setHealthError(null);
    try {
      const data = await checkBackendHealth();
      setHealthData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setHealthError(err.message || 'Unable to communicate with FastAPI backend.');
      } else {
        setHealthError('Unable to communicate with FastAPI backend.');
      }
      setHealthData(null);
    } finally {
      setHealthLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
              Institutional Single-Tenant Platform • Phase 1
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Actionable Intelligence for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                Academic Excellence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              LEARNOVA connects faculty instructional diagnostics with student learning trajectories. 
              Monitor real-time cohort engagement, detect early academic risk, and evaluate curriculum outcomes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enter Institutional Portal
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" fullWidth>
                  Request Faculty / Student Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live System Health & Backend Verification Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Live API Telemetry & End-to-End Link
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time connection verification between React frontend and FastAPI backend service.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchHealth}
              isLoading={healthLoading}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Probe Backend Health
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* API Status */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  FastAPI Backend
                </span>
                {healthLoading ? (
                  <Badge variant="neutral" size="sm" dot>Pinging...</Badge>
                ) : healthData ? (
                  <Badge variant="success" size="sm" dot>Active</Badge>
                ) : (
                  <Badge variant="danger" size="sm" dot>Unreachable</Badge>
                )}
              </div>
              <div className="text-sm font-medium text-slate-800">
                {healthData ? `Online • Version ${healthData.version}` : healthError ? 'Connection failed' : 'Checking connection...'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Endpoint: <code className="text-slate-700 font-mono bg-slate-200/70 px-1 py-0.5 rounded">/api/v1/health</code>
              </p>
            </div>

            {/* Supabase Status */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Supabase Layer
                </span>
                {healthData?.services.database?.configured ? (
                  <Badge variant="success" size="sm" dot>Connected</Badge>
                ) : (
                  <Badge variant="warning" size="sm" dot>Pending Keys</Badge>
                )}
              </div>
              <div className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>PostgreSQL & Supabase Auth</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {String(healthData?.services.database?.details?.note || 'Configure SUPABASE_URL in backend/.env')}
              </p>
            </div>

            {/* Architecture Details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Environment
                </span>
                <Badge variant="brand" size="sm">
                  {healthData?.environment || 'Development'}
                </Badge>
              </div>
              <div className="text-sm font-medium text-slate-800">
                Render Blueprint Ready
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified at: {healthData?.timestamp ? new Date(healthData.timestamp).toLocaleTimeString() : 'Awaiting heartbeat'}
              </p>
            </div>
          </div>

          {healthError && (
            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                Backend is currently offline or starting up. Start the FastAPI server using{' '}
                <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900">
                  uvicorn app.main:app --reload --port 8000
                </code>.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Analytics Preview with Recharts */}
      <section id="analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Cohort Learning Trajectory Preview
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Integrated Recharts visualization modeling institutional student mastery across academic milestones.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm">Computer Science 101</Badge>
              <Badge variant="neutral" size="sm">Fall 2026 Cohort</Badge>
            </div>
          </div>

          <div className="pt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cohortAnalyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="engagementColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="avgQuizScore"
                  name="Avg Assessment Score (%)"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#scoreColor)"
                />
                <Area
                  type="monotone"
                  dataKey="engagementRate"
                  name="Student Engagement Index (%)"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#engagementColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Institutional-Grade Architecture
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Engineered specifically for university accreditation, educator workflows, and student privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverEffect>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <CardTitle>Early Risk Warnings</CardTitle>
              <CardDescription>
                Predictive algorithms detect students falling behind assignment submission deadlines before midterms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proactive Interventions
              </span>
            </CardContent>
          </Card>

          <Card hoverEffect>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <CardTitle>Longitudinal Growth</CardTitle>
              <CardDescription>
                Track cohort-wide performance trajectories across semesters and benchmark against departmental standards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Departmental Analytics
              </span>
            </CardContent>
          </Card>

          <Card hoverEffect>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <CardTitle>Student Self-Tracking</CardTitle>
              <CardDescription>
                Students access transparent grade calculations, learning objective checklists, and target GPA forecasts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Goal Calibration
              </span>
            </CardContent>
          </Card>

          <Card hoverEffect>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <CardTitle>FERPA & Role Isolation</CardTitle>
              <CardDescription>
                Supabase Row-Level Security (RLS) ensures students view only their records while faculty access enrolled sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Institutional Security
              </span>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
