'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Newspaper,
    Plus,
    Search,
    Edit2,
    Trash2,
    Calendar,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { api, NewsDto } from '../services/api';

export default function NewsListPage() {
    const [news, setNews] = useState<NewsDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.news.getAll();
            // Strictly using response.news from your GetNewsListResponse interface
            setNews(response.news || []);
        } catch (err) {
            setError("Gagal memuat daftar berita. Pastikan API aktif.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Filter adapted strictly to NewsDto properties: title
    const filteredNews = news.filter(item =>
        (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8 text-left">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Newsroom <span className="text-primary italic">Repository</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-[0.3em]">Manajemen Artikel Kampus STTB</p>
                </div>
                <Link
                    href="/news/create"
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all no-underline w-fit"
                >
                    <Plus size={16} /> Buat Berita Baru
                </Link>
            </div>

            {/* --- TOOLBAR --- */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Cari judul berita..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all shadow-sm"
                    />
                </div>
                <button
                    onClick={fetchNews}
                    className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 size={16} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {/* --- DATA TABLE --- */}
            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                {loading && news.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Synchronizing API...</p>
                    </div>
                ) : error ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-danger">
                        <AlertCircle size={48} />
                        <p className="text-sm font-bold uppercase">{error}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Thumbnail & Judul</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Ringkasan</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Tanggal Terbit</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredNews.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                {/* Like usual, uncomment when image is there */}
                                                {/* <div className="w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden shrink-0">
                                                    <img src={item.image} alt="news image" className="w-full h-full object-cover" />
                                                </div> */}
                                                <p className="text-sm font-bold text-foreground uppercase tracking-tight line-clamp-1">
                                                    {item.title}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[10px] text-muted-foreground line-clamp-1 italic max-w-xs">
                                                {item.excerpt}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar size={14} className="opacity-40" />
                                                <span className="text-[11px] font-mono">
                                                    {new Date(item.publishedAt).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-20 group-hover:opacity-100 transition-all">
                                                <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"><Edit2 size={16} /></button>
                                                <button className="p-2.5 hover:bg-danger/10 hover:text-danger rounded-xl transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}