'use client'
import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Edit2, Trash2, Loader2, MessageSquareQuote,
    AlertCircle, X, Save, User, FileText, Star, Type
} from 'lucide-react';
import { api, TestimonialDto } from '../services/api';

const EMPTY_FORM: Partial<TestimonialDto> = {
    name: '', degree: '', photo: '', quote: '', position: '', isFeatured: false
};

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<TestimonialDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TestimonialDto | null>(null);
    const [formData, setFormData] = useState<Partial<TestimonialDto>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchTestimonials = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.testimonials.getAll();
            setTestimonials(data || []);
        } catch {
            setError("Gagal menyinkronkan data kesaksian dengan SQL Server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTestimonials(); }, []);

    const openCreate = () => {
        setEditingItem(null);
        setFormData(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEdit = (item: TestimonialDto) => {
        setEditingItem(item);
        setFormData({ name: item.name, degree: item.degree, photo: item.photo, quote: item.quote, position: item.position, isFeatured: item.isFeatured });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingItem(null);
        setFormData(EMPTY_FORM);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.quote) return;
        setSaving(true);
        try {
            if (editingItem) {
                await api.testimonials.update(editingItem.id, formData);
            } else {
                await api.testimonials.create(formData);
            }
            closeModal();
            await fetchTestimonials();
        } catch {
            setError("Gagal menyimpan kesaksian.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus kesaksian ini secara permanen?")) return;
        setDeletingId(id);
        try {
            await api.testimonials.delete(id);
            await fetchTestimonials();
        } catch {
            setError("Gagal menghapus data.");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.quote.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Testimonials <span className="text-primary italic text-2xl">Management</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-[0.3em]">Arsip Cerita Transformasi Alumni &amp; Mahasiswa</p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-90 transition-all shadow-xl w-fit"
                >
                    <Plus size={16} /> Tambah Kesaksian
                </button>
            </div>

            {/* SEARCH */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Cari nama atau isi kesaksian..."
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={fetchTestimonials}
                    className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                    <AlertCircle size={18} />
                    <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
                </div>
            )}

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading && testimonials.length === 0 ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-48 bg-muted animate-pulse rounded-xl border border-border" />
                    ))
                ) : filtered.length > 0 ? (
                    filtered.map((t) => (
                        <div key={t.id} className="bg-card border border-border rounded-sm p-6 flex flex-col hover:border-primary transition-all shadow-sm group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-left">
                                        <h4 className="font-bold text-sm text-primary uppercase">{t.name}</h4>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t.degree}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(t)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><Edit2 size={14} /></button>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        disabled={deletingId === t.id}
                                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-40"
                                    >
                                        {deletingId === t.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm italic text-muted-foreground leading-relaxed line-clamp-3 mb-4 text-left">&ldquo;{t.quote}&rdquo;</p>
                            <div className="mt-auto pt-4 border-t border-border flex items-center gap-2 text-[9px] font-bold text-secondary uppercase tracking-widest">
                                <MessageSquareQuote size={12} /> {t.position || 'STTB Core Member'}
                            </div>
                        </div>
                    ))
                ) : !loading && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-xl opacity-30 italic text-sm">
                        Data kesaksian belum tersedia.
                    </div>
                )}
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg my-8">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <MessageSquareQuote className="text-primary" size={22} />
                                <h2 className="font-bold text-sm uppercase tracking-widest text-foreground">
                                    {editingItem ? 'Edit Kesaksian' : 'Tambah Kesaksian Baru'}
                                </h2>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-muted rounded-xl transition-colors"><X size={18} /></button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><User size={14} className="text-primary" /> Nama Lengkap *</label>
                                    <input type="text" value={formData.name || ''} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Maria Silitonga" className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Type size={14} className="text-primary" /> Gelar / Prodi</label>
                                    <input type="text" value={formData.degree || ''} onChange={e => setFormData(p => ({ ...p, degree: e.target.value }))} placeholder="S.Th. - Teologi" className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Type size={14} className="text-primary" /> Jabatan / Posisi Saat Ini</label>
                                <input type="text" value={formData.position || ''} onChange={e => setFormData(p => ({ ...p, position: e.target.value }))} placeholder="Pastor Gereja Bethel" className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><FileText size={14} className="text-primary" /> URL Foto</label>
                                <input type="text" value={formData.photo || ''} onChange={e => setFormData(p => ({ ...p, photo: e.target.value }))} placeholder="https://..." className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"><MessageSquareQuote size={14} className="text-primary" /> Kutipan Kesaksian *</label>
                                <textarea rows={4} value={formData.quote || ''} onChange={e => setFormData(p => ({ ...p, quote: e.target.value }))} placeholder="STTB telah membentuk saya menjadi..." className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all resize-none" />
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isFeatured ? 'bg-secondary' : 'bg-muted border border-border'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? 'left-5' : 'left-1 shadow-sm'}`} />
                                </div>
                                <input type="checkbox" className="hidden" checked={!!formData.isFeatured} onChange={e => setFormData(p => ({ ...p, isFeatured: e.target.checked }))} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                                    <Star size={12} className={formData.isFeatured ? 'text-secondary fill-secondary' : ''} /> Tampilkan sebagai Unggulan
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                            <button onClick={closeModal} className="px-6 py-2.5 bg-muted text-muted-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">Batal</button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.name || !formData.quote}
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