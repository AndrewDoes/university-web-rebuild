'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, FileText, Clock } from 'lucide-react';

const categories = ["All", "Civitas", "Akademik", "Kemahasiswaan", "Institusi", "Kegiatan", "Alumni"];

const featuredNews = {
    id: 1,
    title: "Perspectives",
    date: "19 May 2025",
    excerpt: "Perspectives Study Program (PSP) merupakan salah satu kursus misi terbaik yang akan menolong Anda untuk memahami dan terlibat dalam misi Tuhan di dunia.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
};

const mediaItems = [
    { id: 1, type: "Buku", date: "Feb 02, 2026", title: "Penulisan Ilmiah Bidang Teologi", desc: "Penulis: Dwi Maria Handayani Ph.D. dan Dr. Arlina P..." },
    { id: 2, type: "Buku", date: "Jan 30, 2026", title: "Misi Allah dan Tugas Gereja", desc: "Penulis: J. Christopher J.H. Wright..." },
    { id: 3, type: "Buletin", date: "Oct 22, 2024", title: "Buletin STTB #56 Agust 2024", desc: "Penelitian Pendidikan Teologi: Mengapa perlu ada penelitian..." },
    { id: 4, type: "Monograf", date: "Oct 16, 2024", title: "Monograf Vocational Calling", desc: "Judul: Vocational Calling Di Kalangan Gen Z Kristen Indonesia..." },
    { id: 5, type: "Monograf", date: "Oct 16, 2024", title: "Monograf School Connectedness", desc: "Judul: Pengaruh School-Connectedness Terhadap Formasi Kerohanian..." }
];

const NewsMedia: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [activeCat, setActiveCat] = useState("All");

    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    return (
        <section className="py-16 bg-background overflow-hidden">
            <div className="container mx-auto px-6">

                {/* --- BERITA HEADER BAR --- */}
                <div className="bg-primary flex flex-col md:flex-row items-stretch md:items-center justify-between mb-8 rounded-sm overflow-hidden shadow-md">
                    <div className="px-6 py-4 bg-primary flex items-center border-l-8 border-secondary">
                        <h2 className="text-primary-foreground font-black font-serif uppercase tracking-tighter text-lg md:text-xl">
                            Berita
                        </h2>
                    </div>

                    <div className="flex-1 flex flex-wrap items-center px-4 md:px-6 gap-2 py-3 md:py-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1 transition-all rounded-full ${activeCat === cat ? 'bg-secondary text-secondary-foreground' : 'text-primary-foreground/50 hover:text-primary-foreground'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center border-l border-white/10">
                        <button className="p-4 text-primary-foreground/40 hover:text-secondary border-r border-white/10 transition-colors"><ChevronLeft size={18} /></button>
                        <button className="p-4 text-primary-foreground/40 hover:text-secondary transition-colors"><ChevronRight size={18} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* --- MAIN FEATURED --- */}
                    <div className="lg:col-span-8 group">
                        <div className="relative aspect-video w-full bg-muted rounded-sm overflow-hidden shadow-xl border border-border">
                            <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                                <div className="flex items-center space-x-3 mb-4 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                    <Clock size={14} className="text-secondary" /> {featuredNews.date}
                                </div>
                                <h3 className="text-4xl md:text-6xl font-black text-white font-serif uppercase tracking-tighter mb-4 leading-none">{featuredNews.title}</h3>
                                <p className="text-white/60 text-xs md:text-sm max-w-lg mb-8 italic border-l-2 border-secondary pl-6">{featuredNews.excerpt}</p>
                                <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em] hover:opacity-90 transition-all w-fit shadow-lg shadow-black/20">Read More</button>
                            </div>
                        </div>
                    </div>

                    {/* --- ARTIKEL & MEDIA SIDEBAR --- */}
                    <div className="lg:col-span-4 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1.5 h-12 bg-secondary rounded-full" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] mb-1">ARTIKEL &</span>
                                <h3 className="text-4xl font-black font-serif text-primary uppercase tracking-tighter leading-none">Media</h3>
                            </div>
                        </div>

                        <div className="space-y-8 overflow-y-auto max-h-[600px] pr-4 scrollbar-hide flex-grow">
                            {mediaItems.map((item) => (
                                <div key={item.id} className="flex gap-4 group cursor-pointer border-b border-border/50 pb-6 last:border-0">
                                    <div className="shrink-0 pt-1">
                                        <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            {item.type === "Buletin" ? <FileText size={16} /> : <Play size={14} className="fill-current ml-0.5" />}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[13px] font-bold text-primary uppercase tracking-wide group-hover:text-secondary transition-colors truncate">{item.title}</h4>
                                        <p className="text-[9px] font-bold text-secondary uppercase tracking-widest my-1">{item.date}</p>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed italic line-clamp-2">Judul: {item.title}. {item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`.scrollbar-hide::-webkit-scrollbar { display: none; }.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </section>
    );
};

export default NewsMedia;