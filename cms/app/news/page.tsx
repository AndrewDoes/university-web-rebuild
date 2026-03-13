'use client'
import React, { useState, useEffect } from 'react';
import {
    Newspaper, Plus, Search, Edit2, Trash2,
    Calendar, Loader2, AlertCircle, X, Save, FileText, Image as ImageIcon, Type
} from 'lucide-react';
import { api, NewsDto, NewsDetailDto } from '../services/api';

const EMPTY_FORM: Partial<NewsDetailDto> = {
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    category: '',
    tags: '',
    slug: '',
    publishedAt: '',
    status: 'draft'
};

export default function NewsListPage() {
    const [news, setNews] = useState<NewsDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsDto | null>(null);
    const [formData, setFormData] = useState<Partial<NewsDetailDto>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'published' | 'draft'>('published');

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.news.getAll();
            setNews(response.news || []);
        } catch {
            setError("Gagal memuat daftar berita. Pastikan API aktif.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchNews(); }, []);

    const openCreate = () => {
        setEditingItem(null);
        setFormData(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEdit = async (item: NewsDto) => {
        setEditingItem(item);
        try {
            const detail = await api.news.getById(item.id);
            setFormData({
                title: detail.title || '',
                excerpt: detail.excerpt || '',
                content: detail.content || '',
                image: detail.image || '',
                author: detail.author || '',
                category: detail.category || '',
                tags: detail.tags || '',
                slug: detail.slug || '',
                publishedAt: detail.publishedAt || '',
                status: detail.status?.trim().toLowerCase() || 'draft'
            });
        } catch {
            setFormData({
                title: item.title || '',
                excerpt: item.excerpt || '',
                image: item.image || '',
                author: item.author || '',
                category: item.category || '',
                tags: item.tags || '',
                slug: item.slug || '',
                publishedAt: item.publishedAt || '',
                status: item.status?.trim().toLowerCase() || 'draft'
            });
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingItem(null);
        setFormData(EMPTY_FORM);
    };

    const handleSave = async () => {
        if (!formData.title) return;

        setSaving(true);
        try {
            const normalizedStatus = (formData.status || 'draft').trim().toLowerCase();

            const payload: Partial<NewsDetailDto> = {
                ...formData,
                status: normalizedStatus,
                slug: formData.slug || undefined,
                publishedAt: formData.publishedAt || new Date().toISOString()
            };

            if (editingItem) {
                await api.news.update(editingItem.id, payload);
            } else {
                await api.news.create(payload);
            }

            closeModal();
            await fetchNews();
        } catch (error) {
            console.error(error);
            setError("Gagal menyimpan berita.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus berita ini secara permanen?")) return;
        setDeletingId(id);
        try {
            await api.news.delete(id);
            await fetchNews();
        } catch {
            setError("Gagal menghapus berita.");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredNews = news.filter(item => {
        const matchesSearch = (item.title?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const itemStatus = (item.status || 'draft').trim().toLowerCase();
        return matchesSearch && itemStatus === activeTab;
    });

    const field = (label: string, icon: React.ReactNode, key: keyof NewsDetailDto, placeholder: string, type = 'text') => (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                {icon} {label}
            </label>
            <input
                type={type}
                value={(formData[key] as string) || ''}
                onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
            />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8 text-left">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Newsroom <span className="text-primary italic">Repository</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-[0.3em]">Manajemen Artikel Kampus STTB</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all w-fit"
                >
                    <Plus size={16} /> Buat Berita Baru
                </button>
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row gap-4">

                {/* TAB FILTER */}
                <div className="flex bg-muted p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('published')}
                        className={`px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'published'
                            ? 'bg-card shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Published
                    </button>

                    <button
                        onClick={() => setActiveTab('draft')}
                        className={`px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'draft'
                            ? 'bg-card shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Drafts
                    </button>
                </div>

                {/* SEARCH */}
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
            {/* TABLE */}
            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                {loading && news.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Synchronizing API...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Judul</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Ringkasan</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Tanggal Terbit</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredNews.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground text-sm italic">
                                            Belum ada artikel berita. Klik &ldquo;Buat Berita Baru&rdquo;.
                                        </td>
                                    </tr>
                                ) : filteredNews.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-foreground uppercase tracking-tight line-clamp-1">{item.title}</p>
                                            {item.category && <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{item.category}</span>}
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[10px] text-muted-foreground line-clamp-1 italic max-w-xs">{item.excerpt}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar size={14} className="opacity-40" />
                                                <span className="text-[11px] font-mono">{new Date(item.publishedAt).toLocaleDateString('id-ID')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-20 group-hover:opacity-100 transition-all">
                                                <button onClick={() => openEdit(item)} className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deletingId === item.id}
                                                    className="p-2.5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors disabled:opacity-40"
                                                >
                                                    {deletingId === item.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center mt-20 p-4 overflow-auto">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <Newspaper className="text-primary" size={22} />
                                <h2 className="font-bold text-sm uppercase tracking-widest text-foreground">
                                    {editingItem ? 'Edit Berita' : 'Buat Berita Baru'}
                                </h2>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-muted rounded-xl transition-colors"><X size={18} /></button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            {field("Judul Berita *", <Type size={14} className="text-primary" />, 'title', 'Contoh: STTB Gelar Wisuda Angkatan ke-20')}
                            {field("URL Gambar", <ImageIcon size={14} className="text-primary" />, 'image', 'https://...')}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Newspaper size={14} className="text-primary" /> Kategori
                                    </label>
                                    <select
                                        value={formData.category || ''}
                                        onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                                        className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                    >
                                        <option value="" disabled>Pilih Kategori...</option>
                                        <option value="Akademik">Akademik</option>
                                        <option value="Kemahasiswaan">Kemahasiswaan</option>
                                        <option value="Pengumuman">Pengumuman</option>
                                        <option value="Prestasi">Prestasi</option>
                                        <option value="Berita Kampus">Berita Kampus</option>
                                        <option value="Umum">Umum</option>
                                    </select>
                                </div>
                                {field("Penulis", <FileText size={14} className="text-primary" />, 'author', 'Nama Penulis')}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Newspaper size={14} className="text-primary" /> Status *
                                </label>

                                <select
                                    value={formData.status || 'draft'}
                                    onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <FileText size={14} className="text-primary" /> Ringkasan *
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.excerpt || ''}
                                    onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                                    placeholder="Ringkasan singkat artikel..."
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <FileText size={14} className="text-primary" /> Konten Penuh
                                </label>
                                <textarea
                                    rows={6}
                                    value={formData.content || ''}
                                    onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                                    placeholder="Isi lengkap artikel berita..."
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                            <button onClick={closeModal} className="px-6 py-2.5 bg-muted text-muted-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.title}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                {saving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}