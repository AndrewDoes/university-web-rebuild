'use client'
import React, { useEffect, useState } from 'react';
import { api, LecturerDto } from '@/app/services/api';
import { Loader2, BookOpen, GraduationCap, Users } from 'lucide-react';

const DewanDosenPage: React.FC = () => {
    const [lecturers, setLecturers] = useState<LecturerDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const data = await api.lecturers.getAll();
                setLecturers(data || []);
            } catch (error) {
                console.error("Error fetching lecturers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLecturers();
    }, []);

    return (
        <main className="min-h-screen bg-background font-sans text-foreground">
            {/* HERO SECTION */}
            <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="space-y-6 max-w-3xl">
                            <div className="glass-overlay inline-flex items-center gap-3 px-4 py-1.5 text-text-alt rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                                <Users size={14} className="text-secondary" /> Profil Institusi
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-alt font-serif tracking-tighter leading-none italic">
                                Dewan <br />
                                <span className="text-secondary not-italic opacity-90">Dosen</span>
                            </h1>
                            <p className="text-primary-foreground/70 text-sm md:text-base leading-relaxed font-medium max-w-2xl">
                                Tenaga pendidik Sekolah Tinggi Teologi Bandung yang berdedikasi tinggi, mengedepankan keunggulan akademis dan pembentukan karakter rohani.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-24 container mx-auto px-6">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-primary font-serif uppercase tracking-tighter italic">Pengajar Kami</h2>
                        <p className="text-muted-foreground text-sm font-medium">Temui para dosen yang akan membimbing perjalanan akademis Anda.</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-4 py-2 rounded-sm border border-border">
                            <GraduationCap size={14} className="text-secondary" /> {lecturers.length} Dosen Aktif
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-xs uppercase tracking-widest font-bold">Memuat data dosen...</p>
                    </div>
                ) : lecturers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {lecturers.map((lecturer) => (
                            <div key={lecturer.id} className="group bg-card border border-border rounded-sm overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                <div className="aspect-[4/5] w-full overflow-hidden bg-muted relative">
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                                    <img 
                                        src={lecturer.photo || "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1587&auto=format&fit=crop"} 
                                        alt={lecturer.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute bottom-6 left-6 right-6 z-20 text-text-alt">
                                        <h3 className="text-2xl font-black font-serif uppercase tracking-tight leading-none mb-2">{lecturer.name}</h3>
                                        <p className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">{lecturer.position}</p>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col bg-card">
                                    <div className="flex items-start gap-3 mb-4 opacity-70">
                                        <BookOpen size={16} className="text-primary shrink-0 mt-1" />
                                        <p className="text-sm font-medium text-foreground leading-relaxed italic line-clamp-4">
                                            "{lecturer.description}"
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-6 border-t border-border">
                                        <button className="text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                                            Lihat Profil Lengkap &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-sm bg-muted/30">
                        <Users size={48} className="text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-serif font-black text-muted-foreground italic mb-2">Belum ada data dosen</h3>
                        <p className="text-sm text-muted-foreground font-medium">Data dewan dosen sedang dalam pembaruan.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default DewanDosenPage;
