import { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type LoginPageProps = {
  onAuthSuccess: () => void;
  onBack: () => void;
};

export function LoginPage({ onAuthSuccess, onBack }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuthSuccess();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        onAuthSuccess();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-5 py-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-saffron-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-navy-400/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="bg-white rounded-3xl shadow-card p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <Shield className="w-7 h-7 text-saffron-500" strokeWidth={2.2} />
            <span className="text-navy-700 font-extrabold text-lg tracking-tight">
              YATRA<span className="text-saffron-500"> SHIELD</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-navy-700 mb-1">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-navy-400 text-sm mb-8">
            {mode === 'login'
              ? 'Sign in to plan your next journey across India.'
              : 'Join YATRA SHIELD to start exploring India with trusted guides.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-100 bg-surface text-navy-700 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-400 disabled:opacity-60 text-navy-900 font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-glow"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-navy-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-saffron-600 font-semibold hover:text-saffron-500 transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
