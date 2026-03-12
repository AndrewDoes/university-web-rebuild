'use client'
import React, { useState } from 'react';
import {
    Heart,
    Handshake,
    Landmark,
    BookOpen,
    Users,
    Zap,
    ArrowRight,
    CheckCircle2,
    Mail,
    Phone,
    Globe,
    ChevronRight,
    PlayCircle,
    Info,
    Send
} from 'lucide-react';

const supportPriorities = [
    {
        title: "Program Beasiswa",
        icon: <Users size={28} />,
        description: "Mendukung mahasiswa terpilih (min. Semester 2 dengan IPK 3.0) yang memiliki kendala finansial untuk mewujudkan panggilan pelayanan mereka.",
        features: ["Biaya Kuliah Bulanan", "Biaya Buku & Administrasi", "Biaya Skripsi & Wisuda"]
    },
    {
        title: "Perpustakaan Digital",
        icon: <BookOpen size={28} />,
        description: "Pengembangan koleksi 50.000+ buku fisik dan akses database jurnal global (ATLA & Ebscohost) bagi dosen dan mahasiswa.",
        features: ["Langganan E-Journal", "Penambahan Koleksi E-Book", "Infrastruktur Digital Library"]
    },
    {
        title: "Inovasi & Pengembangan",
        icon: <Zap size={28} />,
        description: "Pendanaan untuk digital ministry, pembuatan studio rekaman, serta pembinaan hamba Tuhan di daerah-daerah terpencil.",
        features: ["Digital Ministry Studio", "Seminar Daerah", "Pembangunan Fasilitas"]
    }
];

const faqs = [
    {
        q: "Apakah STTB menyediakan laporan beasiswa bagi sponsor?",
        a: "Ya, STTB akan menyediakan laporan tahunan yang komprehensif kepada setiap Bapak/Ibu sponsor beasiswa sebagai bentuk akuntabilitas."
    },
    {
        q: "Berapa dana minimum untuk berpartisipasi?",
        a: "Kami menyediakan gambaran besaran dana untuk setiap jenis beasiswa. Besaran ini dapat disesuaikan dengan kemampuan dan kerinduan Bapak/Ibu."
    },
    {
        q: "Bagaimana cara memberikan dana sponsor?",
        a: "Bapak/Ibu dapat melakukan transfer langsung ke rekening resmi Yayasan STT Bandung dan melakukan konfirmasi melalui form atau kontak yang tersedia."
    }
];

const DukungSTTBPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="bg-background min-h-screen font-sans">
            {/* --- HERO SECTION --- */}
            <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center space-x-3 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full">
                            <Heart size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Partnership & Legacy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Investasi <span className="text-secondary italic">Kerajaan Allah</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Menolong STTB melanjutkan amanat Kristus untuk mempersiapkan pemimpin yang transformatif dan berdampak."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CORE VISION STATEMENT --- */}
            <section className="py-24 bg-background border-b border-border">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="flex justify-center">
                            <Handshake size={48} className="text-secondary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary tracking-tighter uppercase">Kontribusi Anda</h2>
                        <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
                            "Dukungan Bapak/Ibu akan sangat membantu biaya studi mahasiswa yang memiliki kendala finansial, peningkatan sumber daya, kualitas pendidik, serta menunjang fasilitas teknologi pembelajaran. Seberapapun nilainya, kontribusi Anda sangat berarti bagi kehidupan mahasiswa dan STTB."
                        </p>
                        <div className="w-16 h-1 bg-secondary mx-auto" />
                    </div>
                </div>
            </section>

            {/* --- DONATION PRIORITIES --- */}
            <section className="py-24 bg-card">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-secondary font-black tracking-[0.4em] uppercase text-[10px]">Prioritas Penggunaan</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter">Pilar Dukungan</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {supportPriorities.map((item, idx) => (
                            <div key={idx} className="bg-background border border-border p-10 rounded-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                                <div className="w-14 h-14 bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-8 rounded-sm group-hover:rotate-6">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-primary font-serif uppercase tracking-tight mb-4">{item.title}</h4>
                                <p className="text-[12px] text-muted-foreground italic leading-relaxed mb-8 flex-grow">"{item.description}"</p>
                                <ul className="space-y-3 pt-6 border-t border-border">
                                    {item.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                                            <CheckCircle2 size={14} className="text-secondary" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GIVING CHANNELS --- */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto bg-primary border border-primary-foreground/10 p-12 md:p-16 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-8 flex-1">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 text-secondary">
                                    <Landmark size={20} />
                                    <h3 className="font-bold uppercase tracking-widest text-xs">Informasi Rekening</h3>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-tighter leading-tight">Salurkan Dukungan <br /> Anda Melalui:</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white/5 border-l-4 border-secondary p-6 rounded-sm">
                                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">BCA Surya Sumantri</p>
                                    <p className="text-3xl font-mono font-black tracking-tighter text-white">282 300 5555</p>
                                    <p className="text-[11px] font-bold uppercase mt-2 opacity-60 italic">an. Yayasan STT Bandung</p>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
                                    <Mail size={14} className="text-secondary" /> keuangan@sttb.ac.id
                                </div>
                            </div>
                        </div>

                        <div className="bg-card p-10 md:p-12 rounded-sm text-center md:text-left space-y-8 shadow-xl w-full md:w-auto">
                            <h4 className="text-primary font-black font-serif text-2xl uppercase tracking-tighter">Konfirmasi Dukungan</h4>
                            <p className="text-muted-foreground text-xs italic leading-relaxed max-w-xs">"Beritahukan kami mengenai kontribusi Anda agar kami dapat mengirimkan tanda terima resmi."</p>
                            <div className="space-y-4">
                                <button className="w-full bg-secondary text-secondary-foreground py-4 px-10 rounded-sm font-black uppercase tracking-widest text-[10px] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-3">
                                    Isi Form Konfirmasi <Send size={14} />
                                </button>
                                <button className="w-full border border-border text-primary py-4 px-10 rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-muted transition-all">
                                    WhatsApp Keuangan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-r border-primary-foreground h-full" />)}
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-secondary font-black tracking-[0.4em] uppercase text-[10px]">Pertanyaan Sponsor</h2>
                            <h3 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter">Kesediaan Mendukung</h3>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border border-border rounded-sm bg-card overflow-hidden transition-all">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full flex items-center justify-between p-8 text-left hover:bg-muted/30 transition-all group"
                                    >
                                        <span className={`text-[13px] font-bold uppercase tracking-tight transition-colors ${openFaq === idx ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
                                            {faq.q}
                                        </span>
                                        <div className={`text-secondary transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}>
                                            <PlayCircle size={20} className="rotate-90" />
                                        </div>
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                        <div className="p-8 pt-0 text-[13px] text-muted-foreground leading-relaxed italic border-t border-border/50">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LOCATION FOOTER --- */}
            <div className="bg-background py-8 border-t border-border">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest gap-4">
                    <p>Sekolah Tinggi Teologi Bandung</p>
                    <div className="flex gap-8">
                        <p>WA: 0815 7336 0009</p>
                        <p>official@sttb.ac.id</p>
                        <p>sttb.ac.id</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DukungSTTBPage;