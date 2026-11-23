import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-100">
          <GraduationCap className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          404 Error
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Academic Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The requested institutional analytics view or resource could not be found or may have been reorganized.
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Campus Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
