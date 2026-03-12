'use client'
import React, { useState } from 'react';
import { Save, Loader2, Image as ImageIcon, Type, Tag, User, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api, NewsDetailDto } from '../../services/api';
import { useRouter } from 'next/navigation';

export default function CreateNewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<Partial<NewsDetailDto>>({
        title: '',
        category: 'Akademik',
        content: '',
        image: '',
        author: '',
        excerpt: '',
        status: 'published',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.news.create(formData);
            setSuccess(true);
            setTimeout(() => router.push('/news'), 1500);
        } catch {
            alert("Gagal menyimpan berita. Periksa koneksi ke backend API.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 font-sans p-4 md:p-8">
            <a href="/news" className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] no-underline">
                <ArrowLeft size={16} /> Kembali
            </a>

            <div className="text-left space-y-2">
                <h2 className="text-4xl font-bold text-foreground uppercase tracking-tighter">Compose Article</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Buat artikel berita baru untuk kampus STTB</p>
            </div>

            {success && (
                <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center gap-4 text-secondary">
                    <CheckCircle2 size={24} />
                    <p className="text-xs font-bold uppercase tracking-widest">Berita Terbit! Mengalihkan...</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Type size={12} className="text-primary" /> Judul Berita *
                        </label>
                        <input
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            type="text"
                            placeholder="Contoh: STTB Gelar Wisuda Angkatan ke-20"
                            className="w-full bg-background border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Tag size={12} className="text-primary" /> Kategori
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-background border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                        >
                            <option>Akademik</option>
                            <option>Kegiatan Mahasiswa</option>
                            <option>Pengumuman</option>
                            <option>Prestasi</option>
                            <option>Institusi</option>
                        </select>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <User size={12} className="text-primary" /> Penulis
                        </label>
                        <input
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            type="text"
                            placeholder="Nama Penulis"
                            className="w-full bg-background border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Tag size={12} className="text-primary" /> Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full bg-background border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <ImageIcon size={12} className="text-primary" /> URL Thumbnail
                        </label>
                        <input
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            type="text"
                            placeholder="https://..."
                            className="w-full bg-background border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-[10px]"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <FileText size={12} className="text-primary" /> Ringkasan / Excerpt *
                        </label>
                        <textarea
                            required
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={2}
                            placeholder="Ringkasan singkat artikel..."
                            className="w-full bg-background border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed resize-none"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2 text-left">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <FileText size={12} className="text-primary" /> Isi Berita *
                        </label>
                        <textarea
                            required
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={10}
                            placeholder="Tulis isi lengkap artikel berita di sini..."
                            className="w-full bg-background border border-border p-6 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-end">
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex items-center gap-3 px-12 py-4 bg-primary text-primary-foreground rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Simpan ke SQL Server
                    </button>
                </div>
            </form>
        </div>
    );
}