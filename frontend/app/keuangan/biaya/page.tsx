'use client'
import React, { useState } from 'react';
import {
    Wallet,
    CreditCard,
    Receipt,
    ChevronRight,
    Info,
    HelpCircle,
    ArrowRight,
    CheckCircle2,
    Clock,
    ShieldCheck,
    GraduationCap,
    BookOpen,
    Landmark
} from 'lucide-react';

interface FeeItem {
    label: string;
    value: string;
    type: string;
    note?: string;
}

interface FeeGroup {
    title: string;
    subtitle: string;
    items: FeeItem[];
}

const feeData: Record<'s1' | 's2' | 'mmin', FeeGroup> = {
    s1: {
        title: "Program Sarjana (S1)",
        subtitle: "S.Th. & S.Pd.",
        items: [
            { label: "Pendaftaran & Tes Masuk", value: "Rp 500.000", type: "Administrasi" },
            { label: "Administrasi Per Semester", value: "Rp 500.000", type: "Administrasi" },
            { label: "Biaya Kuliah Per Semester", value: "Rp 9.000.000", type: "Pendidikan", note: "Dapat dicicil Rp 1.500.000/bulan" },
            { label: "Bimbingan Tugas Akhir", value: "Rp 1.500.000", type: "Pendidikan" },
            { label: "Biaya Wisuda", value: "Rp 2.000.000", type: "Lain-lain" },
            { label: "Cuti Akademik Per Semester", value: "Rp 500.000", type: "Lain-lain" }
        ]
    },
    s2: {
        title: "Program Magister (S2)",
        subtitle: "M.Th. & M.Pd.",
        items: [
            { label: "Pendaftaran & Tes Masuk", value: "Rp 500.000", type: "Administrasi" },
            { label: "Administrasi Per Semester", value: "Rp 500.000", type: "Administrasi" },
            { label: "Biaya Kuliah Per Mata Kuliah", value: "Rp 1.500.000", type: "Pendidikan" },
            { label: "Bimbingan & Ujian Proposal Tesis", value: "Rp 2.000.000", type: "Pendidikan" },
            { label: "Bimbingan & Sidang Tesis", value: "Rp 5.000.000", type: "Pendidikan" },
            { label: "Biaya Wisuda", value: "Rp 2.500.000", type: "Lain-lain" },
            { label: "Matrikulasi (Khusus Non-S.Th)", value: "Rp 7.800.000", type: "Khusus", note: "Per Semester" }
        ]
    },
    mmin: {
        title: "Magister Ministri (M.Min.)",
        subtitle: "Pelayanan Marketplace",
        items: [
            { label: "Pendaftaran & Tes Masuk", value: "Rp 500.000", type: "Administrasi" },
            { label: "Administrasi Per Semester", value: "Rp 500.000", type: "Administrasi" },
            { label: "Biaya Kuliah Per Mata Kuliah", value: "Rp 1.500.000", type: "Pendidikan" },
            { label: "Tugas Akhir (Proyek)", value: "Rp 2.500.000", type: "Pendidikan" },
            { label: "Biaya Wisuda", value: "Rp 2.500.000", type: "Lain-lain" },
            { label: "Cuti Akademik Per Semester", value: "Rp 500.000", type: "Lain-lain" }
        ]
    }
};

const BiayaStudiPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof feeData>('s1');

    return (
        <div className="bg-background min-h-screen font-sans pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center space-x-3 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full">
                            <Wallet size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Financial Information</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Investasi <span className="text-secondary italic">Pendidikan</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Struktur biaya studi yang transparan untuk mendukung persiapan pelayanan Anda."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- QUICK NAV (Unified with Admisi Section) --- */}
            <section className="py-12 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row  flex-wrap justify-center gap-4">
                        {[
                            { label: "BEASISWA", href: "/keuangan/beasiswa" },
                            { label: "PROSEDUR", href: "/admisi/prosedur" },
                            { label: "PERSYARATAN", href: "/admisi/persyaratan" },
                            { label: "FAQ", href: "/admisi/faq" }
                        ].map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="px-10 py-3 bg-muted border border-border text-primary font-black tracking-[0.3em] text-[10px] uppercase rounded-sm hover:border-secondary hover:text-secondary transition-all no-underline"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FEE CALCULATOR / SELECTOR --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* LEFT: PROGRAM SELECTOR */}
                        <div className="lg:w-1/3 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-primary font-bold font-serif text-3xl uppercase tracking-tighter">Pilih Jenjang</h2>
                                <p className="text-muted-foreground text-sm italic leading-relaxed">
                                    Silahkan pilih program studi Anda untuk melihat rincian biaya pendidikan secara mendetail.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                {(Object.keys(feeData) as Array<keyof typeof feeData>).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`flex items-center justify-between p-6 border rounded-sm transition-all text-left ${activeTab === key
                                            ? "bg-primary border-primary text-primary-foreground shadow-xl translate-x-2"
                                            : "bg-card border-border text-muted-foreground hover:border-secondary"
                                            }`}
                                    >
                                        <div className="space-y-1">
                                            <h4 className={`text-[11px] font-black uppercase tracking-widest ${activeTab === key ? "text-secondary" : "text-primary"}`}>
                                                {feeData[key].title}
                                            </h4>
                                            <p className={`text-[10px] font-bold uppercase opacity-50 ${activeTab === key ? "text-primary-foreground" : "text-muted-foreground"}`}>
                                                {feeData[key].subtitle}
                                            </p>
                                        </div>
                                        <ArrowRight size={14} className={activeTab === key ? "opacity-100" : "opacity-20"} />
                                    </button>
                                ))}
                            </div>

                            <div className="p-8 bg-muted/50 border border-border rounded-sm space-y-6">
                                <div className="flex items-center gap-3 text-primary">
                                    <Landmark size={20} />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest">Informasi Rekening</h4>
                                </div>
                                <div className="space-y-2 border-l-2 border-secondary pl-6">
                                    <p className="text-[12px] font-bold text-primary uppercase">BCA Cab. Surya Sumantri</p>
                                    <p className="text-lg font-mono font-black text-secondary tracking-tighter">282.300.5555</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">an. Yayasan STT Bandung</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: FEE TABLE */}
                        <div className="lg:w-2/3">
                            <div className="bg-card border border-border rounded-sm shadow-2xl overflow-hidden">
                                <div className="p-8 md:p-12 border-b border-border bg-muted/20 flex justify-between items-end">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold font-serif text-primary uppercase tracking-tight">{feeData[activeTab].title}</h3>
                                        <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] italic">Detail Komponen Biaya</p>
                                    </div>
                                    <Receipt size={40} className="text-primary opacity-10" />
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-primary text-primary-foreground">
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/10">Jenis Biaya</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/10">Kategori</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Nominal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feeData[activeTab].items.map((item, i) => (
                                                <tr key={i} className="border-b border-border/50 group hover:bg-muted/30 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1">
                                                            <p className="text-[13px] font-bold text-primary uppercase tracking-tight">{item.label}</p>
                                                            {item.note && <p className="text-[10px] text-muted-foreground italic">{item.note}</p>}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-[9px] font-black uppercase tracking-widest bg-muted px-2 py-1 rounded-sm text-muted-foreground border border-border">
                                                            {item.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-lg font-bold font-serif text-primary italic tracking-tight">{item.value}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* FOOTER NOTES FOR THE TABLE */}
                                <div className="p-8 md:p-12 bg-muted/10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex gap-4 items-start">
                                            <div className="mt-1"><CheckCircle2 size={16} className="text-secondary" /></div>
                                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                                STTB memberikan subsidi untuk biaya akomodasi & konsumsi bagi mahasiswa tertentu.
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="mt-1"><CheckCircle2 size={16} className="text-secondary" /></div>
                                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                                Biaya administrasi semester dibayarkan di awal semester (Januari & Juli) selama berstatus aktif.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 border border-secondary/20 bg-secondary/5 rounded-sm flex items-center gap-4">
                                        <Info size={16} className="text-secondary shrink-0" />
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-tight">Biaya sewaktu-waktu dapat berubah dengan pemberitahuan sebelumnya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto bg-primary border border-primary-foreground/10 p-12 md:p-16 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 flex-1">
                            <h3 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-tighter text-secondary leading-none">Bantuan Finansial</h3>
                            <p className="text-primary-foreground/70 text-sm italic leading-relaxed max-w-md">
                                "Kami mengerti bahwa biaya studi adalah komitmen besar. Pelajari program beasiswa kami atau hubungi tim administrasi untuk konsultasi."
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Transparansi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Subsidi Akademik</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <a href="/mahasiswa/beasiswa" className="px-10 py-4 bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 transition-all text-center no-underline shadow-lg flex items-center justify-center gap-3">
                                Lihat Info Beasiswa
                            </a>
                            <a href="https://wa.me/6281573360009" className="px-10 py-4 border border-primary-foreground/20 text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-sm hover:bg-primary-foreground/10 transition-all text-center no-underline">
                                Konsultasi Keuangan
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
                        <p>official@sttb.ac.id</p>
                        <p>sttb.ac.id</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiayaStudiPage;