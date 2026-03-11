'use client'
import React from 'react';
import {
    Search,
    Bell,
    ChevronRight,
    User,
    Moon,
    Sun,
    Maximize,
    LayoutGrid
} from 'lucide-react';

interface TopBarProps {
    title: string;
    breadcrumb: string[];
}

const TopBar: React.FC<TopBarProps> = ({ title, breadcrumb }) => {
    return (
        <header className="h-20 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">

            {/* --- LEFT: BREADCRUMBS & CONTEXT --- */}
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <nav className="flex items-center gap-2 mb-1">
                        <a href="/" className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest no-underline transition-colors">
                            CORE
                        </a>
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

            {/* --- MIDDLE: GLOBAL SEARCH --- */}
            <div className="hidden md:flex flex-1 max-w-md mx-12">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari modul atau data (Cmd + K)..."
                        className="w-full bg-muted/50 border border-border text-[13px] pl-12 pr-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            {/* --- RIGHT: SYSTEM ACTIONS --- */}
            <div className="flex items-center gap-3">

                {/* Visual Utilities */}
                <div className="flex items-center gap-1 border-r border-border pr-3">
                    <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all" title="Full Screen">
                        <Maximize size={18} />
                    </button>
                    <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all" title="Theme Toggle">
                        <Sun size={18} />
                    </button>
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger border-2 border-background rounded-full" />
                </button>

                {/* Profile Trigger */}
                <button className="flex items-center gap-3 pl-3 py-1.5 hover:bg-muted rounded-lg transition-all group">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold text-foreground uppercase leading-none">Andrew D.</p>
                        <p className="text-[8px] font-medium text-muted-foreground uppercase tracking-tighter mt-1">Super Admin</p>
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