'use client'
import React, { useState, useEffect } from 'react';
import { BookOpen, UserCheck, Zap, GraduationCap, ChevronRight, Download } from 'lucide-react';

const ProgramDetail: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative w-full min-h-[90vh] flex items-center bg-muted/80 overflow-hidden">

            <div className="container mx-auto px-6 relative z-10 py-12">
                <div className="flex flex-col lg:flex-row items-stretch shadow-2xl rounded-sm overflow-hidden border border-border/50">


                    <div className="w-full lg:w-5/12 relative group flex flex-col">

                        {isMounted && (
                            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                                <div className="grid grid-cols-8 h-full w-full gap-1">
                                    {[...Array(64)].map((_, i) => (
                                        <div key={i} className={`rounded-full ${i % 4 === 0 ? 'bg-secondary' : i % 4 === 1 ? 'bg-background' : 'transparent'}`}
                                            style={{
                                                height: '4px',
                                                width: '4px',
                                                marginTop: `${Math.random() * 20}px`,
                                                marginLeft: `${Math.random() * 20}px`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className="relative z-10 bg-primary p-12 lg:p-20 h-full flex flex-col justify-center border-b-8 lg:border-b-0 lg:border-r-8 border-secondary">
                            <div className="mb-6 inline-block">
                                <span className="bg-secondary/20 text-secondary border border-secondary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
                                    Undergraduate Program
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-8 font-serif leading-[1.1] tracking-tight">
                                Sarjana <br /> <span className="text-secondary uppercase">Teologi</span>
                            </h1>

                            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 border-l-2 border-secondary/50 pl-6">
                                Mempersiapkan hamba Tuhan yang memiliki integritas Alkitabiah, kedalaman spiritual, dan ketajaman intelektual untuk melayani di berbagai medan pelayanan global.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-auto">
                                <a href="/admission" className="bg-secondary text-secondary-foreground px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center group no-underline shadow-lg shadow-secondary/20">
                                    Daftar Sekarang
                                    <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <button className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all flex items-center backdrop-blur-sm">
                                    <Download size={16} className="mr-2" /> Kurikulum
                                </button>
                            </div>

                            <div className="absolute top-10 right-10 opacity-10">
                                <GraduationCap size={160} className="text-primary-foreground" />
                            </div>
                        </div>
                    </div>


                    <div className="w-full lg:w-7/12 bg-card p-12 lg:px-20 lg:py-24 relative flex flex-col justify-center border-l border-border/50">
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-foreground mb-1 font-serif uppercase tracking-tighter">
                                    Profil Lulusan
                                </h2>

                                <div className='bg-primary/10 border border-secondary px-4 py-1 rounded-sm'>
                                    <span className='text-2xl font-bold font-serif tracking-tighter text-secondary italic'>S.Th</span>
                                </div>
                            </div>
                            <div className="w-20 h-1 bg-secondary mt-2" />
                        </div>

                        <div className="mb-14">
                            <span className="text-primary italic font-semibold text-xl tracking-wide bg-primary/5 px-4 py-2 border-l-4 border-primary inline-block">
                                "Transformative Pastor-Scholar"
                            </span>
                        </div>


                        <div className="space-y-12">

                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-14 h-14 bg-muted rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:rotate-6 shadow-sm border border-border">
                                    <BookOpen size={28} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest flex items-center">
                                        Informed
                                    </h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base border-b border-border pb-4 italic">
                                        Pastor-scholar yang berpengetahuan luas dan aplikatif terhadap tantangan perkembangan pelayanan gerejawi dalam konteks urban yang dinamis.
                                    </p>
                                </div>
                            </div>

                            {/* Point 2: Transformed */}
                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-14 h-14 bg-muted rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:rotate-6 shadow-sm border border-border">
                                    <UserCheck size={28} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest flex items-center">
                                        Transformed
                                    </h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base border-b border-border pb-4 italic">
                                        Pembelajar yang memiliki fondasi spiritualitas yang kokoh, integritas Alkitabiah, serta karakter rohani yang matang dan teruji.
                                    </p>
                                </div>
                            </div>

                            {/* Point 3: Transformative */}
                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-14 h-14 bg-muted rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:rotate-6 shadow-sm border border-border">
                                    <Zap size={28} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest flex items-center">
                                        Transformative
                                    </h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base italic">
                                        Pastor-scholar yang membawa perubahan nyata dan berdampak positif bagi jemaat serta lingkungan tempatnya diutus untuk melayani.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Blur using Predefined Primary */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        </section>
    );
};

export default ProgramDetail;