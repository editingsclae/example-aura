'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, ArrowLeft } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSent(true);
  };

  const handleResend = () => {
    toast('Reset link resent — check your inbox');
  };

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f7f4ef] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-[440px] bg-white border border-[#e5ded3] rounded-lg p-8 sm:p-10 shadow-[0_20px_50px_rgba(60,50,35,0.07)] text-center">
        {!sent ? (
          <div>
            <div className="w-14 h-14 rounded-full bg-[#f2ece3] text-[#1c1a17] flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 stroke-[1.5]" />
            </div>

            <h1 className="font-serif text-3xl font-medium text-[#1c1a17] mb-2">
              Forgot Password?
            </h1>
            <p className="text-xs leading-relaxed text-[#7a756d] mb-6">
              No worries — it happens. Enter the email linked to your account and we&apos;ll send you a link to reset your password.
            </p>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded mb-4 text-left">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
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

              <button
                type="submit"
                className="w-full bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-6 hover:bg-[#3a352e] transition-colors shadow-sm mt-2"
              >
                SEND RESET LINK
              </button>
            </form>

            <p className="text-center text-xs text-[#7a756d] mt-6">
              Remembered it?{' '}
              <Link
                href="/login"
                className="font-semibold text-[#1c1a17] underline underline-offset-4"
              >
                Back to sign in
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#e8efe6] text-emerald-800 flex items-center justify-center mx-auto mb-5">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h1 className="font-serif text-3xl font-medium text-[#1c1a17]">
              Check Your Inbox
            </h1>
            <p className="text-xs leading-relaxed text-[#7a756d]">
              If an account exists for <b className="text-[#1c1a17]">{email}</b>, a password reset link is on its way. The link expires in 30 minutes.
            </p>
            <p className="text-[11.5px] text-[#7a756d]">
              Didn&apos;t get it? Check your spam folder, or try again in a minute.
            </p>

            <button
              type="button"
              onClick={handleResend}
              className="w-full border-1.5 border-[#1c1a17] text-[#1c1a17] bg-transparent text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-6 hover:bg-[#1c1a17] hover:text-white transition-colors mt-2"
            >
              RESEND RESET LINK
            </button>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#7a756d] hover:text-[#1c1a17] underline underline-offset-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
