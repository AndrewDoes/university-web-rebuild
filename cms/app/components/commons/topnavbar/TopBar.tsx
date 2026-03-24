'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Bell,
    ChevronRight,
    User,
    Sun,
    Moon,
    Maximize,
    Minimize
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getStoredAuth } from '@/app/services/api';

interface TopBarProps {
    title: string;
    breadcrumb: string[];
}

const SEARCH_ITEMS = [
    { label: 'Dashboard', href: '/' },
    { label: 'Berita & Media', href: '/news' },
    { label: 'Kategori Berita', href: '/news/categories' },
    { label: 'Agenda Kampus', href: '/events' },
    { label: 'Testimoni', href: '/testimonial' },
    { label: 'Manajemen Dosen', href: '/lecturers' },
];

const TopBar: React.FC<TopBarProps> = ({ title, breadcrumb }) => {
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement | null>(null);

    const [adminName, setAdminName] = useState('Administrator');
    const [adminRole, setAdminRole] = useState('Admin');
    const [isDark, setIsDark] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        const auth = getStoredAuth();

        if (auth?.name) {
            setAdminName(auth.name);
        }

        if (auth?.role) {
            if (auth.role.toLowerCase() === 'admin') {
                setAdminRole('Super Admin');
            } else {
                setAdminRole(auth.role);
            }
        }

        const savedTheme = localStorage.getItem('sttb-theme');

        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return [];
        }

        return SEARCH_ITEMS.filter((item) =>
            item.label.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleThemeToggle = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);

        if (nextDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('sttb-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('sttb-theme', 'light');
        }
    };

    const handleFullscreenToggle = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Fullscreen error:', error);
        }
    };

    const handleSearchSelect = (href: string) => {
        setSearchQuery('');
        setShowSearchResults(false);
        router.push(href);
    };

    return (
        <header className="h-20 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <nav className="flex items-center gap-2 mb-1">
                        <Link
                            href="/"
                            className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest no-underline transition-colors"
                        >
                            CORE
                        </Link>

                        {breadcrumb.map((item, index) => (
                            <React.Fragment key={index}>
                                <ChevronRight size={10} className="text-muted-foreground opacity-40" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {item}
                                </span>
                            </React.Fragment>
                        ))}
                    </nav>

                    <h2 className="text-lg font-bold text-foreground leading-none tracking-tight">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-12">
                <div ref={searchRef} className="relative w-full group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Search size={16} />
                    </div>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSearchResults(true);
                        }}
                        onFocus={() => {
                            if (searchQuery.trim()) {
                                setShowSearchResults(true);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && filteredResults.length > 0) {
                                handleSearchSelect(filteredResults[0].href);
                            }
                        }}
                        placeholder="Cari modul atau data (Cmd + K)..."
                        className="w-full bg-muted/50 border border-border text-[13px] pl-12 pr-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text placeholder:text-muted-foreground/50"
                    />

                    {showSearchResults && searchQuery.trim() && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((item) => (
                                    <button
                                        key={item.href}
                                        type="button"
                                        onClick={() => handleSearchSelect(item.href)}
                                        className="w-full px-4 py-3 text-left text-[13px] text-foreground hover:bg-muted transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-[13px] text-muted-foreground">
                                    Tidak ada hasil.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 border-r border-border pr-3">
                    <button
                        type="button"
                        onClick={handleFullscreenToggle}
                        className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                        title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>

                    <button
                        type="button"
                        onClick={handleThemeToggle}
                        className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                        title={isDark ? 'Light Mode' : 'Dark Mode'}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                <button
                    type="button"
                    className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                >
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger border-2 border-background rounded-full" />
                </button>

                <button
                    type="button"
                    className="flex items-center gap-3 pl-3 py-1.5 hover:bg-muted rounded-lg transition-all group"
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold text-foreground uppercase leading-none">
                            {adminName}
                        </p>
                        <p className="text-[8px] font-medium text-muted-foreground uppercase tracking-tighter mt-1">
                            {adminRole}
                        </p>
                    </div>

                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <User size={18} />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default TopBar;