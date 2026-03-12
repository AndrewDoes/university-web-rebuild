'use client'
import React, { useState, useEffect } from 'react';
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
import { api } from '../services/api';
import { EventDto } from '../services/api';

export default function EventsManagementPage() {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.events.getAll();
            setEvents(data);
        } catch (err) {
            setError("Gagal mengambil data kegiatan dari SQL Server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">Events <span className="text-muted-foreground/40 italic text-2xl">Management</span></h1>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Atur jadwal kegiatan dan webinar kampus STTB.</p>
                </div>
                <a
                    href="/events/create"
                    className="bg-primary text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl no-underline w-fit"
                >
                    <Plus size={16} /> Tambah Kegiatan
                </a>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="Cari nama kegiatan atau lokasi..."
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={fetchEvents}
                    className="p-3 bg-muted border border-border rounded-xl text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 className={loading ? "animate-spin" : ""} size={18} />
                </button>
            </div>

            {error ? (
                <div className="py-20 flex flex-col items-center gap-4 text-danger border-2 border-dashed border-danger/20 rounded-2xl">
                    <AlertCircle size={40} />
                    <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading && events.length === 0 ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-64 bg-muted animate-pulse rounded-2xl border border-border" />
                        ))
                    ) : filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary transition-all flex flex-col shadow-sm">
                                <div className="aspect-video relative bg-muted overflow-hidden">
                                    <img
                                        src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {event.isFeatured && (
                                        <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <Star size={10} fill="currentColor" /> Featured
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 space-y-4 flex-1 flex flex-col text-left">
                                    <h4 className="font-bold text-text uppercase tracking-tight line-clamp-1">{event.title}</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                                            <Clock size={12} className="text-secondary" /> {new Date(event.startDate).toLocaleDateString('id-ID')} • {event.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                                            <MapPin size={12} className="text-secondary" /> {event.location}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-border mt-auto flex justify-between items-center">
                                        <span className="text-xs font-bold text-primary">{event.price === 0 ? 'GRATIS' : `Rp ${event.price.toLocaleString()}`}</span>
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-all"><Edit2 size={14} /></button>
                                            <button className="p-2 hover:bg-danger/10 text-muted-foreground hover:text-danger rounded-lg transition-all"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center opacity-30 italic text-sm">
                            Tidak ada kegiatan yang ditemukan.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}