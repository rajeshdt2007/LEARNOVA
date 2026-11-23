import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Building2, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [institutionalId, setInstitutionalId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-brand-600 text-white items-center justify-center shadow-lg shadow-brand-500/30 mb-2">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Registration
          </h2>
          <p className="text-sm text-slate-500">
            Create an academic analytics profile connected to your institution
          </p>
        </div>

        <Card>
          {submitted ? (
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Registration Profile Submitted</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Your profile has been created for Phase 1 verification. In Phase 2, your institutional email ({email}) will receive a verification link powered by Supabase Auth.
              </p>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary">Proceed to Institutional Login</Button>
                </Link>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Registration requires a registered institutional email address.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Role Switcher */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole('student')}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          role === 'student'
                            ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-semibold text-xs text-slate-900">Student Account</div>
                        <div className="text-[11px] text-slate-500">Track progress & grades</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('faculty')}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          role === 'faculty'
                            ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-semibold text-xs text-slate-900">Faculty Account</div>
                        <div className="text-[11px] text-slate-500">Cohort diagnostics & risk alerts</div>
                      </button>
                    </div>
                  </div>

                  <Input
                    label="Full Legal Name"
                    placeholder="Prof. Jane Doe / John Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    leftIcon={<User className="w-4 h-4" />}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Institutional ID"
                      placeholder="e.g. STU-2026-891"
                      value={institutionalId}
                      onChange={(e) => setInstitutionalId(e.target.value)}
                      required
                    />
                    <Input
                      label="Department / Faculty"
                      placeholder="e.g. Computer Science"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      leftIcon={<Building2 className="w-4 h-4" />}
                      required
                    />
                  </div>

                  <Input
                    label="Institutional Email"
                    type="email"
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText="Must match institution's approved domain (.edu / .ac.in / .edu.au)"
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />

                  <Input
                    label="Create Password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText="Minimum 8 characters with numbers and symbols"
                    leftIcon={<Lock className="w-4 h-4" />}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Submit Registration
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="justify-center text-xs text-slate-500 py-4">
                <span>Already have an institutional profile? </span>
                <Link to="/login" className="ml-1 font-semibold text-brand-600 hover:text-brand-700">
                  Sign in here
                </Link>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
