'use client'
import React from 'react';
import { ChevronRight, PlayCircle, Award, Cross } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-primary">
            {/* Background Image with Predefined Primary Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent z-10" />
                <img
                    src="https://sttb.ac.id/storage/2024/03/Russel-1080x675.png"
                    alt="STT Bandung Campus Life"
                    className="w-full h-full object-cover object-center brightness-75 scale-105"
                />
            </div>


            <div className="container mx-auto px-6 relative z-20 pt-32 pb-12">
                <div className="max-w-4xl">

                    <div className="inline-flex items-center space-x-3 bg-secondary/10 border border-secondary/30 backdrop-blur-md px-4 py-2 rounded-full mb-8">
                        <Cross size={18} className="text-secondary" />
                        <span className="text-secondary text-[11px] font-bold uppercase tracking-[0.25em]">Sola Scriptura</span>
                    </div>


                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.05] mb-4 font-serif tracking-tighter">
                        <span className="text-secondary italic">Sekolah Tinggi Teologi Bandung.</span>
                    </h1>

                    <p className="text-2xl md:text-3xl lg:text-4xl text-primary-foreground/80 leading-relaxed mb-12 max-w-2xl font-bold">
                        Bandung Theological Seminary
                    </p>

                    <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80 leading-relaxed mb-12 max-w-2xl font-light">
                        Menghasilkan pastor-scholar yang berdampak dalam konteks pelayanan urban
                    </p>


                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                        <a
                            href="/pendaftaran"
                            className="bg-secondary text-secondary-foreground px-12 py-5 rounded-sm font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-all shadow-2xl flex items-center justify-center group no-underline"
                        >
                            Daftar Sekarang
                            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button className="flex items-center justify-center space-x-3 text-primary-foreground group hover:text-secondary transition-colors"
                            onClick={() => {
                                window.open('https://youtu.be/hTh0QkKxNhg');
                            }}>
                            <div className="w-14 h-14 rounded-full border border-primary-foreground/30 flex items-center justify-center group-hover:border-secondary transition-colors">
                                <PlayCircle size={24} />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest">Video Profil</span>
                        </button>
                    </div>

                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-primary-foreground/10">
                        <div className="space-y-1">
                            <p className="text-secondary text-2xl font-bold font-serif">A</p>
                            <p className="text-primary-foreground/50 text-[10px] uppercase font-bold tracking-widest">Akreditasi BAN-PT</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-secondary text-2xl font-bold font-serif">1.2k+</p>
                            <p className="text-primary-foreground/50 text-[10px] uppercase font-bold tracking-widest">Alumni Global</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-secondary text-2xl font-bold font-serif">45+</p>
                            <p className="text-primary-foreground/50 text-[10px] uppercase font-bold tracking-widest">Tahun Berdiri</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-secondary text-2xl font-bold font-serif">ATESEA</p>
                            <p className="text-primary-foreground/50 text-[10px] uppercase font-bold tracking-widest">Regional Member</p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Animated Scroll Hint */}
            <div className="absolute bottom-10 right-10 flex flex-col items-center space-y-4 opacity-50">
                <span className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.3em] font-bold text-primary-foreground">Scroll Explore</span>
                <div className="w-px h-16 bg-linear-to-b from-primary-foreground to-transparent" />
            </div>
        </section>
    );
};

export default Hero;