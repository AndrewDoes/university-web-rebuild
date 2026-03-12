'use client'
import React, { useState } from 'react';
import {
    BookOpen,
    UserCheck,
    Zap,
    GraduationCap,
    Clock,
    BookCheck,
    ScrollText,
    Award,
    FileSearch,
    Users,
    ArrowRight,
    CheckCircle2,
    Info,
    Home
} from 'lucide-react';

const graduateProfile = [
    {
        id: "informed",
        title: "Informed",
        description: "Pastor-scholar yang berpengetahuan luas and aplikatif terhadap tantangan perkembangan pelayanan gerejawi dalam konteks urban.",
        icon: <BookOpen size={28} />
    },
    {
        id: "transformed",
        title: "Transformed",
        description: "Pembelajar yang memiliki fondasi spiritualitas yang kokoh dan karakter yang matang.",
        icon: <UserCheck size={28} />
    },
    {
        id: "transformative",
        title: "Transformative",
        description: "Pastor-scholar yang berdampak bagi jemaat dan lingkungan tempatnya melayani.",
        icon: <Zap size={28} />
    }
];

const curriculumCategories = [
    {
        name: "Mata Kuliah Umum",
        sks: 14,
        items: [
            "Pancasila Dan Kewarganegaraan (2 SKS)",
            "Bahasa Indonesia (2 SKS)",
            "Bahasa Inggris Teologi (3 SKS)",
            "Metode Berpikir (2 SKS)",
            "Psikologi Perkembangan Masa Hidup (2 SKS)",
            "Metode Penulisan & Penelitian (3 SKS)"
        ]
    },
    {
        name: "Studi Biblika",
        sks: 34,
        items: [
            "Pengantar Alkitab dan Teologi Biblika (3 SKS)",
            "Studi PL 1: Kitab Taurat (3 SKS)",
            "Studi PL 2: Kitab Sejarah (3 SKS)",
            "Studi PL 3: Kitab Sastra (3 SKS)",
            "Studi PL 4: Kitab Nabi-nabi (3 SKS)",
            "Studi PB 1: Kitab Injil (3 SKS)",
            "Studi PB 2: Kis Para Rasul & Surat Paulus (3 SKS)",
            "Studi PB 3: Surat Umum & Wahyu (3 SKS)",
            "Hermeneutika Biblika (3 SKS)",
            "Bahasa Ibrani (3 SKS)",
            "Bahasa Yunani (2 SKS)",
            "Bahasa Yunani Lanjutan (2 SKS)"
        ]
    },
    {
        name: "Studi Teologi",
        sks: 23,
        items: [
            "Prolegomena & Doktrin Alkitab (3 SKS)",
            "Doktrin Allah, Penciptaan & Manusia (3 SKS)",
            "Doktrin Kristus, Dosa & Keselamatan (3 SKS)",
            "Doktrin Roh Kudus & Akhir Zaman (3 SKS)",
            "Doktrin Gereja (3 SKS)",
            "Apologetika (2 SKS)",
            "Etika Kristen (2 SKS)",
            "Teologi Reformed & Injili (3 SKS)"
        ]
    },
    {
        name: "Sejarah & Budaya",
        sks: 11,
        items: [
            "Sejarah Gereja Dunia (2 SKS)",
            "Sejarah Gereja Indonesia (2 SKS)",
            "Sejarah Teologi (3 SKS)",
            "Fenomenologi Agama (2 SKS)",
            "Iman & Kebudayaan (2 SKS)"
        ]
    },
    {
        name: "Praktika",
        sks: 42,
        items: [
            "Homiletika 1 & 2",
            "Konseling Pastoral Dasar & Issues",
            "Misiologi",
            "Kepemimpinan & Manajemen Gereja",
            "Pelayanan Anak, Kaum Muda, & Dewasa Transformatif",
            "Pemuridan Transformatif",
            "Perancangan Kurikulum & Media Pembelajaran"
        ]
    },
    {
        name: "Konsentrasi",
        sks: 9,
        items: [
            "Pemuridan & Misi: Gereja & Pengembangan Masyarakat, Mobilisasi Misi, Perancangan Kurikulum Pemuridan",
            "Pelayanan Anak: Spiritualitas Anak, Pelayanan Anak Urban, Pendidikan Anak Integral"
        ]
    },
    {
        name: "Tugas Akhir",
        sks: 6,
        items: [
            "Artikel Jurnal (3 SKS)",
            "Proyek: Merancang Program Pembinaan (3 SKS)"
        ]
    }
];

const S1TeologiPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className="bg-background min-h-screen font-sans">
            {/* --- HERO SECTION --- */}
            <section className="relative w-full min-h-[60vh] flex items-center bg-primary overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 py-20">
                    <div className="max-w-4xl space-y-8">
                        <div className="inline-flex items-center space-x-3 bg-primary-foreground/10 border border-secondary/30 px-4 py-1.5 rounded-full">
                            <Award size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Program Sarjana (S1)</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-primary-foreground font-serif uppercase tracking-tighter leading-none">
                            Sarjana <br /> <span className="text-secondary italic">Teologi</span>
                        </h1>

                        <div className="flex flex-wrap gap-8 pt-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center text-secondary">
                                    <GraduationCap size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-primary-foreground/50 tracking-widest leading-none mb-1">Gelar Lulusan</p>
                                    <p className="text-primary-foreground font-bold font-serif text-lg tracking-tight">Sarjana Teologi (S.Th.)</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 border-l border-primary-foreground/10 pl-8">
                                <div className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center text-secondary">
                                    <BookCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-primary-foreground/50 tracking-widest leading-none mb-1">Beban Studi</p>
                                    <p className="text-primary-foreground font-bold font-serif text-lg tracking-tight">148 SKS</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed italic border-l-4 border-secondary pl-6">
                            "Ditujukan untuk memperlengkapi mereka yang terpanggil untuk melayani sebagai rohaniwan penuh waktu di gereja, lembaga pelayanan, maupun ladang misi."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- GRADUATE PROFILE SECTION --- */}
            <section className="py-24 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs">Arah Pembentukan</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter">Profil Lulusan S.Th</h3>
                        <div className="w-20 h-1 bg-secondary mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {graduateProfile.map((profile) => (
                            <div key={profile.id} className="group relative p-10 border border-border bg-background hover:bg-primary transition-all duration-500 rounded-sm shadow-sm hover:shadow-xl">
                                <div className="w-14 h-14 bg-muted flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-secondary-foreground rounded-sm mb-8 transition-all duration-500 transform group-hover:rotate-6 border border-border/30">
                                    {profile.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-primary group-hover:text-primary-foreground mb-4 uppercase tracking-widest font-serif">
                                    {profile.title}
                                </h4>
                                <p className="text-[13px] leading-relaxed italic text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                                    "{profile.description}"
                                </p>
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PERKULIAHAN INFO BLOCKS --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-muted/50 p-8 border border-border rounded-sm space-y-4 shadow-sm">
                            <div className="flex items-center space-x-3 text-primary">
                                <Clock size={20} />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Masa Studi</h4>
                            </div>
                            <p className="text-[13px] text-muted-foreground leading-relaxed">
                                4 tahun full time: 3,5 tahun perkuliahan intensif di kampus + 6 bulan praktik pelayanan penuh di lapangan.
                            </p>
                        </div>
                        <div className="bg-muted/50 p-8 border border-border rounded-sm space-y-4 shadow-sm">
                            <div className="flex items-center space-x-3 text-primary">
                                <Users size={20} />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Sistem Perkuliahan</h4>
                            </div>
                            <p className="text-[13px] text-muted-foreground leading-relaxed italic border-l-2 border-secondary/30 pl-4">
                                Perkuliahan dilakukan secara <span className="font-bold text-primary italic">block teaching</span> selama 3 minggu yang diikuti dengan minggu pengerjaan tugas mandiri.
                            </p>
                        </div>
                        <div className="bg-muted/50 p-8 border border-border rounded-sm space-y-4 shadow-sm">
                            <div className="flex items-center space-x-3 text-primary">
                                <Home size={20} />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Kewajiban Asrama</h4>
                            </div>
                            <p className="text-[13px] text-muted-foreground leading-relaxed">
                                Mahasiswa yang belum menikah <span className="font-bold text-primary italic">wajib tinggal di asrama</span> untuk pembinaan formasi spiritualitas dan karakter.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CURRICULUM SECTION --- */}
            <section className="py-12 bg-background border-t border-border/50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-32">
                            <div>
                                <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs mb-4">Informasi Kurikulum</h2>
                                <h3 className="text-4xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">Daftar Mata <br /> Kuliah</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {curriculumCategories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTab(idx)}
                                        className={`w-full flex items-center justify-between p-4 border rounded-sm transition-all text-left ${activeTab === idx
                                            ? 'bg-primary border-primary text-primary-foreground shadow-xl translate-x-2'
                                            : 'bg-card border-border text-muted-foreground hover:border-secondary'
                                            }`}
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
                                        <span className={`text-[10px] font-bold ${activeTab === idx ? 'text-secondary' : 'text-primary'}`}>{cat.sks} SKS</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-2/3 w-full">
                            <div className="bg-card border border-border p-8 md:p-12 rounded-sm shadow-sm min-h-125">
                                <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-border/50">
                                    <div className="w-12 h-12 bg-primary text-secondary flex items-center justify-center rounded-full shadow-sm">
                                        <ScrollText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold font-serif text-primary uppercase tracking-tight">{curriculumCategories[activeTab].name}</h4>
                                        <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Beban Studi: {curriculumCategories[activeTab].sks} SKS</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {curriculumCategories[activeTab].items.map((item, i) => (
                                        <div key={i} className="flex items-center space-x-4 py-3 border-b border-border/30 last:border-0 group cursor-default">
                                            <div className="w-2 h-2 rounded-full bg-secondary opacity-40 group-hover:opacity-100 transition-opacity" />
                                            <span className="text-[13px] md:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ADMISSION REQUIREMENTS --- */}
            <section className="py-24 bg-muted/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-primary text-primary-foreground rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 lg:p-16 space-y-8 bg-primary relative">
                            <GraduationCap className="absolute -right-10 -bottom-10 w-64 h-64 text-primary-foreground/5 rotate-12 pointer-events-none" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold font-serif uppercase tracking-tighter mb-8 text-secondary">Persyaratan Pendaftaran</h3>
                                <ul className="space-y-6">
                                    {[
                                        "Minimal lulusan SMA / sederajat.",
                                        "Pernah terlibat pelayanan gerejawi / lembaga Kristen minimal 2 tahun.",
                                        "Memiliki panggilan jelas sebagai rohaniwan penuh waktu.",
                                        "Memiliki kemampuan dasar Bahasa Inggris yang baik (membaca & memahami teks).",
                                        "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB."
                                    ].map((req, i) => (
                                        <li key={i} className="flex items-start space-x-4">
                                            <div className="mt-1 shrink-0 text-secondary"><CheckCircle2 size={16} /></div>
                                            <span className="text-sm text-primary-foreground/80 leading-relaxed italic">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-12 lg:p-16 bg-card flex flex-col justify-center items-center text-center">
                            <h4 className="text-primary font-black font-serif text-3xl uppercase tracking-tighter mb-4">Mulai Pelayanan <br /> Anda</h4>
                            <p className="text-muted-foreground text-xs italic mb-10 max-w-xs">
                                "Satu semester terdiri dari 15x pertemuan termasuk evaluasi akademik yang komprehensif."
                            </p>
                            <div className="flex flex-col w-full gap-4">
                                <a href="/admission" className="w-full bg-secondary text-secondary-foreground py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all shadow-lg no-underline">
                                    Daftar Sekarang
                                </a>
                                <button className="w-full border border-border text-primary py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-muted transition-all">
                                    Unduh Kurikulum Lengkap (PDF)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default S1TeologiPage;