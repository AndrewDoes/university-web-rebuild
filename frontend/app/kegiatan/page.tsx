'use client'
import React, { useState, useEffect, useMemo } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Clock,
    MapPin,
    Tag,
    Download,
    Share2,
    Plus
} from 'lucide-react';

// Sample Event Data
const mockEvents = [
    { id: 1, date: '2026-03-12', title: "Seminar Teologi Urban", category: "Akademik", time: "09:00 - 12:00", location: "Aula Lt. 7" },
    { id: 2, date: '2026-03-15', title: "Open House S1/S2", category: "Admisi", time: "10:00 - 14:00", location: "Lobi Utama" },
    { id: 3, date: '2026-03-22', title: "Dies Natalis STTB", category: "Institusi", time: "17:00 - selesai", location: "Kapel Utama" },
    { id: 4, date: '2026-03-25', title: "Workshop Penulisan Jurnal", category: "Penelitian", time: "13:00 - 16:00", location: "Lab Komputer" },
    { id: 5, date: '2026-04-05', title: "Ujian Tengah Semester", category: "Akademik", time: "08:00 - 16:00", location: "Ruang Kelas" },
];

const categories = ["Semua", "Akademik", "Admisi", "Institusi", "Penelitian", "Kemahasiswaan"];

const EventsPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 10)); // Fixed to March 2026 for demo
    const [selectedDate, setSelectedDate] = useState<string>('2026-03-12');
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    // Calendar logic
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const offset = firstDayOfMonth(year, month);

        const days = [];
        // Pad previous month
        for (let i = 0; i < offset; i++) days.push(null);
        // Current month
        for (let i = 1; i <= totalDays; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            days.push({ day: i, dateStr });
        }
        return days;
    }, [currentDate]);

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const filteredEvents = mockEvents.filter(e =>
        (activeCategory === "Semua" || e.category === activeCategory) &&
        (e.date.startsWith(currentDate.toISOString().slice(0, 7)))
    );

    const selectedDayEvents = mockEvents.filter(e => e.date === selectedDate);

    if (!isMounted) return null;

    return (
        <div className="bg-background min-h-screen">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-20 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-secondary">
                        <CalendarIcon size={20} />
                        <span className="font-bold tracking-[0.4em] uppercase text-xs">Agenda Kampus</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                        Kalender <span className="text-secondary italic">Akademik</span>
                    </h1>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <div className="grid grid-cols-6 h-full border-l border-white/20">
                        {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20" />)}
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <section className="py-16">
                <div className="container mx-auto px-6">

                    {/* Filters Bar */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-8 border-b border-border">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? 'bg-secondary text-secondary-foreground shadow-md'
                                        : 'bg-muted text-muted-foreground hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full lg:w-72">
                            <input
                                type="text"
                                placeholder="Cari kegiatan..."
                                className="w-full bg-card border border-border px-10 py-2.5 text-xs rounded-sm focus:ring-1 focus:ring-secondary outline-none"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* LEFT: INTERACTIVE CALENDAR */}
                        <div className="lg:col-span-7">
                            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                                {/* Calendar Header */}
                                <div className="bg-primary p-6 flex justify-between items-center">
                                    <h3 className="text-white font-bold font-serif text-lg uppercase tracking-widest">
                                        {currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button onClick={() => changeMonth(-1)} className="p-2 text-white/60 hover:text-secondary hover:bg-white/5 rounded-full transition-all">
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button onClick={() => changeMonth(1)} className="p-2 text-white/60 hover:text-secondary hover:bg-white/5 rounded-full transition-all">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="p-1">
                                    <div className="grid grid-cols-7 border-b border-border bg-muted/50">
                                        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                                            <div key={d} className="py-3 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{d}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7">
                                        {calendarGrid.map((item, i) => (
                                            <div
                                                key={i}
                                                onClick={() => item && setSelectedDate(item.dateStr)}
                                                className={`
                                                    min-h-20 md:min-h-25 border-[0.5px] border-border p-2 transition-all cursor-pointer group
                                                    ${!item ? 'bg-muted/10' : 'bg-background hover:bg-primary/5'}
                                                    ${selectedDate === item?.dateStr ? 'ring-2 ring-inset ring-secondary z-10' : ''}
                                                `}
                                            >
                                                {item && (
                                                    <div className="flex flex-col h-full">
                                                        <span className={`text-xs font-bold ${selectedDate === item.dateStr ? 'text-secondary' : 'text-muted-foreground'}`}>
                                                            {item.day}
                                                        </span>
                                                        {/* Marker for events */}
                                                        <div className="mt-2 space-y-1">
                                                            {mockEvents.filter(e => e.date === item.dateStr).map(e => (
                                                                <div key={e.id} className="w-full h-1.5 bg-secondary rounded-full opacity-80" title={e.title} />
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
                        <div className="lg:col-span-5 space-y-8">
                            <div className="flex items-center justify-between">
                                <h4 className="text-primary font-bold font-serif uppercase tracking-widest text-sm flex items-center">
                                    <Plus className="mr-2 text-secondary" size={16} />
                                    Detail Kegiatan
                                </h4>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {selectedDate}
                                </span>
                            </div>

                            <div className="space-y-6">
                                {selectedDayEvents.length > 0 ? (
                                    selectedDayEvents.map(event => (
                                        <div key={event.id} className="group bg-card border border-border p-6 rounded-sm hover:border-secondary transition-all shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                                    {event.category}
                                                </span>
                                                <div className="flex space-x-3 text-muted-foreground">
                                                    <button className="hover:text-secondary transition-colors"><Share2 size={14} /></button>
                                                    <button className="hover:text-secondary transition-colors"><Download size={14} /></button>
                                                </div>
                                            </div>
                                            <h5 className="text-lg font-bold text-primary font-serif mb-4 leading-tight">
                                                {event.title}
                                            </h5>
                                            <div className="space-y-2 text-[12px] text-muted-foreground">
                                                <div className="flex items-center"><Clock size={14} className="mr-3 text-secondary" /> {event.time}</div>
                                                <div className="flex items-center"><MapPin size={14} className="mr-3 text-secondary" /> {event.location}</div>
                                            </div>
                                            <button className="w-full mt-6 py-2.5 border border-border text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                                Lihat Detail Kegiatan
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 border-2 border-dashed border-border rounded-sm text-center flex flex-col items-center justify-center opacity-50">
                                        <CalendarIcon size={32} className="mb-4 text-muted-foreground" />
                                        <p className="text-xs italic font-medium">Tidak ada kegiatan pada tanggal ini.</p>
                                    </div>
                                )}
                            </div>

                            {/* Monthly Summary / Next Events */}
                            <div className="pt-8 border-t border-border">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6">Agenda Mendatang</h4>
                                <div className="space-y-4">
                                    {mockEvents.slice(0, 3).map(e => (
                                        <div key={e.id} className="flex items-center justify-between py-3 border-b border-border/50 group cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-2 h-2 bg-secondary rounded-full" />
                                                <span className="text-[11px] font-bold text-primary truncate max-w-50 uppercase tracking-tight">{e.title}</span>
                                            </div>
                                            <span className="text-[10px] font-mono text-muted-foreground">{e.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;