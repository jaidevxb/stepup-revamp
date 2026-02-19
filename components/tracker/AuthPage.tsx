'use client';

import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AuthPage({ error }: { error?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(error ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setErr('Please enter your name.'); return; }
    setLoading(true);
    setErr('');

    // Persist name so Onboarding can pre-fill it after magic link verification
    localStorage.setItem('stepup_pending_name', name.trim());

    const supabase = createClient();
    const { error: supaErr } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/tracks/auth/callback`,
      },
    });

    setLoading(false);
    if (supaErr) {
      setErr(supaErr.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Code2 className="h-7 w-7 text-gray-900" />
          <span className="text-2xl font-semibold text-gray-900">StepUp</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✉️
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-500 text-sm">
                We sent a magic link to <span className="font-medium text-gray-700">{email}</span>.
                Click it to sign in.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Start Your Journey</h1>
              <p className="text-gray-500 text-sm mb-6">
                Enter your details and we&apos;ll send you a magic link — no password needed.
              </p>

              {err && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                  {err === 'auth' ? 'Authentication failed. Please try again.' : err}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jaidev"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Magic Link →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
