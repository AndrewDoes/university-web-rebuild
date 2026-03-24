'use client';

import React, { useEffect, useState, useCallback } from 'react';
import './globals.css';
import { usePathname } from 'next/navigation';
import Sidebar from './components/commons/sidebar/Sidebar';
import TopBar from './components/commons/topnavbar/TopBar';
import AuthGuard from './components/commons/auth/AuthGuard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5176/api';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    const [apiStatus, setApiStatus] = useState<'connected' | 'error' | 'loading'>('loading');
    const [pageMeta, setPageMeta] = useState({
        title: 'Dashboard Overview',
        breadcrumb: [] as string[],
    });

    useEffect(() => {
        let title = 'Dashboard Overview';
        let breadcrumb: string[] = [];

        if (pathname === '/') {
            title = 'Dashboard Overview';
            breadcrumb = [];
        } else if (pathname === '/login') {
            title = 'Login Admin';
            breadcrumb = [];
        } else if (pathname.startsWith('/news/categories')) {
            title = 'Kategori Berita';
            breadcrumb = ['Kategori Berita'];
        } else if (pathname.startsWith('/news')) {
            title = 'Berita & Media';
            breadcrumb = ['Berita & Media'];
        } else if (pathname.startsWith('/events')) {
            title = 'Agenda Kampus';
            breadcrumb = ['Agenda Kampus'];
        } else if (pathname.startsWith('/testimonial')) {
            title = 'Testimoni';
            breadcrumb = ['Testimoni'];
        } else if (pathname.startsWith('/lecturers')) {
            title = 'Manajemen Dosen';
            breadcrumb = ['Manajemen Dosen'];
        } else if (pathname.startsWith('/settings')) {
            title = 'Sistem Admin';
            breadcrumb = ['Sistem Admin'];
        }

        setPageMeta({ title, breadcrumb });
        document.title = `STTB CORE | ${title}`;
    }, [pathname]);

    const checkApiStatus = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/test/db-health`, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error('Database not connected');
            }

            setApiStatus('connected');
        } catch {
            setApiStatus('error');
        }
    }, []);

    useEffect(() => {
        checkApiStatus();
    }, [checkApiStatus]);

    useEffect(() => {
        const handleRefreshApiStatus = () => {
            checkApiStatus();
        };

        window.addEventListener('refresh-api-status', handleRefreshApiStatus);

        return () => {
            window.removeEventListener('refresh-api-status', handleRefreshApiStatus);
        };
    }, [checkApiStatus]);

    const isLoginPage = pathname === '/login';

    return (
        <html lang="en">
            <body className="bg-background text-foreground antialiased font-sans transition-colors duration-300">
                <AuthGuard>
                    {isLoginPage ? (
                        children
                    ) : (
                        <div className="flex min-h-screen bg-background text-foreground">
                            <Sidebar apiStatus={apiStatus} />

                            <div className="flex-1 ml-72 flex flex-col min-h-screen relative">
                                <TopBar
                                    title={pageMeta.title}
                                    breadcrumb={pageMeta.breadcrumb}
                                />

                                <main className="flex-1 p-8 lg:p-12 relative overflow-y-auto">
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
                    )}
                </AuthGuard>
            </body>
        </html>
    );
}