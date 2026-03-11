'use client'
import React, { useState, useEffect } from 'react';
import {
    Newspaper,
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Filter,
    Calendar,
    User,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { api, NewsDto } from '../services/api';

const NewsListPage = () => {
    const [news, setNews] = useState<NewsDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.news.getAll();
            // Memastikan data yang di-set adalah array
            setNews(response.news || []);
        } catch (err) {
            setError("Gagal memuat daftar berita dari database. Pastikan API di port 5176 aktif.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Filter aman dengan pengecekan null/undefined pada title dan category
    const filteredNews = news.filter(item =>
        (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.category?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-left space-y-1">
                    <h2 className="text-2xl font-bold text-text uppercase tracking-tighter">Newsroom Repository</h2>
                    <p className="text-xs text-muted-foreground italic">Manajemen publikasi dan artikel berita kampus STTB.</p>
                </div>
                <a
                    href="/news/create"
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all no-underline"
                >
                    <Plus size={16} /> Buat Berita Baru
                </a>
            </div>

            {/* --- TOOLBAR --- */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="Cari judul berita atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <button
                    onClick={fetchNews}
                    className="flex items-center gap-2 px-5 py-3 bg-muted border border-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 size={16} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {/* --- DATA TABLE --- */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                {loading && news.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Synchronizing with SQL Server...</p>
                    </div>
                ) : error ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-danger">
                        <AlertCircle size={48} />
                        <p className="text-sm italic">{error}</p>
                        <button onClick={fetchNews} className="text-xs font-bold underline uppercase tracking-widest">Coba Lagi</button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Artikel</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Kategori</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Tanggal</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Penulis</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredNews.length > 0 ? (
                                    filteredNews.map((item) => (
                                        <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden shrink-0">
                                                        {item.thumbnailUrl ? (
                                                            <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center opacity-20"><Newspaper size={20} /></div>
                                                        )}
                                                    </div>
                                                    <div className="max-w-xs space-y-1">
                                                        <p className="text-sm font-bold text-text truncate group-hover:text-primary transition-colors uppercase tracking-tight">
                                                            {item.title || "Untitled Article"}
                                                        </p>
                                                        {/* FIXED: Ditambahkan pengecekan null agar tidak error substring */}
                                                        <p className="text-[10px] text-muted-foreground line-clamp-1 italic">
                                                            {(item.content || "").substring(0, 60)}...
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded uppercase tracking-widest border border-secondary/20">
                                                    {item.category || "General"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar size={14} className="opacity-40" />
                                                    <span className="text-[11px] font-mono">
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : '-'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-text">
                                                    <User size={14} className="text-primary opacity-60" />
                                                    <span className="text-[11px] font-bold uppercase">{item.authorName || "System"}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"><Edit2 size={16} /></button>
                                                    <button className="p-2.5 hover:bg-danger/10 hover:text-danger rounded-xl transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic text-sm">
                                            {loading ? "Memuat data..." : "Tidak ada berita yang ditemukan."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default NewsListPage;