import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, GraduationCap, Shield, UserCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'info' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please fill in both institutional email and password.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Simulated Phase 1 institutional auth flow hint
    setTimeout(() => {
      setIsLoading(false);
      setMessage({
        type: 'info',
        text: `Phase 1 layout verified. In Phase 2, this triggers Supabase Auth for role: ${role.toUpperCase()} using institutional SSO.`,
      });
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-brand-600 text-white items-center justify-center shadow-lg shadow-brand-500/30 mb-2">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Sign In
          </h2>
          <p className="text-sm text-slate-500">
            Access your LEARNOVA academic workspace
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-200/70 p-1 rounded-xl flex gap-1">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'student'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('faculty')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'faculty'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Faculty
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}</CardTitle>
            <CardDescription>
              Use your institution-issued email address (`.edu` / `.ac`)
            </CardDescription>
          </CardHeader>

          <CardContent>
            {message && (
              <div
                className={`mb-4 p-3 rounded-lg text-xs font-medium ${
                  message.type === 'error'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-brand-50 text-brand-700 border border-brand-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Institutional Email"
                type="email"
                placeholder={role === 'student' ? 'student.id@institution.edu' : 'faculty.name@institution.edu'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember device</span>
                </label>
                <a href="#forgot" className="font-medium text-brand-600 hover:text-brand-700">
                  Forgot credentials?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Authenticate & Enter
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-xs text-slate-500 py-4">
            <span>New student or faculty member? </span>
            <Link to="/register" className="ml-1 font-semibold text-brand-600 hover:text-brand-700">
              Register account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
