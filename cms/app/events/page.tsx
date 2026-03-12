'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Plus,
    Search,
    Edit2,
    Trash2,
    MapPin,
    Clock,
    Loader2,
    AlertCircle,
    Star
} from 'lucide-react';
import { api, EventDto } from '../services/api';

export default function EventsManagementPage() {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.events.getAll();
            setEvents(data || []);
        } catch (err) {
            setError("Gagal memuat daftar kegiatan dari database.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus kegiatan ini secara permanen?")) return;
        try {
            console.log("Under development");
            // await api.events.delete(id);
            // setEvents(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            alert("Gagal menghapus data.");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8 text-left">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Campus <span className="text-primary italic text-3xl">Events</span>
                    </h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Manajemen Agenda & Webinar STTB</p>
                </div>
                <Link
                    href="/events/create"
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all no-underline w-fit"
                >
                    <Plus size={16} /> Tambah Kegiatan
                </Link>
            </div>

            {/* --- TOOLBAR --- */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Cari nama kegiatan atau lokasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all shadow-sm"
                    />
                </div>
                <button
                    onClick={fetchEvents}
                    className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 size={16} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {/* --- DATA TABLE --- */}
            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                {loading && events.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Syncing Event Data...</p>
                    </div>
                ) : error ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-danger">
                        <AlertCircle size={48} />
                        <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Agenda & Status</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Waktu</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Lokasi</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">HTM</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                {/* uncomment when there imeg */}
                                                {/* <div className="w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden shrink-0 relative">
                                                    <img src={event.image} alt="" className="w-full h-full object-cover" />
                                                    {event.isFeatured && (
                                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                            <Star size={12} className="text-secondary fill-secondary" />
                                                        </div>
                                                    )}
                                                </div> */}
                                                <div className="max-w-xs">
                                                    <p className="text-sm font-bold text-foreground uppercase tracking-tight line-clamp-1">
                                                        {event.title}
                                                    </p>
                                                    {event.isFeatured && <span className="text-[8px] font-black text-secondary uppercase tracking-[0.2em]">Featured Event</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                                                    <Calendar size={12} className="text-primary opacity-60" />
                                                    <span className="text-[10px]">{new Date(event.startDate).toLocaleDateString('id-ID')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock size={12} className="opacity-40" />
                                                    <span className="text-[10px] font-mono">{event.time}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-muted-foreground uppercase">
                                                <MapPin size={12} className="text-secondary shrink-0" />
                                                <span className="text-[10px] font-bold tracking-widest line-clamp-1">{event.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black text-primary uppercase">
                                                {event.price === 0 ? 'GRATIS' : `Rp ${event.price.toLocaleString()}`}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-20 group-hover:opacity-100 transition-all">
                                                <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"><Edit2 size={16} /></button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2.5 hover:bg-danger/10 hover:text-danger rounded-xl transition-colors"
                                                >
                                                    <Trash2 size={16} />
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
        </div>
    );
}