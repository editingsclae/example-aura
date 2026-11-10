'use client';

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
import { useToast } from './ToastContext';
import {
  User,
  DEFAULT_USER,
  subscribeUser,
  getUserSnapshot,
  getUserServerSnapshot,
  writeUserToStorage,
  subscribeLoggedIn,
  getLoggedInSnapshot,
  getLoggedInServerSnapshot,
  writeLoggedInToStorage
} from '@/lib/storage';

export type { User };

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (fname: string, lname: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribeUser, getUserSnapshot, getUserServerSnapshot);
  const isLoggedIn = useSyncExternalStore(subscribeLoggedIn, getLoggedInSnapshot, getLoggedInServerSnapshot);
  const { toast } = useToast();

  const login = (email: string, _pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const currentUser = user || DEFAULT_USER;
    if (cleanEmail === currentUser.email.toLowerCase() || cleanEmail.includes('@')) {
      const updated = { ...currentUser, email: cleanEmail };
      writeUserToStorage(updated);
      writeLoggedInToStorage(true);
      toast(`Welcome back, ${updated.fname || 'there'}!`);
      return true;
    }
    toast('Invalid credentials');
    return false;
  };

  const signup = (fname: string, lname: string, email: string, pass: string) => {
    const newUser: User = {
      fname: fname.trim(),
      lname: lname.trim(),
      email: email.trim().toLowerCase(),
      password: pass,
      phone: '20514118',
      address: 'Av Monji Slim',
      city: 'Tunis',
      zip: '1000',
      country: 'Tunisia (TN)'
    };
    writeUserToStorage(newUser);
    writeLoggedInToStorage(true);
    toast('Account created — welcome to AURA!');
    return true;
  };

  const logout = () => {
    writeLoggedInToStorage(false);
    toast('Logged out successfully');
  };

  const updateProfile = (data: Partial<User>) => {
    const updated = { ...(user || DEFAULT_USER), ...data };
    writeUserToStorage(updated);
    toast('Profile updated successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
