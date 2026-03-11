'use client'
import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Newspaper,
    Calendar,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Database,
    Cpu,
    Command,
    Activity
} from 'lucide-react';

interface SidebarProps {
    apiStatus: 'connected' | 'error' | 'loading';
}

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/' },
    { id: 'news', label: 'Berita & Media', icon: <Newspaper size={20} />, href: '/news' },
    { id: 'events', label: 'Agenda Kampus', icon: <Calendar size={20} />, href: '/events' },
    { id: 'dosen', label: 'Manajemen Dosen', icon: <Users size={20} />, href: '/dosen' },
];

const Sidebar: React.FC<SidebarProps> = ({ apiStatus }) => {
    const [currentPath, setCurrentPath] = useState('');

    // Menggunakan useEffect untuk mendapatkan pathname tanpa modul next/navigation yang bermasalah di preview
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    return (
        <aside className="w-72 bg-sidebar-bg text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/50 font-sans shadow-lg transition-colors">

            {/* --- BRANDING SECTION --- */}
            <div className="p-8 border-b border-border relative overflow-hidden group">
                {/* Aksen dekoratif menggunakan token warna --primary */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                <div className="relative z-10 flex flex-col">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-110">
                            <Cpu className="text-primary-foreground" size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tighter uppercase leading-none text-foreground">
                                STTB <span className="text-primary">CORE</span>
                            </span>
                            <span className="text-[7px] font-bold text-primary/60 uppercase tracking-[0.5em] mt-1 ml-0.5">
                                Internal Systems
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- NAVIGATION LINKS --- */}
            <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
                <div className="px-4 flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                        Menu Utama
                    </p>
                    <Command size={10} className="text-muted-foreground opacity-40" />
                </div>

                {navItems.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300 group relative overflow-hidden no-underline border border-transparent ${isActive
                                ? "bg-primary text-primary-foreground shadow-xl translate-x-1"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <span className={`${isActive ? "text-primary-foreground" : "text-primary/70 group-hover:text-primary transition-colors"}`}>
                                    {item.icon}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    {item.label}
                                </span>
                            </div>

                            {isActive ? (
                                <ChevronRight size={14} className="animate-in slide-in-from-left-2 duration-300 opacity-60 z-10" />
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 scale-0 group-hover:scale-100" />
                            )}
                        </a>
                    );
                })}

                {/* --- SYSTEM ADMINISTRATION --- */}
                <div className="pt-8 mt-8 border-t border-border/50 space-y-1.5">
                    <div className="px-4 flex items-center justify-between mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                            Konfigurasi
                        </p>
                        <Activity size={10} className="text-muted-foreground opacity-40" />
                    </div>
                    <a
                        href="/settings"
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all no-underline border border-transparent ${currentPath === '/settings'
                            ? "bg-muted text-foreground border-border"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                            }`}
                    >
                        <Settings size={20} className={currentPath === '/settings' ? 'text-primary' : 'text-muted-foreground'} />
                        <span className="text-xs font-bold uppercase tracking-widest text-inherit">Sistem Admin</span>
                    </a>
                </div>
            </nav>

            {/* --- FOOTER / STATUS SECTION --- */}
            <div className="p-6 border-t border-border bg-muted/20">
                <div className="space-y-6">
                    {/* API Connection Indicator */}
                    <div className="bg-background/80 p-4 rounded-xl border border-border space-y-3 shadow-inner">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Database size={12} className="text-secondary" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">ASP.NET API</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${apiStatus === 'connected' ? 'bg-secondary' :
                                    apiStatus === 'error' ? 'bg-danger shadow-[0_0_8px_var(--danger)]' :
                                        'bg-secondary animate-pulse'
                                    }`} />
                                <span className={`text-[9px] font-bold uppercase ${apiStatus === 'connected' ? 'text-secondary' :
                                    apiStatus === 'error' ? 'text-danger' : 'text-secondary'
                                    }`}>
                                    {apiStatus === 'connected' ? 'Live' : apiStatus === 'error' ? 'Offline' : 'Syncing'}
                                </span>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-1000 ${apiStatus === 'connected' ? 'w-full bg-secondary' :
                                apiStatus === 'error' ? 'w-0' : 'w-1/2 bg-secondary'
                                }`} />
                        </div>
                    </div>

                    {/* Admin Profile & Logout */}
                    <div className="flex items-center gap-4 px-2">
                        <div className="relative group/avatar cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shadow-lg transition-transform group-hover:rotate-6">
                                AD
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-secondary border-[3px] border-sidebar-bg rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] font-bold uppercase tracking-widest truncate leading-none text-foreground">Administrator</p>
                            <p className="text-[8px] opacity-30 uppercase font-bold tracking-tighter mt-1.5 group-hover:opacity-60 transition-opacity text-foreground">Full Access Node</p>
                        </div>
                        <a
                            href="/logout"
                            className="p-2.5 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-xl transition-all active:scale-90"
                        >
                            <LogOut size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;