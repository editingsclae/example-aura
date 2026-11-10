'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ToastContextType {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const toast = (msg: string) => {
    setMessage(msg);
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 bottom-7 -translate-x-1/2 z-[100] bg-[#1c1a17] text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
