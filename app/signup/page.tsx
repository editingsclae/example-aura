'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { toast } = useToast();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation
  const calculateStrength = (pass: string) => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) s++;
    if (/\d/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    return s;
  };
  const strength = calculateStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fname.trim()) {
      setError('First name is required.');
      return;
    }
    if (!lname.trim()) {
      setError('Last name is required.');
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters with a letter and a number.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('You must accept the terms of service.');
      return;
    }

    const success = signup(fname, lname, email, password);
    if (success) {
      router.push('/account');
    }
  };

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f7f4ef] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-[960px] bg-white border border-[#e5ded3] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(60,50,35,0.07)] grid grid-cols-1 lg:grid-cols-[45%_55%]">
        {/* Brand Left Panel */}
        <aside className="relative hidden lg:block overflow-hidden bg-[#1c1a17]">
          <Image
            src="/assets/aistudio/ritual_35dc71aa.png"
            alt="AURA skincare collection"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/95 via-[#1c1a17]/50 to-transparent flex flex-col justify-end p-10 text-white">
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#e9e2d4] mb-3">
              Join The Glow Club
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight mb-4 text-white">
              Begin your
              <br />
              skincare ritual.
            </h2>
            <ul className="space-y-2 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span>15% off your first order</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span>Early access to new launches</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span>Free samples with every order</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span>Faster checkout &amp; order tracking</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Form Panel */}
        <section className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h1 className="font-serif text-3xl font-medium text-[#1c1a17] mb-2">
              Create Account
            </h1>
            <p className="text-xs text-[#7a756d] mb-6">
              It takes less than a minute — your glow starts here.
            </p>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    value={fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                      setError('');
                    }}
                    className="w-full border border-[#d8d1c5] rounded px-3.5 py-2.5 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    value={lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                      setError('');
                    }}
                    className="w-full border border-[#d8d1c5] rounded px-3.5 py-2.5 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
                    required
                  />
                </div>
              </div>

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
                  className="w-full border border-[#d8d1c5] rounded px-3.5 py-2.5 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
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
                    placeholder="Min. 8 characters"
                    className="w-full border border-[#d8d1c5] rounded px-3.5 py-2.5 pr-10 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
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
                {/* Strength Meter */}
                <div className="flex gap-1.5 mt-2">
                  <div
                    className={`h-1 flex-1 rounded transition-colors ${
                      strength >= 1 ? 'bg-rose-500' : 'bg-[#e7e0d4]'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded transition-colors ${
                      strength >= 2 ? 'bg-amber-500' : 'bg-[#e7e0d4]'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded transition-colors ${
                      strength >= 3 ? 'bg-yellow-500' : 'bg-[#e7e0d4]'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded transition-colors ${
                      strength >= 4 ? 'bg-emerald-600' : 'bg-[#e7e0d4]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#57524a] mb-1.5">
                  CONFIRM PASSWORD
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Repeat your password"
                  className="w-full border border-[#d8d1c5] rounded px-3.5 py-2.5 text-xs outline-none focus:border-[#1c1a17] bg-white text-[#1c1a17]"
                  required
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-[#7a756d]">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      setError('');
                    }}
                    className="mt-0.5 w-3.5 h-3.5 rounded border-[#c9c1b3] text-[#1c1a17] focus:ring-0"
                  />
                  <span>
                    I agree to the{' '}
                    <span className="text-[#1c1a17] underline">Terms of Service</span> and{' '}
                    <span className="text-[#1c1a17] underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1c1a17] text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-6 hover:bg-[#3a352e] transition-colors shadow-sm mt-3"
              >
                CREATE ACCOUNT
              </button>
            </form>

            <p className="text-center text-xs text-[#7a756d] mt-6">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-[#1c1a17] underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
