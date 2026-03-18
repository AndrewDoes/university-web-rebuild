'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    const savedUser = localStorage.getItem('sttb_cms_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        if (!parsedUser.name) {
          parsedUser.name = parsedUser.username || 'Administrator';
        }
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse user session', e);
        localStorage.removeItem('sttb_cms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {

    // mock data, change later pls
    if (username === 'admin' && password === 'admin123') {
      const mockUser = {
        username: 'admin',
        name: 'Administrator',
        role: 'admin'
      };
      setUser(mockUser);
      localStorage.setItem('sttb_cms_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sttb_cms_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useUser = () => {
  const { user } = useAuth();
  return user;
};

