'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Loader2, MessageSquareQuote, AlertCircle } from 'lucide-react';
import { api, TestimonialDto } from '../services/api';
import Link from 'next/link';

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<TestimonialDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fetchTestimonials = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.testimonials.getAll();
            setTestimonials(data || []);
        } catch (err) {
            setError("Gagal menyinkronkan data kesaksian dengan SQL Server.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus kesaksian ini secara permanen?")) return;
        try {
            await api.testimonials.delete(id);
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            alert("Gagal menghapus data.");
        }
    };

    useEffect(() => { fetchTestimonials(); }, []);

    const filtered = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.quote.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Testimonials <span className="text-primary italic text-2xl">Management</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-[0.3em]">Arsip Cerita Transformasi Alumni & Mahasiswa</p>
                </div>
                <Link
                    href="/testimonials/create"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-90 transition-all shadow-xl no-underline w-fit"
                >
                    <Plus size={16} /> Tambah Kesaksian
                </Link>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md group">
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
                    className="p-3 bg-muted border border-border rounded-xl text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 className={loading ? "animate-spin" : ""} size={18} />
                </button>
            </div>

            {error && (
                <div className="py-20 flex flex-col items-center gap-4 text-danger border-2 border-dashed border-danger/20 rounded-2xl">
                    <AlertCircle size={40} />
                    <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
                </div>
            )}

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
                                    {/* uncomment when there photo */}
                                    {/* <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20 bg-muted">
                                        <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                                    </div> */}
                                    <div className="text-left">
                                        <h4 className="font-bold text-sm text-primary uppercase">{t.name}</h4>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t.degree}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><Edit2 size={14} /></button>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm italic text-muted-foreground leading-relaxed line-clamp-3 mb-4 text-left">
                                "{t.quote}"
                            </p>
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
        </div>
    );
}