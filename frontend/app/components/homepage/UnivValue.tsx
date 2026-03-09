'use client'
import React from 'react';
import { Shield, Cross, Book, Briefcase, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const UnivValueSection: React.FC = () => {
    return (
        <section className="relative w-full overflow-hidden border-t border-border/50">
            <div className="flex flex-col lg:flex-row min-h-175">

                <div className="w-full lg:w-3/5 bg-muted p-12 lg:p-24 relative">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 -translate-y-1/2 -translate-x-1/2 rotate-12 pointer-events-none" />

                    {/* VISI */}
                    <div className="max-w-3xl space-y-16 relative z-10">
                        <div className="space-y-6 group cursor-default">
                            <div className="flex items-baseline space-x-4">
                                <h2 className="text-6xl font-black text-primary/50 uppercase tracking-tighter select-none group-hover:text-primary/80 transition-colors duration-500">VISI</h2>
                                <div className="h-1 flex-1 bg-secondary/30 group-hover:bg-secondary/60 transition-colors duration-500" />
                            </div>
                            <p className="text-2xl md:text-3xl text-foreground font-medium leading-tight font-serif group-hover:text-primary transition-colors duration-500">
                                Menjadi institusi pendidikan teologi yang mempersiapkan <span className="text-primary italic font-bold">pastor-scholar</span> yang transformatif dan memberdayakan seluruh umat Allah.
                            </p>
                        </div>

                        {/* MISI SECTION */}
                        <div className="space-y-8 group">
                            <div className="flex items-baseline space-x-4">
                                <h2 className="text-6xl font-black text-primary/50 uppercase tracking-tighter select-none group-hover:text-primary/80 transition-colors duration-500">MISI</h2>
                                <div className="h-1 flex-1 bg-secondary/30" />
                            </div>

                            <div className="grid gap-8">
                                {/* Misi Item 1 */}
                                <div className="flex items-start space-x-4 group cursor-default">
                                    <div className="mt-1 bg-primary p-1.5 rounded-sm text-primary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <p className="text-lg text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">
                                        Mempersiapkan <span className="italic font-bold text-foreground">pastor-scholar</span> yang transformatif untuk melayani dalam konteks urban.
                                    </p>
                                </div>

                                {/* Misi Item 2 */}
                                <div className="flex items-start space-x-4 group cursor-default">
                                    <div className="mt-1 bg-primary p-1.5 rounded-sm text-primary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <p className="text-lg text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">
                                        Memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya melalui penelitian dan pendidikan.
                                    </p>
                                </div>

                                {/* Misi Item 3 */}
                                <div className="flex items-start space-x-4 group cursor-default">
                                    <div className="mt-1 bg-primary p-1.5 rounded-sm text-primary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <p className="text-lg text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">
                                        Mengembangkan tim dosen dan kemitraan strategis untuk mendukung pencapaian visi STTB.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA button */}
                        <div className="pt-6">
                            <a href="/profil" className="inline-flex items-center px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-900 transition-all shadow-xl shadow-primary/10 group no-underline">
                                Selengkapnya
                                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: CORE VALUES (Dark Theme) --- */}
                <div className="w-full lg:w-2/5 bg-primary p-12 lg:p-24 text-primary-foreground relative overflow-hidden flex flex-col justify-center">
                    {/* Background Decorative Gold Accent */}
                    <div className="absolute bottom-0 right-0 w-64 h-4 bg-secondary/80" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-16">
                            <Shield className="text-secondary w-12 h-12" />
                            <h2 className="text-5xl font-bold font-serif uppercase tracking-tighter">Core Values</h2>
                        </div>

                        <div className="space-y-12">
                            {/* Value 1 */}
                            <div className="space-y-4 group cursor-default">
                                <h3 className="text-2xl font-bold text-secondary uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                    <Cross className="mr-4 w-6 h-6" /> Christ Centered
                                </h3>
                                <ul className="text-base text-primary-foreground/70 space-y-2 pl-10 border-l border-secondary/30 group-hover:border-secondary transition-colors duration-300">
                                    <li>Berpusat pada karya penebusan Kristus.</li>
                                    <li>Mandat budaya dan mandat Injil Alkitabiah.</li>
                                </ul>
                            </div>

                            {/* Value 2 */}
                            <div className="space-y-4 group cursor-default">
                                <h3 className="text-2xl font-bold text-secondary uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                    <Book className="mr-4 w-6 h-6" /> Teks-Konteks
                                </h3>
                                <ul className="text-base text-primary-foreground/70 space-y-2 pl-10 border-l border-secondary/30 group-hover:border-secondary transition-colors duration-300">
                                    <li>Setia kepada Firman Tuhan dan warisan iman.</li>
                                    <li>Responsif terhadap konteks sosial urban.</li>
                                </ul>
                            </div>

                            {/* Value 3 */}
                            <div className="space-y-4 group cursor-default">
                                <h3 className="text-2xl font-bold text-secondary uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                    <Briefcase className="mr-4 w-6 h-6" /> Penatalayanan
                                </h3>
                                <ul className="text-base text-primary-foreground/70 space-y-2 pl-10 border-l border-secondary/30 group-hover:border-secondary transition-colors duration-300">
                                    <li>Integritas, Transparansi, dan Akuntabilitas.</li>
                                    <li>Dedikasi dan Kompetensi Akademik.</li>
                                </ul>
                            </div>

                            {/* Value 4 */}
                            <div className="space-y-4 group cursor-default">
                                <h3 className="text-2xl font-bold text-secondary uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                    <Sparkles className="mr-4 w-6 h-6" /> Transformatif
                                </h3>
                                <p className="text-base text-primary-foreground/70 pl-10 border-l border-secondary/30 group-hover:border-secondary transition-colors duration-300 italic">
                                    Karya penebusan Kristus yang nyata bagi semua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default UnivValueSection;