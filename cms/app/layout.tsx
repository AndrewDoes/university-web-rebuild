'use client'
import React, { useEffect, useState } from 'react';
import "./globals.css";
import Sidebar from './components/commons/sidebar/Sidebar';
import TopBar from './components/commons/topnavbar/TopBar';
import { AuthProvider, useAuth } from './services/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

/**
 * --- STTB CORE ADMIN LAYOUT CONTENT ---
 * Handles the actual layout structure and route protection logic.
 */
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [apiStatus, setApiStatus] = useState<'connected' | 'error' | 'loading'>('connected');
  const [pageMeta, setPageMeta] = useState({ title: 'Dashboard', breadcrumb: [] as string[] });

  // Route protection
  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login') {
      router.replace('/login');
    }
  }, [user, isLoading, pathname, router]);

  // Sinkronisasi Meta Halaman berdasarkan Pathname
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      let title = 'Dashboard Overview';
      let breadcrumb: string[] = [];

      if (path === '/') {
        title = 'Dashboard Overview';
        breadcrumb = [];
      } else if (path.includes('/news')) {
        title = 'Manajemen Berita';
        breadcrumb = ['Berita & Media'];
      } else if (path.includes('/events')) {
        title = 'Agenda Kampus';
        breadcrumb = ['Events'];
      } else if (path.includes('/testimonial')) {
        title = 'Manajemen Testimoni';
        breadcrumb = ['Testimoni'];
      } else if (path.includes('/lecturers')) {
        title = 'Manajemen Dosen';
        breadcrumb = ['Personalia'];
      } else if (path.includes('/settings')) {
        title = 'Pengaturan Sistem';
        breadcrumb = ['Settings'];
      } else if (path.includes('/login')) {
        title = 'Login Portal';
        breadcrumb = [];
      }

      setPageMeta({ title, breadcrumb });
      document.title = `STTB CORE | ${title}`;
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Initializing STTB Core...</p>
        </div>
      </div>
    );
  }

  // If on login page, don't show sidebar and topbar
  if (pathname === '/login') {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  // If not logged in and not on login page, show nothing while redirecting
  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {/* --- SIDEBAR AREA (FIXED) --- */}
      <Sidebar apiStatus={apiStatus} />

      {/* --- MAIN WORKSPACE AREA --- */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen relative">
        {/* --- TOP BAR (STICKY) --- */}
        <TopBar title={pageMeta.title} breadcrumb={pageMeta.breadcrumb} />

        <main className="flex-1 p-8 lg:p-12 relative overflow-y-auto">
          <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>

        <footer className="px-12 py-4 border-t border-border flex justify-between items-center opacity-40">
          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
            STTB CORE SYSTEMS v1.0.4
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} STT Bandung
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <title>CMS STTB</title>
        <meta name="description" content="Website STTB Internal Management System" />
        <link rel="icon" href="/logo-siakad.png" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans transition-colors duration-300">
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}