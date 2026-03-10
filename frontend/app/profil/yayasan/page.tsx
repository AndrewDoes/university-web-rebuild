'use client'
import React, { useState, useEffect } from 'react';
import {
    Users,
    ShieldCheck,
    Briefcase,
    Scale,
    ChevronRight,
    Award,
    GanttChart
} from 'lucide-react';

const dewanPembina = [
    "Pdt. Agus Gunawan, Ph.D.",
    "Pnt. Subianto Tjandra",
    "Pdt. Budiyanto Santosa, D.Min."
];

const dewanPengurus = [
    { role: "Ketua", name: "Pnts. Benny Soenarjo" },
    { role: "Wakil Ketua", name: "Pnts. Ginawan Chondro" },
    { role: "Sekretaris", name: "Pnt. Arif Subagyo" },
    { role: "Bendahara", name: "Pnt. Widianto Tjandradipura" }
];

const anggota = [
    "Pnts. Agus Tjandra",
    "Ev. Doroti Tunggal Widjaja, M.Th.",
    "Bp. Eddy Samuel Affendie",
    "Pnts. Edi Sukamto Josana",
    "Bp. Herjanto Gunawan",
    "Pnts. Joseph Koshan",
    "Pnt. Suwito Kwee"
];

const YayasanPage: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="bg-background min-h-screen">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-24 lg:py-32 top-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-12 h-full w-full">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-primary-foreground/10 h-full" />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-secondary">
                        <GanttChart size={20} />
                        <span className="font-bold tracking-[0.4em] uppercase text-xs">Struktur Kepemimpinan</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                        Organ Yayasan <br /> <span className="text-secondary italic">STT Bandung</span>
                    </h1>
                </div>
            </div>

            {/* --- SECTION: BOARD OF TRUSTEES (PEMBINA) --- */}
            <section className="py-24 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 space-y-6">
                            <div className="inline-block px-4 py-1 bg-primary/5 border-l-4 border-primary">
                                <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Governance</span>
                            </div>
                            <h2 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">
                                Dewan <br /> Pembina
                            </h2>
                            <p className="text-muted-foreground text-[13px] leading-relaxed italic pr-12">
                                "Badan tertinggi yang mengawasi arah kebijakan dan integritas teologis institusi guna menjamin tercapainya visi pastor-scholar."
                            </p>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {dewanPembina.map((name, i) => (
                                <div key={i} className="group p-8 border border-border bg-background hover:border-secondary transition-all rounded-sm flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h4 className="text-[13px] font-bold text-primary uppercase tracking-wider leading-relaxed">
                                        {name}
                                    </h4>
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-2">Pembina</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION: EXECUTIVE BOARD (PENGURUS) --- */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs">Management</h2>
                        <h3 className="text-4xl font-bold font-serif text-primary uppercase tracking-tighter">Dewan Pengurus</h3>
                        <div className="w-20 h-1 bg-secondary mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dewanPengurus.map((item, i) => (
                            <div key={i} className="relative group p-10 bg-card border border-border rounded-sm hover:shadow-2xl transition-all duration-500 text-center">
                                {/* Decorative line */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-500" />

                                <div className="mb-8 flex justify-center">
                                    <div className="w-14 h-14 bg-muted flex items-center justify-center text-primary rounded-sm group-hover:rotate-6 transition-transform">
                                        <Briefcase size={28} />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-3">
                                    {item.role}
                                </p>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-wider leading-relaxed">
                                    {item.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION: MEMBERS (ANGGOTA) --- */}
            <section className="py-24 bg-muted/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-6 mb-16">
                            <div className="w-12 h-px bg-secondary" />
                            <h3 className="text-2xl font-bold font-serif text-primary uppercase tracking-tighter">Anggota Yayasan</h3>
                            <div className="flex-1 h-px bg-border" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {anggota.map((name, i) => (
                                <div key={i} className="flex items-center space-x-4 py-4 border-b border-border/50 group hover:scale-105 transition-all duration-300">
                                    <span className="text-[10px] font-serif italic text-secondary font-bold transition-opacity">
                                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                    </span>
                                    <p className="text-[12px] md:text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">
                                        {name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA & NAVIGATION --- */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h4 className="text-primary font-bold font-serif uppercase tracking-widest text-[10px] mb-10">Telusuri Profil Institusi</h4>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { label: 'Sejarah Perjalanan', href: '/profil/sejarah' },
                            { label: 'Visi & Misi Kami', href: '/profil/visi-misi' },
                            { label: 'Dewan Pengajar', href: '/profil/dosen' }
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="group flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all no-underline"
                            >
                                <span>{link.label}</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-secondary" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default YayasanPage;