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
    ShieldCheck,
    Crown,
    Anchor
} from 'lucide-react';

const graduateProfile = [
    {
        id: "informed",
        title: "Informed",
        description: "Mampu mengkonstruksi landasan teologis yang sehat dan menguasai prinsip-prinsip kepemimpinan strategis bagi pertumbuhan gereja.",
        icon: <BookOpen size={28} />
    },
    {
        id: "transformed",
        title: "Transformed",
        description: "Pemimpin yang memiliki integritas Alkitabiah, karakter yang teruji, serta kedewasaan spiritual dalam memimpin umat Allah.",
        icon: <UserCheck size={28} />
    },
    {
        id: "transformative",
        title: "Transformative",
        description: "Mampu menjadi agen transformasi yang memimpin gereja dan lembaga pelayanan untuk berdampak bagi masyarakat urban.",
        icon: <Zap size={28} />
    }
];

const curriculumCategories = [
    {
        name: "Matakuliah Dasar",
        sks: 9,
        items: [
            "Hermeneutika Alkitab Lanjutan (3 SKS)",
            "Teologi Kontemporer (3 SKS)",
            "Metode Penelitian (3 SKS)"
        ]
    },
    {
        name: "Inti Konsentrasi",
        sks: 18,
        items: [
            "Teologi Kepemimpinan Pastoral (3 SKS)",
            "Manajemen & Administrasi Gereja (3 SKS)",
            "Etika Kepemimpinan Kristen (3 SKS)",
            "Pengembangan Organisasi Gereja (3 SKS)",
            "Konseling Pastoral Lanjutan (3 SKS)",
            "Teologi Penggembalaan (3 SKS)"
        ]
    },
    {
        name: "Matakuliah Pilihan",
        sks: 6,
        items: [
            "Homiletika Lanjutan (3 SKS)",
            "Manajemen Konflik & Negosiasi (3 SKS)",
            "Pilihan Bebas Lainnya (3 SKS)"
        ]
    },
    {
        name: "Tugas Akhir",
        sks: 9,
        items: [
            "Tesis / Proyek Kepemimpinan Strategis (9 SKS)"
        ]
    }
];

const S2KepemimpinanPastoralPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1); // Default to Inti Konsentrasi

    return (
        <div className="bg-background min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="relative w-full min-h-[60vh] flex items-center bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                        alt="Leadership Seminar Background"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 py-20">
                    <div className="max-w-4xl space-y-8">
                        <div className="inline-flex items-center space-x-3 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full">
                            <Crown size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Program Pascasarjana (S2)</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-primary-foreground font-serif uppercase tracking-tighter leading-none">
                            Magister <span className="text-secondary italic">Ministri</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-primary-foreground/80 font-bold uppercase tracking-[0.2em] -mt-4">
                            Konsentrasi Kepemimpinan Pastoral
                        </h2>

                        <div className="flex flex-wrap gap-8 pt-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center text-secondary">
                                    <GraduationCap size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-primary-foreground/50 tracking-widest leading-none mb-1">Gelar Lulusan</p>
                                    <p className="text-primary-foreground font-bold font-serif text-lg tracking-tight">Magister Ministri (M.Min.)</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 border-l border-primary-foreground/10 pl-8">
                                <div className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center text-secondary">
                                    <BookCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-primary-foreground/50 tracking-widest leading-none mb-1">Beban Studi</p>
                                    <p className="text-primary-foreground font-bold font-serif text-lg tracking-tight">42 SKS</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed italic border-l-4 border-secondary pl-6">
                            "Mempersiapkan gembala jemaat dan pemimpin lembaga kristen dengan kompetensi manajerial dan kedalaman pastoral yang relevan."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- GRADUATE PROFILE --- */}
            <section className="py-24 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs">Arah Pembentukan</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter">Profil Lulusan M.Min</h3>
                        <div className="w-20 h-1 bg-secondary mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {graduateProfile.map((profile) => (
                            <div key={profile.id} className="group relative p-10 border border-border bg-background hover:bg-primary transition-all duration-500 rounded-sm shadow-sm hover:shadow-xl">
                                <div className="w-14 h-14 bg-muted flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-secondary-foreground rounded-sm mb-8 transition-all duration-500 transform group-hover:rotate-6 shadow-sm border border-border/50">
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

            {/* --- SYSTEM INFO --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-muted/50 p-8 border border-border rounded-sm space-y-4">
                            <div className="flex items-center space-x-3 text-primary">
                                <Clock size={20} />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Masa Studi</h4>
                            </div>
                            <p className="text-[13px] text-muted-foreground leading-relaxed">
                                Normal studi ditempuh dalam waktu 2 tahun (4 semester) dengan fleksibilitas bagi praktisi pelayanan.
                            </p>
                        </div>
                        <div className="bg-muted/50 p-8 border border-border rounded-sm space-y-4">
                            <div className="flex items-center space-x-3 text-primary">
                                <Anchor size={20} />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Fokus Kepemimpinan</h4>
                            </div>
                            <p className="text-[13px] text-muted-foreground leading-relaxed italic border-l-2 border-secondary/30 pl-4">
                                Kurikulum dirancang khusus untuk meningkatkan kapasitas kepemimpinan strategis dalam mengelola organisasi gereja.
                            </p>
                        </div>
                        <div className="bg-muted/50 p-8 border border-border rounded-sm space-y-4">
                            <div className="flex items-center space-x-3 text-primary">
                                <ShieldCheck size={20} />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Akreditasi</h4>
                            </div>
                            <p className="text-[13px] text-muted-foreground leading-relaxed">
                                Terakreditasi BAN-PT dan mendapatkan pengakuan internasional dari ATA (Asian Theological Association).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CURRICULUM --- */}
            <section className="py-12 bg-background border-t border-border/50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-32">
                            <div>
                                <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs mb-4">Struktur Program</h2>
                                <h3 className="text-4xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">Kurikulum <br /> Kepemimpinan</h3>
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
                                    <div className="w-12 h-12 bg-primary text-secondary flex items-center justify-center rounded-full">
                                        <ScrollText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold font-serif text-primary uppercase tracking-tight">{curriculumCategories[activeTab].name}</h4>
                                        <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Total Kredit: {curriculumCategories[activeTab].sks} SKS</p>
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

            {/* --- ADMISSION --- */}
            <section className="py-24 bg-muted/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-primary text-primary-foreground rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 lg:p-16 space-y-8 bg-primary relative">
                            <Users className="absolute -right-10 -bottom-10 w-64 h-64 text-primary-foreground/5 rotate-12 pointer-events-none" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold font-serif uppercase tracking-tighter mb-8 text-secondary">Persyaratan S2 M.Min.</h3>
                                <ul className="space-y-6">
                                    {[
                                        "Lulusan S1 dari semua disiplin ilmu dari PT terakreditasi.",
                                        "Indeks Prestasi Kumulatif (IPK) S1 minimal 2.75.",
                                        "Memiliki pengalaman pelayanan gerejawi minimal 2 tahun.",
                                        "Lulus Tes Potensi Akademik (TPA) & wawancara admisi.",
                                        "Menyerahkan surat rekomendasi dari pimpinan sinode atau gereja lokal."
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
                            <h4 className="text-primary font-black font-serif text-3xl uppercase tracking-tighter mb-4">Pimpin Gereja <br /> Anda</h4>
                            <p className="text-muted-foreground text-xs italic mb-10 max-w-xs">
                                "Tingkatkan kapasitas manajerial dan penggembalaan Anda melalui program M.Min. STTB."
                            </p>
                            <div className="flex flex-col w-full gap-4">
                                <a href="/admission" className="w-full bg-secondary text-secondary-foreground py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all shadow-lg no-underline">
                                    Daftar Sekarang
                                </a>
                                <button className="w-full border border-border text-primary py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-muted transition-all">
                                    Konsultasi Program
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default S2KepemimpinanPastoralPage;