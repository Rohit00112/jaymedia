'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth } from './client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          // Token claims or email check for admin privileges
          const token = await currentUser.getIdTokenResult();
          setIsAdmin(!!token.claims.admin || currentUser.email?.endsWith('@jaymediamanagement.com') || false);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

