'use client'
import React from 'react';
import {
    Construction,
    Hammer,
    Compass,
    ArrowLeft,
    Clock,
    ShieldCheck,
    Mail,
    HardHat
} from 'lucide-react';

const UnderDevelopmentPage: React.FC = () => {
    return (
        <div className="bg-background min-h-[80vh] flex items-center justify-center font-sans pt-40 pb-20">
            <div className="container mx-auto px-6 relative">
                {/* Background Blueprint Accents */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                    <div className="grid grid-cols-12 h-full w-full">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-primary h-full" />
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                    {/* Visual Indicator */}
                    <div className="relative inline-block">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/5 border border-primary/10 rounded-full flex items-center justify-center animate-pulse">
                            <HardHat size={48} className="text-secondary" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full border-4 border-background">
                            <Construction size={20} className="text-secondary" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-secondary font-black tracking-[0.4em] uppercase text-xs md:text-sm">
                                Work In Progress
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-black text-primary font-serif tracking-tighter uppercase leading-tight">
                                Halaman Sedang <br /> <span className="italic text-muted-foreground/40">Dalam Pengembangan</span>
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed max-w-2xl mx-auto border-t border-border pt-6">
                            "Kami sedang mempersiapkan konten terbaik untuk bagian ini guna memastikan setiap informasi yang Anda terima memiliki kualitas akademis dan teologis yang unggul."
                        </p>
                    </div>

                    {/* Progress Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
                        <div className="p-6 bg-card border border-border rounded-sm flex flex-col items-center gap-3">
                            <Clock size={20} className="text-secondary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Est. Completion</span>
                            <span className="text-xs font-serif italic text-muted-foreground">Q2 2026</span>
                        </div>
                        <div className="p-6 bg-card border border-border rounded-sm flex flex-col items-center gap-3">
                            <ShieldCheck size={20} className="text-secondary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Quality Check</span>
                            <span className="text-xs font-serif italic text-muted-foreground">Verified</span>
                        </div>
                        <div className="p-6 bg-card border border-border rounded-sm flex flex-col items-center gap-3">
                            <Mail size={20} className="text-secondary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Notifications</span>
                            <span className="text-xs font-serif italic text-muted-foreground">Coming Soon</span>
                        </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <a
                            href="/"
                            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 transition-all shadow-xl no-underline"
                        >
                            <ArrowLeft size={16} /> Kembali ke Beranda
                        </a>
                        <a
                            href="mailto:official@sttb.ac.id"
                            className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-primary font-black uppercase tracking-widest text-[10px] rounded-sm hover:bg-muted transition-all no-underline"
                        >
                            Butuh Info Cepat?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnderDevelopmentPage;