'use client'
import React, { useState } from 'react';
import {
    Target,
    Compass,
    ShieldCheck,
    HeartPulse,
    Users,
    BookOpen,
    ChevronDown,
    Cross,
    Globe,
    Zap,
    Scale,
    Star
} from 'lucide-react';

const visionPillars = [
    {
        title: "Pastor-Scholar",
        description: "Memiliki jiwa gembala (kepemimpinan yang melayani di gereja, dunia, pendidikan, maupun profesi lain) dan sekaligus pembelajar (semangat untuk terus belajar, daya nalar kritis seorang intelektual Kristen, dan kemampuan berkontribusi terhadap dunia ilmu pengetahuan dari perspektif Kristen)."
    },
    {
        title: "Berita Injil yang utuh",
        description: "Kuasa penebusan Kristus dinyatakan melalui hidup setiap pengikut Kristus, di tengah keluarga, gereja, dan masyarakat."
    },
    {
        title: "Seluruh umat Allah",
        description: "Pelayanan bukan hanya tugas segelintir orang, melainkan panggilan seluruh jemaat untuk menjadi garam dan terang di berbagai bidang kehidupan."
    },
    {
        title: "Masyarakat urban",
        description: "Mahasiswa STTB dipersiapkan dengan fokus melayani masyarakat di perkotaan, tanpa menutup kemungkinan tuntutan lain yang Tuhan berikan kepada mereka di tempat lain."
    }
];

const coreValues = [
    {
        title: "Christ Centered",
        icon: <Cross size={24} />,
        description: "Bersama keselamatan Allah atas seluruh dunia yang terwujud di dalam karya penebusan Kristus. Mandat budaya dan mandat Injil dalam kerangka meta-narasi Alkitab: Penciptaan, Kejatuhan, Penebusan, Penggenapan."
    },
    {
        title: "Teks - Konteks",
        icon: <BookOpen size={24} />,
        description: "Setia kepada teks Firman Tuhan dan warisan iman Bapa-Bapa Gereja. Responsif terhadap konteks sosial dan generasional yang terus berubah."
    },
    {
        title: "Penatalayanan",
        icon: <Scale size={24} />,
        description: "Integritas (kejujuran, transparansi, akuntabilitas waktu, uang, relasi). Dedikasi (loyalitas dan tanggung jawab terhadap tugas bagi sesama). Kompetensi (kecakapan akademik, pelayanan, dan manajerial)."
    },
    {
        title: "Transformatif",
        icon: <Zap size={24} />,
        description: "Karya penebusan Kristus yang transformatif dialami oleh semua stakeholder STTB (mahasiswa, dosen, staf, karyawan, yayasan, mitra pelayanan, gereja, dan masyarakat)."
    }
];

const VisiMisiPage: React.FC = () => {
    const [openPillar, setOpenPillar] = useState<number | null>(null);

    return (
        <div className="bg-background min-h-screen">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-24 lg:py-32 top-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-secondary">
                        <Target size={20} />
                        <span className="font-bold tracking-[0.4em] uppercase text-xs">Identity & Foundation</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                        Visi & <span className="text-secondary italic">Misi</span>
                    </h1>
                </div>
            </div>

            {/* --- VISION SECTION --- */}
            <section className="py-24 border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 space-y-8">
                            <div className="inline-block px-4 py-1 bg-primary/5 border-l-4 border-primary">
                                <span className="text-primary font-bold uppercase tracking-widest text-xs">Visi Kami</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-[1.1] tracking-tighter uppercase">
                                Menjadi institusi <br /> pendidikan teologi <br /> yang mempersiapkan <br />
                                <span className="text-secondary">Pastor-Scholar</span>
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic pr-12">
                                "...yang transformatif dan memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban."
                            </p>
                        </div>

                        {/* Vision Accordion (The 4 Pillars) */}
                        <div className="lg:col-span-7 space-y-4">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6">Definisi Visi</p>
                            {visionPillars.map((pillar, index) => (
                                <div
                                    key={index}
                                    className="border border-border rounded-sm overflow-hidden bg-card hover:scale-102 transition-all"
                                >
                                    <button
                                        onClick={() => setOpenPillar(openPillar === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                                    >
                                        <span className="text-sm md:text-base font-bold text-primary uppercase tracking-widest flex items-center">
                                            <span className="text-secondary mr-4 font-serif italic text-xl">0{index + 1}</span>
                                            {pillar.title}
                                        </span>
                                        <ChevronDown size={20} className={`text-secondary transition-transform duration-300 ${openPillar === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out ${openPillar === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                        <div className="p-6 pt-0 text-[12px] md:text-[13px] text-muted-foreground leading-relaxed italic border-t border-border/50">
                                            {pillar.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MISSION SECTION --- */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center space-x-3 mb-4">
                                <div className="w-12 h-px bg-secondary" />
                                <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs">Misi Institusi</h2>
                                <div className="w-12 h-px bg-secondary" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter">Langkah Strategis Kami</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                "Mempersiapkan pastor-scholar yang transformatif untuk melayani dalam konteks urban.",
                                "Memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban melalui penelitian dan pendidikan non-formal.",
                                "Mengembangkan tim dosen, struktur organisasi dan keuangan, serta kemitraan untuk mendukung pencapaian visi STTB."
                            ].map((misi, i) => (
                                <div key={i} className="flex gap-6 p-8 bg-card border border-border rounded-sm hover:border-secondary transition-all group shadow-sm">
                                    <div className="shrink-0 w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-full font-bold text-sm group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm md:text-base font-medium text-foreground leading-relaxed italic">
                                        "{misi}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CORE VALUES GRID --- */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black font-serif text-primary uppercase tracking-tighter opacity-10 absolute left-1/2 -translate-x-1/2 -translate-y-12 select-none">Core Values</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter relative z-10">Nilai-Nilai Dasar</h3>
                        <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, index) => (
                            <div key={index} className="group p-8 border border-border bg-card hover:bg-primary transition-all duration-500 rounded-sm">
                                <div className="w-14 h-14 bg-muted flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-secondary-foreground rounded-sm mb-8 transition-all duration-500 transform group-hover:rotate-6">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-bold text-primary group-hover:text-primary-foreground mb-4 uppercase tracking-widest font-serif">
                                    {value.title}
                                </h4>
                                <p className="text-[12px] leading-relaxed italic text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MOTTO SECTION --- */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-10 inline-block p-4 border border-secondary/30 rounded-full">
                            <Star className="text-secondary animate-pulse" size={32} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black font-serif text-primary-foreground uppercase tracking-tighter leading-tight mb-6">
                            DOMINO OPTIMO MAXIMO
                        </h2>
                        <div className="flex items-center justify-center space-x-4 mb-8">
                            <div className="w-12 h-px bg-secondary" />
                            <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs">Motto STTB</span>
                            <div className="w-12 h-px bg-secondary" />
                        </div>
                        <p className="text-primary-foreground/60 text-lg md:text-xl italic font-serif tracking-wide">
                            "To the Lord, the Best, the Great."
                        </p>
                    </div>
                </div>
                {/* Decorative textures */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </section>
        </div>
    );
};

export default VisiMisiPage;