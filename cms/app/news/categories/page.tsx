'use client'
import React, { useState, useEffect } from 'react';
import {
    Tags, Plus, Search, Edit2, Trash2,
    Calendar, Loader2, X, Save, Type, Link as LinkIcon
} from 'lucide-react';
import { api, NewsCategoryDto } from '../../services/api';

const EMPTY_FORM: Partial<NewsCategoryDto> = {
    name: '',
};

export default function CategoryListPage() {
    const [categories, setCategories] = useState<NewsCategoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsCategoryDto | null>(null);
    const [formData, setFormData] = useState<Partial<NewsCategoryDto>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.newsCategories.getAll();
            setCategories(response.categories || []);
        } catch {
            setError("Gagal memuat daftar kategori. Pastikan API aktif.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const openCreate = () => {
        setEditingItem(null);
        setFormData(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEdit = (item: NewsCategoryDto) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingItem(null);
        setFormData(EMPTY_FORM);
    };

    const handleSave = async () => {
        if (!formData.name) return;

        setSaving(true);
        try {
            if (editingItem) {
                await api.newsCategories.update(editingItem.id, formData);
            } else {
                await api.newsCategories.create(formData);
            }

            closeModal();
            await fetchCategories();
        } catch (error) {
            console.error(error);
            setError("Gagal menyimpan kategori.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus kategori ini? Berita yang menggunakan kategori ini mungkin terpengaruh.")) return;
        setDeletingId(id);
        try {
            await api.newsCategories.delete(id);
            await fetchCategories();
        } catch {
            setError("Gagal menghapus kategori.");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCategories = categories.filter(item =>
        (item.name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8 text-left">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Category <span className="text-primary italic">Manager</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-[0.3em]">Pengaturan Kategori Berita STTB</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all w-fit"
                >
                    <Plus size={16} /> Tambah Kategori
                </button>
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* SEARCH */}
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Cari nama kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all shadow-sm"
                    />
                </div>

                <button
                    onClick={fetchCategories}
                    className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 size={16} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                {loading && categories.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Synchronizing API...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Nama Kategori</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Slug</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Dibuat Pada</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground text-sm italic">
                                            Belum ada kategori. Klik &ldquo;Tambah Kategori&rdquo;.
                                        </td>
                                    </tr>
                                ) : filteredCategories.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-foreground uppercase tracking-tight line-clamp-1">{item.name}</p>
                                        </td>
                                        <td className="px-8 py-6 text-muted-foreground font-mono text-[11px]">
                                            /{item.slug}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar size={14} className="opacity-40" />
                                                <span className="text-[11px] font-mono">{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
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
                <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <Tags className="text-primary" size={22} />
                                <h2 className="font-bold text-sm uppercase tracking-widest text-foreground">
                                    {editingItem ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                                </h2>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-muted rounded-xl transition-colors"><X size={18} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Type size={14} className="text-primary" /> Nama Kategori *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                    placeholder="Contoh: Pengumuman, Akademik, dll"
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                    autoFocus
                                />
                            </div>
                            {editingItem && (
                                <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                        <LinkIcon size={12} /> Live Preview Slug
                                    </div>
                                    <p className="text-xs font-mono text-primary truncate">
                                        /{formData.name?.trim().toLowerCase().replace(/\s+/g, '-') || '...'}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                            <button onClick={closeModal} className="px-6 py-2.5 bg-muted text-muted-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.name}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
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
