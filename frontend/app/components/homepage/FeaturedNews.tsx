'use client'
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, FileText, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { api, NewsDto } from '@/app/services/api';

const categories = ["All", "Civitas", "Akademik", "Kemahasiswaan", "Institusi", "Kegiatan", "Alumni"];

const NewsMedia: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCat, setActiveCat] = useState("All");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.news.getLatest(6);
                setNewsItems(response.news || []);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchNews();
    }, []);

    const filteredNews = activeCat === "All" ? newsItems : newsItems.filter(n => n.category?.name === activeCat);
    const featured = filteredNews[0];
    const sidebarItems = filteredNews.slice(1);

    if (loading) return <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;

    return (
        <section className="py-16 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="bg-primary flex flex-col md:flex-row items-stretch md:items-center justify-between mb-8 rounded-sm overflow-hidden shadow-md border-b-4 border-secondary">
                    <div className="px-6 py-4 bg-primary flex items-center">
                        {/* RESTORED: font-serif */}
                        <h2 className="text-primary-foreground font-black font-serif uppercase tracking-tighter text-lg md:text-xl">Berita</h2>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center px-4 md:px-6 gap-2 py-3 md:py-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1 transition-all rounded-full ${activeCat === cat ? 'bg-secondary text-secondary-foreground' : 'text-primary-foreground/50 hover:text-primary-foreground'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 group text-left">
                        {featured ? (
                            <div className="relative aspect-video w-full bg-muted rounded-sm overflow-hidden shadow-xl border border-border">
                                <img src={featured.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                                    <div className="flex items-center space-x-3 mb-4 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                        <Clock size={14} className="text-secondary" /> {new Date(featured.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    {/* RESTORED: font-serif italic */}
                                    <h3 className="text-4xl md:text-6xl font-black text-white font-serif uppercase tracking-tighter mb-4 leading-none italic">{featured.title}</h3>
                                    <p className="text-white/60 text-xs md:text-sm max-w-lg mb-8 italic border-l-2 border-secondary pl-6 line-clamp-2">{featured.excerpt}</p>
                                    <Link href={`/berita/${featured.id}`} className="bg-secondary text-secondary-foreground px-8 py-3 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em] hover:opacity-90 transition-all w-fit shadow-lg shadow-black/20 no-underline">Read More</Link>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="lg:col-span-4 flex flex-col h-full text-left">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1.5 h-12 bg-secondary rounded-full" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] mb-1">ARTIKEL &</span>
                                {/* RESTORED: font-serif */}
                                <h3 className="text-4xl font-black font-serif text-primary uppercase tracking-tighter leading-none">Berita</h3>
                            </div>
                        </div>
                        <div className="space-y-8 overflow-y-auto max-h-[600px] pr-4 scrollbar-hide flex-grow">
                            {sidebarItems.map((item) => (
                                <a href={`/berita/${item.id}`} key={item.id} className="flex gap-4 group cursor-pointer border-b border-border/50 pb-6 last:border-0 no-underline">
                                    <div className="shrink-0 pt-1">
                                        <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <FileText size={16} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {/* RESTORED: font-serif italic */}
                                        <h4 className="text-[13px] font-bold text-primary font-serif uppercase tracking-wide group-hover:text-secondary transition-colors truncate italic">{item.title}</h4>
                                        <p className="text-[9px] font-bold text-secondary uppercase tracking-widest my-1">{new Date(item.publishedAt).toLocaleDateString('id-ID')}</p>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed italic line-clamp-2">{item.excerpt}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsMedia;