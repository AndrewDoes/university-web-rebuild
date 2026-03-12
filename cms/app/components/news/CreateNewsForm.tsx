'use client'
import React, { useState } from 'react';
import { Save, Loader2, Image as ImageIcon, Type, Tag, User, FileText } from 'lucide-react';
import { NewsDetailDto } from '../../services/api';

interface NewsFormProps {
    initialData?: Partial<NewsDetailDto>;
    onSubmit: (data: any) => Promise<void>;
    isLoading: boolean;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        category: initialData?.category || 'Akademik',
        content: initialData?.content || '',
        thumbnailUrl: initialData?.image || '',
        authorName: initialData?.author || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2 text-left">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Type size={12} className="text-primary" /> Judul Berita
                    </label>
                    <input
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        type="text"
                        className="w-full bg-card border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                    />
                </div>

                <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Tag size={12} className="text-primary" /> Kategori
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-card border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                        <option>Akademik</option>
                        <option>Kegiatan Mahasiswa</option>
                        <option>Pengumuman</option>
                        <option>Prestasi</option>
                    </select>
                </div>

                <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <User size={12} className="text-primary" /> Penulis
                    </label>
                    <input
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        type="text"
                        className="w-full bg-card border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                <div className="md:col-span-2 space-y-2 text-left">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon size={12} className="text-primary" /> URL Thumbnail
                    </label>
                    <input
                        value={formData.thumbnailUrl}
                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                        type="url"
                        className="w-full bg-card border border-border p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-[10px]"
                    />
                </div>

                <div className="md:col-span-2 space-y-2 text-left">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <FileText size={12} className="text-primary" /> Isi Berita
                    </label>
                    <textarea
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={10}
                        className="w-full bg-card border border-border p-6 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed"
                    ></textarea>
                </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end">
                <button
                    disabled={isLoading}
                    className="flex items-center gap-3 px-12 py-4 bg-primary text-primary-foreground rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Simpan ke SQL Server
                </button>
            </div>
        </form>
    );
};