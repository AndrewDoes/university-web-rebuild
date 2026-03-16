'use client'
import React, { useEffect, useState } from 'react';
import { Newspaper, ArrowRight, Loader2, Search } from 'lucide-react';
import { api, NewsDto } from '../services/api';

export default function UserNewsListingPage() {
    const [news, setNews] = useState<NewsDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.news.getAll();
                setNews(response.news || []);
            } catch (error) {
                console.error("Sync error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const filtered = news.filter(n => (n.title || "").toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <main className="min-h-screen bg-background font-sans text-foreground">
            {/* --- ACADEMIC HERO HEADER --- */}
            <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-left">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="space-y-6">
                            <div className="glass-overlay inline-flex items-center gap-3 px-4 py-1.5 text-text-alt rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                                <Newspaper size={14} className="text-secondary" /> Newsroom Portal
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-alt font-serif tracking-tighter leading-none italic">
                                Warta <br />
                                <span className="text-secondary not-italic opacity-90">Kampus</span>
                            </h1>
                            <p className="text-primary-foreground/60 max-w-xl text-sm md:text-base leading-relaxed font-medium">
                                Pusat informasi digital mengenai publikasi penelitian, prestasi mahasiswa, dan pengumuman resmi STT Bandung.
                            </p>
                        </div>

                        {/* Search Input using tokenized borders and backgrounds */}
                        <div className="relative w-full md:w-96 group">
                            <Search
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-foreground/40 group-focus-within:text-secondary transition-colors"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Cari warta..."
                                className="w-full bg-primary-foreground/5 border-2 border-primary-foreground/10 pl-14 pr-6 py-5 rounded-sm text-sm text-primary-foreground placeholder:text-primary-foreground/30 outline-none focus:border-secondary transition-all"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- NEWS REPOSITORY GRID --- */}
            <section className="py-24 container mx-auto px-6">
                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-6">
                        <Loader2 size={56} className="text-primary animate-spin" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                            Accessing SQL Clusters...
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {filtered.length > 0 ? (
                            filtered.map((item) => (
                                <article key={item.id} className="group flex flex-col h-full text-left space-y-6 bg-card p-10 rounded-lg border border-primary shadow-xl hover:border-secondary hover:shadow-2xl trnasition-all duration-100">
                                    {/* Thumbnail Container */}
                                    <div className="aspect-16/10 overflow-hidden rounded-sm border border-border bg-muted shadow-sm relative">
                                        <img
                                            src={item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute top-0 right-0 p-4">
                                            <div className="w-2 h-2 rounded-full bg-primary group-hover:bg-secondary shadow-md" />
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="space-y-4 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                                            <span className="text-secondary font-black">STTB News</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span>
                                                {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-primary font-serif uppercase tracking-tight group-hover:text-secondary transition-colors line-clamp-2 italic leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-3 flex-1">
                                            {item.excerpt || "Ringkasan berita ini belum tersedia di database."}
                                        </p>
                                        <div className="pt-6 border-t border-border">
                                            <a
                                                href={`/berita/${item.id}`}
                                                className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-primary group-hover:gap-6 transition-all no-underline"
                                            >
                                                Lihat Selengkapnya <ArrowRight size={16} className="text-secondary" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-full py-40 text-center border-2 border-dashed border-border rounded-sm opacity-50 italic text-lg font-serif text-muted-foreground">
                                Belum ada artikel warta yang diterbitkan.
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}