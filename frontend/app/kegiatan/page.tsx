'use client'
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; // For client-side navigation
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Search,
    Clock,
    MapPin,
    Loader2,
} from 'lucide-react';
import { api, EventDto } from '../services/api';

const categories = ["Semua", "Akademik", "Admisi", "Institusi", "Penelitian", "Kemahasiswaan"];

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const data = await api.events.getAll();
                setEvents(data || []);
            } catch (error) {
                console.error("Calendar sync error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllEvents();
    }, []);

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const offset = new Date(year, month, 1).getDay();
        const days = [];
        for (let i = 0; i < offset; i++) days.push(null);
        for (let i = 1; i <= totalDays; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            days.push({ day: i, dateStr });
        }
        return days;
    }, [currentDate]);

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    // Filter events based on selected date and search term (AND Category)
    const selectedDayEvents = events.filter(e => {
        const matchesDate = e.startDate.split('T')[0] === selectedDate;
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        // As the current backend model might not have category, we will just stub this out so UI works 
        // For a full fix we would add category to EventDto and backend
        // const matchesCategory = activeCategory === "Semua" ? true : e.category === activeCategory;
        
        return matchesDate && matchesSearch;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return (
        <main className="min-h-screen bg-background font-sans text-foreground">

            {/* --- HERO HEADER --- */}
            <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-left">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="space-y-6">
                            <div className="glass-overlay inline-flex items-center gap-3 px-4 py-1.5 text-text-alt rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                                <CalendarIcon size={14} className="text-secondary" /> Academic Repository
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-alt font-serif tracking-tighter leading-none italic">
                                Kalender <br />
                                <span className="text-secondary not-italic opacity-90">Akademik</span>
                            </h1>
                            <p className="text-primary-foreground/60 max-w-xl text-sm md:text-base leading-relaxed font-medium">
                                Jadwal perkuliahan, agenda institusi, dan linimasa kegiatan mahasiswa Sekolah Tinggi Teologi Bandung.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-96 group">
                            <Search
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-foreground/40 group-focus-within:text-secondary transition-colors"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Cari agenda..."
                                className="w-full bg-primary-foreground/5 border-2 border-primary-foreground/10 pl-14 pr-6 py-5 rounded-sm text-sm text-primary-foreground placeholder:text-primary-foreground/30 outline-none focus:border-secondary transition-all"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MAIN CONTENT --- */}
            <section className="py-24 container mx-auto px-6">

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-16 pb-10 border-b border-border">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeCategory === cat
                                ? 'bg-secondary text-secondary-foreground border-secondary shadow-lg'
                                : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* LEFT: CALENDAR GRID */}
                    <div className="lg:col-span-7">
                        <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                            <div className="bg-primary p-8 flex justify-between items-center border-b border-secondary">
                                <h3 className="text-text-alt font-black text-xl font-serif uppercase tracking-widest italic">
                                    {currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                                </h3>
                                <div className="flex space-x-3">
                                    <button onClick={() => changeMonth(-1)} className="p-3 text-text-alt hover:text-secondary bg-primary-foreground/5 rounded-sm transition-all">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={() => changeMonth(1)} className="p-3 text-text-alt hover:text-secondary bg-primary-foreground/5 rounded-sm transition-all">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-1">
                                <div className="grid grid-cols-7 border-b border-border bg-muted">
                                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                                        <div key={d} className="py-4 text-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7">
                                    {calendarGrid.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => item && setSelectedDate(item.dateStr)}
                                            className={`min-h-[100px] border-[0.5px] border-border/50 p-3 transition-all cursor-pointer group relative 
                                                ${!item ? 'bg-muted/20' : 'bg-card hover:bg-primary/5'} 
                                                ${selectedDate === item?.dateStr ? 'bg-primary/5 ring-1 ring-inset ring-secondary z-10' : ''}`}
                                        >
                                            {item && (
                                                <div className="flex flex-col h-full text-left">
                                                    <span className={`text-sm font-black ${selectedDate === item.dateStr ? 'text-primary' : 'text-muted-foreground/40'}`}>
                                                        {item.day}
                                                    </span>
                                                    <div className="mt-auto flex flex-wrap gap-1">
                                                        {events.filter(e => e.startDate.split('T')[0] === item.dateStr).map(e => (
                                                            <Link
                                                                key={e.id}
                                                                href={`/kegiatan/${e.id}`}
                                                                className="w-full h-1 bg-secondary rounded-full opacity-80 block hover:h-2 transition-all"
                                                                title={e.title}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: EVENT DETAILS FEED */}
                    <div className="lg:col-span-5 space-y-10 text-left">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h4 className="text-primary font-black font-serif uppercase tracking-[0.3em] text-xs">Detail Agenda</h4>
                            <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase">
                                {selectedDate}
                            </span>
                        </div>
                        
                        <div className="space-y-6">
                            {/* UPCOMING EVENTS LIST */}
                            {loading ? (
                                <div className="py-20 flex justify-center opacity-20">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : events.length > 0 ? (
                                events
                                .filter(e => {
                                    const eventDate = new Date(e.startDate).getTime();
                                    const targetDate = new Date(selectedDate).getTime();
                                    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
                                    // only show events from the selected date ONWARDS (upcoming)
                                    return eventDate >= targetDate && matchesSearch;
                                })
                                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                                .map(event => (
                                    <article key={event.id} className="group bg-card border border-border p-8 rounded-sm hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            <span className="bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm">
                                                {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                            {event.isFeatured && (
                                              <span className="border border-secondary text-secondary text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm">
                                                  Unggulan
                                              </span>
                                            )}
                                        </div>
                                        <h5 className="text-2xl font-black text-primary font-serif uppercase tracking-tight mb-6 italic leading-tight group-hover:text-secondary transition-colors">
                                            {event.title}
                                        </h5>
                                        <div className="space-y-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                            <div className="flex items-center gap-4">
                                                <Clock size={16} className="text-secondary" /> {event.time}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <MapPin size={16} className="text-secondary" /> {event.location}
                                            </div>
                                        </div>
                                        <div className="pt-8 border-t border-border mt-8">
                                            <Link
                                                href={`/kegiatan/${event.id}`}
                                                className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-primary hover:gap-6 transition-all no-underline"
                                            >
                                                Lihat Selengkapnya
                                            </Link>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="py-24 border-2 border-dashed border-border rounded-sm text-center opacity-30 font-serif italic text-lg text-muted-foreground">
                                    Tidak ada agenda pada tanggal ini.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EventsPage;