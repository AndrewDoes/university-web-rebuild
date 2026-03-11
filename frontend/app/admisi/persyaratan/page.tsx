'use client'
import React from 'react';
import {
    GraduationCap,
    BookOpen,
    UserCheck,
    Globe,
    Clock,
    FileText,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Info,
    Search,
    BookCheck,
    Languages,
    Award
} from 'lucide-react';

const generalBaseline = [
    {
        title: "Jenjang S1 (Sarjana)",
        description: "Calon mahasiswa S1 sudah menyelesaikan pendidikan SMU/sederajat.",
        icon: <GraduationCap size={24} />
    },
    {
        title: "Jenjang S2 (Pascasarjana)",
        description: "Calon mahasiswa S2 sudah menyelesaikan pendidikan S1.",
        icon: <Award size={24} />
    },
    {
        title: "Akreditasi Institusi",
        description: "Lulusan SMU atau S1 harus berasal dari sekolah/universitas yang terdaftar/diakui oleh pemerintah.",
        icon: <ShieldCheck size={24} />
    }
];

const s1Requirements = [
    {
        title: "SARJANA TEOLOGI (S.Th.)",
        requirements: [
            "Minimal lulusan SMA/sederajat.",
            "Memiliki pengalaman pelayanan gerejawi/lembaga Kristen minimal 2 tahun.",
            "Memiliki panggilan jelas sebagai hamba Tuhan penuh waktu.",
            "Memiliki kemampuan dasar Bahasa Inggris yang baik (membaca & memahami teks).",
            "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB."
        ]
    },
    {
        title: "SARJANA PENDIDIKAN KRISTEN (S.Pd.K.)",
        requirements: [
            "Minimal lulusan SMA/sederajat.",
            "Memiliki pengalaman pelayanan gerejawi/lembaga Kristen minimal 2 tahun.",
            "Memiliki panggilan jelas sebagai pendidik Kristen penuh waktu.",
            "Memiliki kemampuan dasar Bahasa Inggris yang baik (membaca & memahami teks).",
            "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB."
        ]
    }
];

const s2Requirements = [
    {
        title: "MAGISTER PENDIDIKAN KRISTEN (M.Pd.)",
        requirements: [
            "Lulus program S1 (semua jurusan).",
            "Memiliki pengalaman pelayanan di sekolah/gereja minimal 2 tahun.",
            "Memiliki kemampuan dasar Bahasa Inggris yang baik (membaca & memahami teks).",
            "Menyerahkan Book Review saat mendaftar di STTB.",
            "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB."
        ]
    },
    {
        title: "MAGISTER MINISTRI MARKETPLACE (M.Min.)",
        requirements: [
            "Lulusan S-1 Teologi atau Umum.",
            "Memiliki pengalaman bekerja minimal 2 tahun.",
            "Memiliki pengalaman pelayanan di gereja atau lembaga pelayanan minimal 1 tahun.",
            "Menyerahkan Book Review saat mendaftar di STTB."
        ]
    }
];

const PersyaratanPage: React.FC = () => {
    return (
        <div className="bg-background min-h-screen font-sans pt-20">
            {/* --- HERO SECTION --- */}
            <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="grid grid-cols-6 h-full w-full">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border-r border-primary-foreground/20 h-full" />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center space-x-3 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full">
                            <BookCheck size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Criteria & Eligibility</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Info <span className="text-secondary italic">Persyaratan</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Standar kualifikasi akademik dan rohani bagi calon mahasiswa STT Bandung."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- QUICK NAV (Matches Prosedur Page Layout) --- */}
            <section className="py-12 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { label: "JADWAL", href: "/admisi/jadwal" },
                            { label: "PROSEDUR", href: "/admisi/prosedur" },
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

            {/* --- GENERAL BASELINE --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {generalBaseline.map((item, idx) => (
                            <div key={idx} className="p-8 border border-border bg-card rounded-sm shadow-sm hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all mb-6">
                                    {item.icon}
                                </div>
                                <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-3">{item.title}</h4>
                                <p className="text-[12px] text-muted-foreground italic leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* International Note */}
                    <div className="max-w-5xl mx-auto mt-12 p-8 bg-muted/50 border-l-4 border-secondary rounded-sm flex gap-6 items-start">
                        <Globe size={24} className="text-secondary shrink-0" />
                        <div className="space-y-2">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Lulusan Luar Negeri</h5>
                            <p className="text-[13px] text-muted-foreground italic leading-relaxed">
                                Untuk calon mahasiswa yang telah menyelesaikan pendidikan umum lainnya (seperti B.A., M.A., dst) di luar Indonesia, maka penerimaan akan dipertimbangkan oleh STTB <span className="font-bold text-primary">kasus per kasus</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROGRAM SPECIFIC REQUIREMENTS --- */}
            <section className="py-24 bg-card border-y border-border relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Program Specific</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">Persyaratan Per Program Studi</h3>
                    </div>

                    <div className="space-y-24 max-w-6xl mx-auto">

                        {/* S1 SECTION */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <div className="px-6 py-2 bg-primary text-primary-foreground font-black text-2xl font-serif italic">S1</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {s1Requirements.map((prog, i) => (
                                    <div key={i} className="bg-background border border-border p-10 rounded-sm shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                                            <BookOpen size={120} />
                                        </div>
                                        <h4 className="text-xl font-bold text-primary font-serif mb-8 border-b border-border pb-6">{prog.title}</h4>
                                        <ul className="space-y-4">
                                            {prog.requirements.map((req, j) => (
                                                <li key={j} className="flex items-start gap-4">
                                                    <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0" />
                                                    <span className="text-[13px] text-muted-foreground leading-relaxed italic">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* S2 SECTION */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <div className="px-6 py-2 bg-primary text-primary-foreground font-black text-2xl font-serif italic">S2</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {s2Requirements.map((prog, i) => (
                                    <div key={i} className="bg-background border border-border p-10 rounded-sm shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                                            <FileText size={120} />
                                        </div>
                                        <h4 className="text-xl font-bold text-primary font-serif mb-8 border-b border-border pb-6">{prog.title}</h4>
                                        <ul className="space-y-4">
                                            {prog.requirements.map((req, j) => (
                                                <li key={j} className="flex items-start gap-4">
                                                    <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0" />
                                                    <span className="text-[13px] text-muted-foreground leading-relaxed italic">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Decorative textures */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none grid grid-cols-12">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-r border-primary h-full" />)}
                </div>
            </section>

            {/* --- IMPORTANT NOTES & CTA --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-primary text-primary-foreground p-12 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
                        <Info className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5" />
                        <div className="relative z-10 text-center space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-tighter text-secondary">Butuh Bantuan Persyaratan?</h3>
                                <p className="text-primary-foreground/70 text-sm italic leading-relaxed max-w-xl mx-auto">
                                    "Jika Anda memiliki pertanyaan spesifik mengenai dokumen atau kualifikasi akademik, tim Admisi kami siap membantu Anda."
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 pt-6">
                                <a href="https://sis.sttb.ac.id/pmb" target="_blank" className="px-12 py-5 bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-xs rounded-sm hover:opacity-90 transition-all shadow-xl no-underline">
                                    Daftar Sekarang
                                </a>
                                <a href="mailto:admisi@sttb.ac.id" className="px-12 py-5 border border-primary-foreground/20 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary-foreground/10 transition-all no-underline">
                                    Hubungi Admisi
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LOCATION FOOTER --- */}
            <div className="container mx-auto px-6 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest gap-4">
                <p>Sekolah Tinggi Teologi Bandung</p>
                <div className="flex gap-6">
                    <p>WA: 0815 7336 0009</p>
                    <p>admisi@sttb.ac.id</p>
                </div>
                <p>sttb.ac.id</p>
            </div>
        </div>
    );
};

export default PersyaratanPage;