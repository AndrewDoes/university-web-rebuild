'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { api, NewsDetailDto } from '../../services/api';
import Link from 'next/link';

export default function NewsDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState<NewsDetailDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await api.news.getById(id as string);
                setNews(data);
            } catch (error) {
                console.error("Error fetching news detail:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDetail();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    if (!news) return <div className="p-20 text-center">Berita tidak ditemukan.</div>;

    return (
        <main className="min-h-screen bg-background font-sans text-foreground pb-20">
            {/* Header / Breadcrumb Area */}
            <div className="bg-primary pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <Link href="/berita" className="inline-flex items-center gap-2 text-text-alt/60 hover:text-secondary transition-colors mb-8 no-underline text-xs uppercase font-bold tracking-widest">
                        <ArrowLeft size={16} /> Kembali ke Warta
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-text-alt font-serif uppercase tracking-tighter leading-tight italic max-w-4xl">
                        {news.title}
                    </h1>
                </div>
            </div>

            <article className="container mx-auto px-6 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        {/* Main Image */}
                        <div className="aspect-video w-full rounded-sm overflow-hidden border border-border shadow-2xl mb-10">
                            <img
                                src={news.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt={news.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-8 mb-10 pb-6 border-b border-border">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                <Calendar size={16} className="text-secondary" />
                                {new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                <User size={16} className="text-secondary" />
                                {news.author || "Redaksi STTB"}
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed font-light italic">
                            {news.content || news.excerpt}
                        </div>
                    </div>

                    {/* Sidebar / Related News Placeholder */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-card border border-border rounded-sm">
                            <h4 className="text-primary font-black font-serif uppercase tracking-widest text-sm mb-6 pb-4 border-b border-secondary">
                                Bagikan Warta
                            </h4>
                            <div className="flex gap-4">
                                {/* Social icons would go here using design tokens */}
                                <div className="w-10 h-10 rounded-full bg-primary/5 border border-border flex items-center justify-center text-primary hover:bg-secondary hover:text-secondary-foreground transition-all cursor-pointer">
                                    FB
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary/5 border border-border flex items-center justify-center text-primary hover:bg-secondary hover:text-secondary-foreground transition-all cursor-pointer">
                                    WA
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}