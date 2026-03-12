'use client'
import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    FileText,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Users,
    Laptop,
    ClipboardList,
    Download
} from 'lucide-react';

const waveDeadlines = [
    { name: "Gelombang I", date: "13 Oktober 2025", status: "Closed" },
    { name: "Gelombang II", date: "2 Februari 2026", status: "Closed" },
    { name: "Gelombang III", date: "27 April 2026", status: "Active" }
];

const waveDetails = [
    {
        id: "G1",
        title: "Gelombang I",
        deadline: "13 Okt 2025",
        activities: [
            { label: "Psikotes", value: "17-18, 20, 27-29 Okt" },
            { label: "Tes Tertulis", value: "21 Oktober" },
            { label: "Wawancara", value: "20 November" }
        ]
    },
    {
        id: "G2",
        title: "Gelombang II",
        deadline: "2 Feb 2026",
        activities: [
            { label: "Psikotes", value: "6-7, 9, 16-18 Feb" },
            { label: "Tes Tertulis", value: "10 Februari" },
            { label: "Wawancara", value: "3 Maret" }
        ]
    },
    {
        id: "G3",
        title: "Gelombang III",
        deadline: "27 Apr 2026",
        activities: [
            { label: "Psikotes", value: "1-2, 4, 11-12 Mei" },
            { label: "Tes Tertulis", value: "5 Mei" },
            { label: "Wawancara", value: "26 & 28 Mei" }
        ]
    }
];

const JadwalAdmisiPage: React.FC = () => {
    const [activeWave, setActiveWave] = useState(2); // Default to G3

    return (
        <div className="bg-background min-h-screen font-sans pt-20">
            {/* --- HERO SECTION (Centered to match Persyaratan & Prosedur) --- */}
            <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center space-x-3 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full text-secondary">
                            <Calendar size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Timeline Akademik</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-none">
                            Jadwal <br /> <span className="text-secondary italic">Admisi</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-primary-foreground/60 font-bold uppercase tracking-[0.2em] -mt-2">
                            Tahun Akademik 2026 - 2027
                        </h2>
                    </div>
                </div>
            </section>

            {/* --- WAVE DEADLINES (CARDS) --- */}
            <section className="py-20 -mt-16 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {waveDeadlines.map((wave, i) => (
                            <div
                                key={i}
                                className={`p-8 border rounded-sm transition-all duration-500 flex flex-col justify-between h-full ${wave.status === "Active"
                                    ? "bg-card border-secondary shadow-2xl shadow-secondary/10"
                                    : "bg-muted/50 border-border opacity-70"
                                    }`}
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-primary font-black uppercase tracking-widest text-xs">{wave.name}</h3>
                                        <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-sm ${wave.status === "Active" ? "bg-secondary text-secondary-foreground" : "bg-border text-muted-foreground"
                                            }`}>
                                            {wave.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Pendaftaran Ditutup:</p>
                                        <p className="text-2xl font-bold font-serif text-primary tracking-tight">{wave.date}</p>
                                    </div>
                                </div>
                                {wave.status === "Active" && (
                                    <div className="mt-8 pt-6 border-t border-border">
                                        <a href="/admisi/pendaftaran" className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors no-underline">
                                            Daftar Sekarang <ArrowRight size={14} className="ml-2" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- DETAILED ACTIVITIES --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-32">
                            <div>
                                <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs mb-4">Agenda Seleksi</h2>
                                <h3 className="text-4xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">Aktivitas <br /> Penerimaan</h3>
                            </div>
                            <p className="text-muted-foreground text-sm italic leading-relaxed">
                                Rangkaian kegiatan tes masuk dilakukan secara daring melalui portal pendaftaran dan platform video conference.
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                                {waveDetails.map((wave, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveWave(idx)}
                                        className={`w-full flex items-center justify-between p-5 border rounded-sm transition-all text-left ${activeWave === idx
                                            ? 'bg-primary border-primary text-primary-foreground shadow-xl translate-x-2'
                                            : 'bg-card border-border text-muted-foreground hover:border-secondary'
                                            }`}
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-widest">{wave.title}</span>
                                        <Clock size={16} className={activeWave === idx ? "text-secondary" : "text-muted-foreground/30"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-2/3 w-full">
                            <div className="bg-card border border-border p-8 md:p-12 rounded-sm shadow-sm">
                                <div className="flex items-center justify-between mb-12 pb-6 border-b border-border">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-primary text-secondary flex items-center justify-center rounded-full">
                                            <ClipboardList size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold font-serif text-primary uppercase tracking-tight">Timeline {waveDetails[activeWave].title}</h4>
                                            <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Batas Berkas: {waveDetails[activeWave].deadline}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    {waveDetails[activeWave].activities.map((act, i) => (
                                        <div key={i} className="relative pl-12 group">
                                            {/* Connector Line */}
                                            <div className="absolute left-4.75 top-10 -bottom-12 w-px bg-border group-last:hidden" />

                                            <div className="absolute left-0 top-1 w-10 h-10 bg-muted rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                <span className="font-serif italic font-bold">0{i + 1}</span>
                                            </div>

                                            <div className="space-y-2">
                                                <h5 className="text-[11px] font-black uppercase tracking-widest text-secondary">{act.label}</h5>
                                                <p className="text-xl md:text-2xl font-bold text-primary tracking-tight font-serif italic">"{act.value}"</p>
                                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase font-bold tracking-widest pt-2">
                                                    <Laptop size={12} /> Melalui Zoom & Portal PMB
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FINE PRINT / NOTES */}
                            <div className="mt-12 p-8 bg-primary text-primary-foreground rounded-sm relative overflow-hidden">
                                <AlertCircle className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5" />
                                <div className="relative z-10 space-y-4">
                                    <h4 className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-secondary">
                                        <AlertCircle size={16} /> Catatan Penting
                                    </h4>
                                    <ul className="space-y-4 text-[13px] leading-relaxed italic text-primary-foreground/70">
                                        <li>Pendaftar yang berkasnya tidak lolos seleksi dokumen tidak akan dipanggil untuk mengikuti tes masuk.</li>
                                        <li>Tanggal tes dan aktivitas lainnya akan dikonfirmasi kembali melalui surat panggilan resmi, grup WhatsApp peserta, dan notifikasi staf Admisi.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BANTUAN SECTION --- */}
            <section className="py-24 bg-muted/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-card border border-border p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 rounded-sm shadow-xl">
                        <div className="text-center md:text-left space-y-4">
                            <h3 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter">Bantuan Informasi</h3>
                            <p className="text-muted-foreground text-sm italic max-w-md leading-relaxed">
                                Pertanyaan mengenai jadwal, pengembalian berkas, atau informasi beasiswa? Hubungi tim pendukung kami.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <a href="mailto:admisi@sttb.ac.id" className="px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 transition-all text-center no-underline shadow-lg">
                                Email Admisi
                            </a>
                            <a href="https://wa.me/6281573360009" className="px-10 py-4 border border-border text-primary font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-muted transition-all text-center no-underline">
                                WhatsApp Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LOCATION FOOTER --- */}
            <div className="bg-background py-8 border-t border-border">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest gap-4">
                    <p>Jl. Dr. Junjunan No. 105, Bandung 40173</p>
                    <div className="flex gap-6">
                        <p>Tel: 022-6016454</p>
                        <p>Fax: 022-6077921</p>
                        <p>sttb.ac.id</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JadwalAdmisiPage;