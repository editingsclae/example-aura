'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState(user?.email || '979adriaens@fldubai.com');
  const [password, setPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push('/account');
    } else {
      setError('Incorrect email or password.');
    }
  };

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f7f4ef] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-[960px] bg-white border border-[#e5ded3] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(60,50,35,0.07)] grid grid-cols-1 lg:grid-cols-[45%_55%]">
        {/* Brand Left Panel */}
        <aside className="relative hidden lg:block overflow-hidden bg-[#1c1a17]">
          <Image
            src="/assets/aistudio/promo-glow_e8fc64ea.png"
            alt="Woman with glowing skin"
            fill
            className="object-cover object-right"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/90 via-[#1c1a17]/40 to-transparent flex flex-col justify-end p-10 text-white">
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#e9e2d4] mb-3">
              The Glow Club
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight mb-3 text-white">
              Skincare that
              <br />
              becomes a ritual.
            </h2>
            <p className="text-xs leading-relaxed text-white/80">
              Members enjoy early access to launches, 15% off their first order and free samples with every purchase.
            </p>
          </div>
        </aside>

        {/* Right Form Panel */}
        <section className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h1 className="font-serif text-3xl font-medium text-[#1c1a17] mb-2">
              Welcome Back
            </h1>
            <p className="text-xs text-[#7a756d] mb-6">
              Sign in to your AURA account to continue.
            </p>

            {user && (
              <p className="text-xs font-semibold text-[#1c1a17] mb-4 bg-[#f7f4ef] p-2.5 rounded border border-[#e5ded3]">
                Welcome back, {user.fname}!
              </p>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="you@example.com"
                  className="w-full border border-[#d8d1c5] rounded px-3.5 py-3 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
                  required
                />
              </div>

              <div>
                <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                  PASSWORD
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Your password"
                    className="w-full border border-[#d8d1c5] rounded px-3.5 py-3 pr-10 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#a49d90] hover:text-[#1c1a17] p-1 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.6]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.6]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[9.5px] font-bold tracking-wider text-[#57524a] uppercase">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#c9c1b3] text-[#1c1a17] focus:ring-0"
                  />
                  <span>REMEMBER ME</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-[#7a756d] hover:text-[#1c1a17] underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-6 hover:bg-[#3a352e] transition-colors shadow-sm mt-3"
              >
                SIGN IN
              </button>
            </form>

            <p className="text-center text-xs text-[#7a756d] mt-6">
              New to AURA?{' '}
              <Link
                href="/signup"
                className="font-semibold text-[#1c1a17] underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
