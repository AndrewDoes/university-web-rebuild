'use client'
import React, { useState, useEffect } from 'react';
import {
    Calendar, Plus, Search, Edit2, Trash2,
    MapPin, Clock, Loader2, AlertCircle, X, Save, Star,
    Type, ImageIcon, FileText, DollarSign
} from 'lucide-react';
import { api, EventDto } from '../services/api';

const EMPTY_FORM: Partial<EventDto> = {
    title: '',
    image: '',
    description: '',
    location: '',
    time: '',
    startDate: new Date().toISOString().split('T')[0],
    price: '0',
    isFeatured: false,
    status: 'upcoming'
};

const HOURS_12 = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

function convert24To12(time24?: string) {
    if (!time24 || !time24.includes(':')) {
        return {
            hour: '12',
            minute: '00',
            period: 'AM',
        };
    }

    const [rawHour, rawMinute] = time24.split(':');
    const parsedHour = Number(rawHour);

    if (Number.isNaN(parsedHour)) {
        return {
            hour: '12',
            minute: '00',
            period: 'AM',
        };
    }

    const minute = (rawMinute || '00').slice(0, 2).padStart(2, '0');
    const period = parsedHour >= 12 ? 'PM' : 'AM';

    let hour12 = parsedHour % 12;
    if (hour12 === 0) {
        hour12 = 12;
    }

    return {
        hour: String(hour12),
        minute,
        period,
    };
}

function convert12To24(hour: string, minute: string, period: string) {
    let parsedHour = Number(hour);

    if (Number.isNaN(parsedHour) || parsedHour < 1 || parsedHour > 12) {
        parsedHour = 12;
    }

    if (period === 'AM') {
        if (parsedHour === 12) {
            parsedHour = 0;
        }
    } else {
        if (parsedHour !== 12) {
            parsedHour += 12;
        }
    }

    return `${String(parsedHour).padStart(2, '0')}:${minute}`;
}

function formatTimeTo12Hour(time24?: string) {
    if (!time24 || !time24.includes(':')) {
        return '-';
    }

    const { hour, minute, period } = convert24To12(time24);
    return `${hour}:${minute} ${period}`;
}

export default function EventsManagementPage() {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventDto | null>(null);
    const [formData, setFormData] = useState<Partial<EventDto>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [timeHour, setTimeHour] = useState('12');
    const [timeMinute, setTimeMinute] = useState('00');
    const [timePeriod, setTimePeriod] = useState('AM');

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await api.events.getAll();
            setEvents(data || []);
        } catch {
            setError('Gagal memuat daftar kegiatan dari database.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const openCreate = () => {
        setEditingEvent(null);
        setFormData(EMPTY_FORM);
        setTimeHour('12');
        setTimeMinute('00');
        setTimePeriod('AM');
        setModalOpen(true);
    };

    const openEdit = (event: EventDto) => {
        const parsedTime = convert24To12(event.time);

        setEditingEvent(event);
        setFormData({
            title: event.title,
            image: event.image,
            description: event.description,
            location: event.location,
            time: event.time,
            startDate: event.startDate?.split('T')[0] || '',
            price: event.price,
            isFeatured: event.isFeatured,
            status: event.status
        });

        setTimeHour(parsedTime.hour);
        setTimeMinute(parsedTime.minute);
        setTimePeriod(parsedTime.period);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingEvent(null);
        setFormData(EMPTY_FORM);
        setTimeHour('12');
        setTimeMinute('00');
        setTimePeriod('AM');
    };

    const handleSave = async () => {
        if (!formData.title || !formData.location) {
            return;
        }

        const rawPrice = formData.price;
        const parsedPrice = rawPrice === '' || rawPrice === undefined || rawPrice === null
            ? 0
            : Number(rawPrice);

        const normalizedPrice = Number.isNaN(parsedPrice) ? 0 : Math.max(0, parsedPrice);

        if (normalizedPrice < 0) {
            setError('HTM tidak boleh bernilai negatif.');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const formattedTime = convert12To24(timeHour, timeMinute, timePeriod);

            const payload: Partial<EventDto> = {
                ...formData,
                time: formattedTime,
                price: String(normalizedPrice),
            };

            if (editingEvent) {
                await api.events.update(editingEvent.id, payload);
            } else {
                await api.events.create(payload);
            }

            closeModal();
            await fetchEvents();
        } catch {
            setError('Gagal menyimpan data kegiatan.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus kegiatan ini secara permanen?')) {
            return;
        }

        setDeletingId(id);

        try {
            await api.events.delete(id);
            await fetchEvents();
        } catch {
            setError('Gagal menghapus data.');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Campus <span className="text-primary italic text-3xl">Events</span>
                    </h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                        Manajemen Agenda &amp; Webinar STTB
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all w-fit"
                >
                    <Plus size={16} /> Tambah Kegiatan
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                        size={16}
                    />
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
                    <Loader2 size={16} className={loading ? 'animate-spin' : ''} /> Refresh
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                    <AlertCircle size={18} />
                    <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
                </div>
            )}

            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                {loading && events.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                            Syncing Event Data...
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Agenda &amp; Status</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Waktu</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Lokasi</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">HTM</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {filteredEvents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground text-sm italic">
                                            Belum ada agenda kegiatan. Klik &ldquo;Tambah Kegiatan&rdquo;.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEvents.map((event) => (
                                        <tr key={event.id} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="max-w-xs">
                                                    <p className="text-sm font-bold text-foreground uppercase tracking-tight line-clamp-1">
                                                        {event.title}
                                                    </p>
                                                    {event.isFeatured && (
                                                        <span className="text-[8px] font-black text-secondary uppercase tracking-[0.2em]">
                                                            Featured Event
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                                                        <Calendar size={12} className="text-primary opacity-60" />
                                                        <span className="text-[10px]">
                                                            {new Date(event.startDate).toLocaleDateString('id-ID')}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Clock size={12} className="opacity-40" />
                                                        <span className="text-[10px] font-mono">
                                                            {formatTimeTo12Hour(event.time)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-muted-foreground uppercase">
                                                    <MapPin size={12} className="text-secondary shrink-0" />
                                                    <span className="text-[10px] font-bold tracking-widest line-clamp-1">
                                                        {event.location}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-black text-primary uppercase">
                                                    {(() => {
                                                        const parsedPrice = Number(event.price);
                                                        const safePrice = Number.isNaN(parsedPrice) ? 0 : Math.max(0, parsedPrice);

                                                        return safePrice === 0
                                                            ? 'GRATIS'
                                                            : `Rp ${safePrice.toLocaleString('id-ID')}`;
                                                    })()}
                                                </span>
                                            </td>

                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-20 group-hover:opacity-100 transition-all">
                                                    <button
                                                        onClick={() => openEdit(event)}
                                                        className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(event.id)}
                                                        disabled={deletingId === event.id}
                                                        className="p-2.5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors disabled:opacity-40"
                                                    >
                                                        {deletingId === event.id ? (
                                                            <Loader2 size={16} className="animate-spin" />
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center mt-20 p-4 overflow-auto">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-primary" size={22} />
                                <h2 className="font-bold text-sm uppercase tracking-widest text-foreground">
                                    {editingEvent ? 'Edit Kegiatan' : 'Buat Agenda Baru'}
                                </h2>
                            </div>

                            <button onClick={closeModal} className="p-2 hover:bg-muted rounded-xl transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Type size={14} className="text-primary" /> Judul Kegiatan *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                    placeholder="Webinar Teologi Abad 21"
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="space-y-2 cursor-pointer"
                                    onClick={(e) => {
                                        const input = e.currentTarget.querySelector('input');
                                        if (input && typeof input.showPicker === 'function') {
                                            input.showPicker();
                                        }
                                    }}
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 cursor-pointer">
                                        <Calendar size={14} className="text-primary" /> Tanggal *
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.startDate || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                                        className="date-input-light-icon w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all cursor-pointer pointer-events-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Clock size={14} className="text-primary" /> Waktu
                                    </label>

                                    <div className="grid grid-cols-3 gap-3">
                                        <select
                                            value={timeHour}
                                            onChange={(e) => setTimeHour(e.target.value)}
                                            className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                        >
                                            {HOURS_12.map((hour) => (
                                                <option key={hour} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={timeMinute}
                                            onChange={(e) => setTimeMinute(e.target.value)}
                                            className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                        >
                                            {MINUTES.map((minute) => (
                                                <option key={minute} value={minute}>
                                                    {minute}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={timePeriod}
                                            onChange={(e) => setTimePeriod(e.target.value)}
                                            className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                        >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <MapPin size={14} className="text-primary" /> Lokasi / Platform *
                                </label>
                                <input
                                    type="text"
                                    value={formData.location || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                    placeholder="Aula Utama / Zoom"
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <DollarSign size={14} className="text-primary" /> HTM (0 = GRATIS)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={formData.price ?? ''}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (value === '') {
                                                setFormData((prev) => ({ ...prev, price: '' }));
                                                return;
                                            }

                                            const numericValue = Number(value);

                                            setFormData((prev) => ({
                                                ...prev,
                                                price: String(Math.max(0, numericValue)),
                                            }));
                                        }}
                                        className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <ImageIcon size={14} className="text-primary" /> URL Banner
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.image || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <FileText size={14} className="text-primary" /> Deskripsi
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                    placeholder="Detail kegiatan..."
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all resize-none"
                                />
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isFeatured ? 'bg-secondary' : 'bg-muted border border-border'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? 'left-5' : 'left-1 shadow-sm'}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={!!formData.isFeatured}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                                />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                                    <Star size={12} className={formData.isFeatured ? 'text-secondary fill-secondary' : ''} /> Tampilkan sebagai Unggulan
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2.5 bg-muted text-muted-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.title || !formData.location}
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