'use client'
import React, { useEffect, useState } from 'react';
import "./globals.css";
import Sidebar from './components/commons/sidebar/Sidebar';
import TopBar from './components/commons/topnavbar/TopBar';

/**
 * --- STTB CORE ADMIN LAYOUT ---
 * Handles global state for API status and dynamic page metadata
 * based on the current navigation path.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiStatus, setApiStatus] = useState<'connected' | 'error' | 'loading'>('connected');
  const [pageMeta, setPageMeta] = useState({ title: 'Dashboard', breadcrumb: [] as string[] });

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
      }

      setPageMeta({ title, breadcrumb });

      document.title = `STTB CORE | ${title}`;
    };

    // Initial check
    handleRouteChange();

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange);

    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <html lang="id">
      <head>
        <title>CMS STTB</title>
        <meta name="description" content="Website STTB Internal Management System" />
        <link rel="icon" href="/logo-siakad.png" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans transition-colors duration-300">
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
      </body>
    </html>
  );
}