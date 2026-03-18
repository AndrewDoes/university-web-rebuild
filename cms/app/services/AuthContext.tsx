'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, LoginResponseDto } from './api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const savedUser = localStorage.getItem('sttb_cms_user');
    const token = localStorage.getItem('sttb_cms_token');

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user session', e);
        localStorage.removeItem('sttb_cms_user');
        localStorage.removeItem('sttb_cms_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: LoginResponseDto = await api.auth.login({ email, password });
      
      // Check if the user has the 'admin' role
      if (response.role.toLowerCase() !== 'admin') {
        throw new Error('Hanya administrator yang dapat mengakses CMS.');
      }

      const userData: User = {
        id: response.id,
        email: response.email,
        name: response.name,
        role: response.role,
      };

      setUser(userData);
      localStorage.setItem('sttb_cms_user', JSON.stringify(userData));
      localStorage.setItem('sttb_cms_token', response.token);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sttb_cms_user');
    localStorage.removeItem('sttb_cms_token');
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

