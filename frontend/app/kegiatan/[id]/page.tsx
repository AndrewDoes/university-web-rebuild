'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, MapPin, Calendar, ArrowLeft, Loader2, Tag } from 'lucide-react';
import { api, EventDto } from '../../services/api';
import Link from 'next/link';

export default function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<EventDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await api.events.getById(id as string);
                setEvent(data);
            } catch (error) {
                console.error("Event fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchEvent();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    if (!event) return <div className="p-20 text-center">Kegiatan tidak ditemukan.</div>;

    return (
        <main className="min-h-screen bg-background font-sans text-foreground">
            {/* --- ACADEMIC HERO HEADER --- */}
            <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/kegiatan" className="inline-flex items-center gap-2 text-text-alt/60 hover:text-secondary transition-colors mb-8 no-underline text-xs uppercase font-bold tracking-[0.3em]">
                        <ArrowLeft size={16} /> Kembali ke Kalender
                    </Link>

                    <div className="max-w-4xl space-y-6">
                        <div className="glass-overlay inline-flex items-center gap-3 px-4 py-1.5 text-text-alt rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                            <Tag size={14} className="text-secondary" /> {event.isFeatured ? 'Featured Event' : 'Official Activity'}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-text-alt font-serif uppercase tracking-tighter leading-none italic">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* --- MAIN CONTENT --- */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Event Banner */}
                        <div className="aspect-video rounded-sm overflow-hidden border border-border bg-muted shadow-2xl">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Event Description */}
                        <div className="space-y-6">
                            <h3 className="text-primary font-black font-serif uppercase tracking-widest text-sm border-b border-secondary pb-4 w-fit">
                                Deskripsi Kegiatan
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed italic font-light">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar: Event Details Card */}
                    <aside className="lg:col-span-4">
                        <div className="bg-card border border-border p-8 rounded-sm sticky top-32 space-y-8 shadow-sm">
                            <h4 className="text-primary font-black font-serif uppercase tracking-widest text-xs">
                                Informasi Pelaksanaan
                            </h4>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Calendar className="text-secondary shrink-0" size={20} />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Tanggal</p>
                                        <p className="font-bold text-primary">{new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="text-secondary shrink-0" size={20} />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Waktu</p>
                                        <p className="font-bold text-primary">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-secondary shrink-0" size={20} />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Lokasi</p>
                                        <p className="font-bold text-primary">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-secondary text-secondary-foreground font-black uppercase tracking-[0.3em] text-[11px] rounded-sm hover:opacity-90 transition-all shadow-lg">
                                Daftar Kegiatan
                            </button>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}