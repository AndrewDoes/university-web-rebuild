'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Save,
    X,
    Image as ImageIcon,
    Type,
    MapPin,
    Clock,
    Calendar as CalendarIcon,
    DollarSign,
    Star,
    Loader2,
    ArrowLeft,
    FileText
} from 'lucide-react';
import { api } from '../../services/api';

export default function CreateEventPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        startDate: new Date().toISOString().split('T')[0],
        time: '',
        location: '',
        price: 0,
        description: '',
        isFeatured: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.events.create(formData);
            router.push('/events');
            router.refresh();
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Gagal menyimpan agenda. Pastikan API aktif.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-8 text-left">
            <div className="flex items-center justify-between">
                <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest no-underline">
                    <ArrowLeft size={16} /> Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                    <div className="p-8 border-b border-border bg-primary text-primary-foreground">
                        <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                            <CalendarIcon size={24} className="text-secondary" />
                            Buat Agenda Baru
                        </h2>
                        <p className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-60 mt-2">Sistem Manajemen Event Terintegrasi STTB</p>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* --- LEFT SIDE: BASIC INFO --- */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Type size={14} className="text-primary" /> Judul Kegiatan
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    placeholder="Contoh: Webinar Teologi Abad 21"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <CalendarIcon size={14} className="text-primary" /> Tanggal
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Clock size={14} className="text-primary" /> Waktu
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                        placeholder="09:00 - Selesai"
                                        value={formData.time}
                                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <MapPin size={14} className="text-primary" /> Lokasi / Platform
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    placeholder="Aula Utama / Zoom Meeting"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <DollarSign size={14} className="text-primary" /> Harga Tiket (0 = GRATIS)
                                </label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        {/* --- RIGHT SIDE: CONTENT & MEDIA --- */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <ImageIcon size={14} className="text-primary" /> URL Banner Image
                                </label>
                                <input
                                    required
                                    type="url"
                                    className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    placeholder="https://..."
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <FileText size={14} className="text-primary" /> Deskripsi Lengkap
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    className="w-full bg-background border border-border px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm leading-relaxed"
                                    placeholder="Tulis detail kegiatan di sini..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                    <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isFeatured ? 'bg-secondary' : 'bg-muted border border-border'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? 'left-5' : 'left-1 shadow-sm'}`} />
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={formData.isFeatured}
                                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                                        <Star size={12} className={formData.isFeatured ? 'text-secondary fill-secondary' : ''} />
                                        Tampilkan sebagai Unggulan
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-muted/20 border-t border-border flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all"
                        >
                            Batal
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Simpan Agenda
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}