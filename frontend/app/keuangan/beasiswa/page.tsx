'use client'
import React, { useState } from 'react';
import {
    Award,
    CheckCircle2,
    BookOpen,
    UserCheck,
    Zap,
    ChevronDown,
    AlertTriangle,
    Download,
    Mail,
    ArrowRight,
    GraduationCap,
    HeartHandshake,
    Info,
    History
} from 'lucide-react';

const scholarshipTypes = [
    {
        id: "pastor-scholar",
        title: "Beasiswa S1 Pastor Scholar",
        target: "Mahasiswa Baru S1",
        description: "Program unggulan bagi mahasiswa S1 yang menjadikan STTB sebagai pilihan pertama sejak semester awal.",
        benefits: [
            "Meliputi biaya pendidikan dari semester 1.",
            "Pendampingan akademik dan spiritual intensif.",
            "Kesempatan membantu kegiatan administrasi/akademik STTB."
        ],
        requirements: [
            "Prestasi SMA menonjol (rata-rata rapor minimal 8.0).",
            "Memiliki panggilan dan rekomendasi yang kuat.",
            "Minimal IPK 2.75 (Sem 1) dan 3.00 (Sem 2-4).",
            "Alokasi waktu 15 jam/bulan untuk kegiatan kampus.",
            "Bersedia memenuhi ikatan dinas 2 tahun (0.5 N) setelah lulus."
        ]
    },
    {
        id: "formatio",
        title: "Beasiswa S1 Formatio",
        target: "Mahasiswa Aktif S1",
        description: "Diperuntukkan bagi mahasiswa yang telah menempuh minimal semester 2 dengan performa luar biasa.",
        benefits: [
            "Meliputi biaya pendidikan S1 mulai tahun kedua.",
            "Evaluasi kelanjutan beasiswa dilakukan setiap semester.",
            "Pengembangan karakter melalui pelayanan kampus."
        ],
        requirements: [
            "Telah menempuh minimal 2 semester studi.",
            "Memiliki prestasi belajar yang baik & lolos wawancara.",
            "Alokasi waktu 15 jam/bulan untuk kegiatan kampus.",
            "Bersedia memenuhi ikatan dinas 0.5 N setelah lulus."
        ]
    },
    {
        id: "leadership",
        title: "Transformative Leadership",
        target: "Mahasiswa S2",
        description: "Beasiswa prestasi bagi mahasiswa pascasarjana dengan potensi kepemimpinan yang menonjol.",
        benefits: [
            "Meliputi maksimal 50% dari total biaya pendidikan.",
            "Tidak diberlakukan ikatan dinas paska kelulusan.",
            "Peran strategis dalam kepanitiaan event STTB."
        ],
        requirements: [
            "Prestasi akademik atau non-akademik yang menonjol.",
            "Melakukan pelayanan 10 jam di lembaga pelayanan/domisili.",
            "Bersedia menjadi ketua atau koordinator kelas.",
            "Memiliki integritas dan panggilan yang jelas."
        ]
    }
];

const faqs = [
    {
        q: "Siapa saja yang bisa mendapatkan beasiswa?",
        a: "Secara umum adalah mahasiswa aktif penuh waktu yang memenuhi kriteria prestasi, memiliki integritas karakter, dan lolos seluruh rangkaian proses seleksi."
    },
    {
        q: "Bagaimana cara mendaftar beasiswa?",
        a: "Pendaftaran dilakukan dengan mengunduh formulir aplikasi resmi, melengkapi dokumen penunjang, dan mengirimkannya ke unit beasiswa sesuai jadwal."
    },
    {
        q: "Kapan aplikasi beasiswa dapat dikirimkan?",
        a: "Aplikasi dikirimkan selambat-lambatnya 3 minggu sebelum proses pendaftaran periode ditutup. Pastikan memantau jadwal seleksi tahunan."
    },
    {
        q: "Apakah penerima beasiswa dapat mengajukan jenis beasiswa lain?",
        a: "Penerima beasiswa aktif tidak diperkenankan mengajukan jenis beasiswa lain di periode berikutnya guna pemerataan dukungan bagi mahasiswa lain."
    }
];

const BeasiswaPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

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
                            <Award size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Financial Support</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Program <span className="text-secondary italic">Beasiswa</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Mendukung lahirnya pastor-scholar melalui bantuan biaya pendidikan berbasis prestasi dan dedikasi."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CORE CATEGORIES --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {scholarshipTypes.map((type, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-sm flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 group">
                                <div className="p-8 md:p-10 border-b border-border space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 bg-muted rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            {idx === 0 ? <GraduationCap size={24} /> : idx === 1 ? <UserCheck size={24} /> : <Zap size={24} />}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest bg-secondary text-secondary-foreground px-2 py-1 rounded-sm">
                                            {type.target}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary font-serif uppercase tracking-tight">{type.title}</h3>
                                    <p className="text-[12px] text-muted-foreground italic leading-relaxed">{type.description}</p>
                                </div>

                                <div className="p-8 md:p-10 flex-grow space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Cakupan Beasiswa:</h4>
                                        <ul className="space-y-3">
                                            {type.benefits.map((b, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[12px] text-muted-foreground">
                                                    <CheckCircle2 size={14} className="text-secondary shrink-0 mt-0.5" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Kriteria Utama:</h4>
                                        <ul className="space-y-3">
                                            {type.requirements.map((r, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[12px] text-muted-foreground italic border-l border-border pl-4">
                                                    <span>{r}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TERMS & SANCTIONS --- */}
            <section className="py-24 bg-card border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Terms */}
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter">Syarat & Ketentuan</h2>
                                <div className="w-16 h-1 bg-secondary" />
                            </div>
                            <div className="grid gap-6">
                                {[
                                    "Mengisi formulir aplikasi dan melengkapi seluruh dokumen penunjang.",
                                    "Memenuhi kriteria IPK minimal (2.75 - 3.00) sesuai jenis beasiswa.",
                                    "Mengikuti evaluasi berkala setiap semester oleh Unit Beasiswa.",
                                    "Bersedia mematuhi peraturan asrama dan tata tertib kampus STTB.",
                                    "Lulus dalam tahapan wawancara khusus dengan tim seleksi beasiswa."
                                ].map((text, i) => (
                                    <div key={i} className="flex gap-5 p-6 bg-background border border-border rounded-sm group hover:border-secondary transition-all">
                                        <span className="text-lg font-serif italic text-secondary font-bold">0{i + 1}</span>
                                        <p className="text-[13px] text-muted-foreground italic leading-relaxed">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sanctions */}
                        <div className="bg-primary p-10 md:p-16 rounded-sm text-primary-foreground relative overflow-hidden shadow-2xl">
                            <AlertTriangle className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5" />
                            <div className="relative z-10 space-y-12">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 text-secondary">
                                        <AlertTriangle size={20} />
                                        <h3 className="font-bold uppercase tracking-widest text-xs">Sanksi & Pelanggaran</h3>
                                    </div>
                                    <h2 className="text-3xl font-bold font-serif uppercase tracking-tighter leading-tight">Konsekuensi <br /> Ketidakpatuhan</h2>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px]">Pelanggaran Peraturan STTB:</h4>
                                        <ul className="space-y-4 text-[13px] text-primary-foreground/70 italic leading-relaxed">
                                            <li className="flex gap-4"><div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" /> Dana beasiswa akan diberhentikan pada semester berjalan.</li>
                                            <li className="flex gap-4"><div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" /> Wajib mengembalikan seluruh dukungan beasiswa yang telah diterima.</li>
                                            <li className="flex gap-4"><div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" /> Skorsing akademik selama 1 semester penuh.</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px]">Ketentuan Akademik:</h4>
                                        <p className="text-[13px] text-primary-foreground/70 italic leading-relaxed">
                                            Apabila mahasiswa tidak memenuhi standar IPK minimal (2.75 pada Sem 1 atau 3.00 pada Sem 2), maka dana beasiswa akan diberhentikan secara otomatis pada semester tersebut.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">FAQ Beasiswa</h2>
                            <h3 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter">Informasi Tambahan</h3>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border border-border rounded-sm bg-card overflow-hidden transition-all">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-all group"
                                    >
                                        <span className={`text-[13px] font-bold uppercase tracking-tight transition-colors ${openFaq === idx ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
                                            {faq.q}
                                        </span>
                                        <ChevronDown size={18} className={`text-secondary transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                                        <div className="p-6 pt-0 text-[13px] text-muted-foreground leading-relaxed italic border-t border-border/50">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DOWNLOAD SECTION --- */}
            <section className="py-24 bg-muted/30 border-t border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-card border border-border p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 rounded-sm shadow-xl">
                        <div className="space-y-6 flex-1 text-center md:text-left">
                            <h3 className="text-3xl font-black font-serif text-primary uppercase tracking-tighter">Formulir Pengajuan</h3>
                            <p className="text-muted-foreground text-sm italic leading-relaxed max-w-md">
                                Silahkan unduh formulir sesuai jenjang studi Anda dan kirimkan kembali via email ke <span className="text-primary font-bold">beasiswa@sttb.ac.id</span>.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button className="flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 transition-all shadow-lg">
                                <Download size={16} className="text-secondary" /> Unduh Form S1
                            </button>
                            <button className="flex items-center justify-center gap-3 px-10 py-4 border border-border text-primary font-black uppercase tracking-widest text-[10px] rounded-sm hover:bg-muted transition-all">
                                <Download size={16} className="text-secondary" /> Unduh Form S2
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER INFO --- */}
            <div className="container mx-auto px-6 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest gap-4">
                <div className="flex items-center gap-3">
                    <History size={14} className="text-secondary" />
                    <span>Evaluasi dilakukan setiap semester</span>
                </div>
                <div className="flex gap-8">
                    <p>WA: 0815 7127 228</p>
                    <p>beasiswa@sttb.ac.id</p>
                </div>
                <p>sttb.ac.id</p>
            </div>
        </div>
    );
};

export default BeasiswaPage;