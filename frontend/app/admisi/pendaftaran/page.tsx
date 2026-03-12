'use client'
import React from 'react';
import {
    Download,
    Laptop,
    Calendar,
    ClipboardList,
    HelpCircle,
    ArrowRight,
    MessageCircle,
    Mail,
    LogIn,
    ShieldCheck,
    GraduationCap
} from 'lucide-react';

const programs = [
    "S1 Ilmu Teologi",
    "S1 Sarjana Pendidikan Kristen",
    "S2 Magister Pendidikan Kristen",
    "S2 Magister Teologi",
    "S2 M.Min in Marketplace",
    "S2 M.Min in Pastoral Leadership",
    "S2 M.Min in Theology and Church Ministry"
];

const infoLinks = [
    { label: "Jadwal Admisi", icon: <Calendar size={20} />, href: "/admisi/jadwal" },
    { label: "Prosedur Admisi", icon: <ClipboardList size={20} />, href: "/admisi/prosedur" },
    { label: "Petunjuk Pendaftaran", icon: <HelpCircle size={20} />, href: "/admisi/faq" }
];

const PendaftaranPage: React.FC = () => {
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
                            <Laptop size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">SIS PMB STTB</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Registrasi Penerimaan <br />
                            <span className="text-secondary italic">Mahasiswa Baru</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Selamat Datang di Portal Resmi Pendaftaran STT Bandung."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CORE SELECTION: NEW VS EXISTING --- */}
            <section className="py-20 -mt-12 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                        {/* LEFT: LOGIN FOR EXISTING USERS */}
                        <div className="bg-card border border-border rounded-sm p-10 flex flex-col justify-center space-y-8 shadow-xl shadow-foreground/5 group">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-primary uppercase tracking-tighter font-serif">Punya Akun?</h3>
                                <p className="text-muted-foreground text-sm italic leading-relaxed">
                                    Silahkan Login apabila Anda sudah mendaftar sebelumnya. Gunakan username dan password yang telah diberikan oleh sistem.
                                </p>
                            </div>
                            <a
                                href="https://sis.sttb.ac.id/pmb"
                                className="inline-flex items-center justify-between w-full px-8 py-5 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs rounded-sm hover:opacity-90 transition-all group-hover:shadow-lg shadow-primary/20 no-underline"
                            >
                                <span className="flex items-center gap-3"><LogIn size={18} className="text-secondary" /> Masuk ke Akun PMB</span>
                                <ArrowRight size={18} />
                            </a>
                        </div>

                        {/* RIGHT: CHOOSE REGISTRATION TYPE */}
                        <div className="bg-primary text-primary-foreground rounded-sm p-10 space-y-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <ClipboardList size={200} />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-2xl font-bold text-secondary uppercase tracking-tighter font-serif">Belum Terdaftar?</h3>
                                <p className="text-primary-foreground/70 text-sm italic leading-relaxed">
                                    Pilih metode pendaftaran yang paling memudahkan Anda untuk bergabung bersama kami.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                                <a
                                    href="https://sis.sttb.ac.id/pmb/formulir-pendaftaran.html"
                                    className="bg-primary-foreground/10 border border-primary-foreground/20 p-6 rounded-sm hover:bg-secondary hover:text-secondary-foreground transition-all flex flex-col gap-4 no-underline group/btn"
                                >
                                    <Laptop size={32} className="text-secondary group-hover/btn:text-primary-foreground" />
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Daftar Online</h4>
                                        <p className="text-[10px] opacity-70 leading-tight">Pengisian formulir & berkas via web.</p>
                                    </div>
                                </a>
                                <button className="bg-primary-foreground/10 border border-primary-foreground/20 p-6 rounded-sm hover:bg-secondary hover:text-secondary-foreground transition-all flex flex-col gap-4 text-left group/btn">
                                    <Download size={32} className="text-secondary group-hover/btn:text-primary-foreground" />
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Daftar Manual</h4>
                                        <p className="text-[10px] opacity-70 leading-tight">Unduh form & kirim berkas hardcopy.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- INFORMATION GRID --- */}
            <section className="py-20 bg-muted/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Informasi Dasar</h2>
                        <h3 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter">Pusat Informasi Admisi</h3>
                        <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {infoLinks.map((info, idx) => (
                            <a
                                key={idx}
                                href={info.href}
                                className="bg-card border border-border p-8 rounded-sm hover:border-secondary transition-all group flex flex-col items-center text-center space-y-4 no-underline shadow-sm hover:shadow-xl"
                            >
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    {info.icon}
                                </div>
                                <h4 className="font-bold text-primary uppercase tracking-widest text-[11px] group-hover:text-secondary transition-colors">
                                    {info.label}
                                </h4>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROGRAMS LIST --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-block px-4 py-1 bg-primary/5 border-l-4 border-primary">
                                    <span className="text-primary font-bold uppercase tracking-widest text-[10px]">7 Program Studi</span>
                                </div>
                                <h2 className="text-4xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">
                                    Pilihan <br /> Akademik
                                </h2>
                                <p className="text-muted-foreground text-sm italic leading-relaxed">
                                    Pilihlah program studi yang sesuai dengan panggilan pelayanan dan aspirasi akademik Anda.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 gap-4 w-full">
                            {programs.map((p, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-card border border-border hover:bg-muted/30 transition-all rounded-sm group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground group-hover:border-secondary group-hover:text-primary transition-all">
                                            {i + 1}
                                        </div>
                                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight uppercase">
                                            {p}
                                        </span>
                                    </div>
                                    <ArrowRight size={16} className="text-border group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SUPPORT / BANTUAN --- */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Bantuan</h2>
                            <h3 className="text-4xl font-bold font-serif uppercase tracking-tighter text-primary-foreground">Hubungi Tim Admisi</h3>
                            <p className="text-primary-foreground/60 italic text-sm">Butuh bantuan teknis pendaftaran? Kami siap melayani Anda.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <a
                                href="https://wa.me/6281573360009"
                                className="bg-primary-foreground/5 border border-primary-foreground/10 p-10 rounded-sm hover:bg-secondary hover:text-secondary-foreground transition-all group no-underline flex items-center gap-6"
                            >
                                <div className="p-4 bg-primary rounded-sm border border-primary-foreground/10 group-hover:bg-primary-foreground group-hover:text-primary">
                                    <MessageCircle size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-1">WhatsApp Support</h4>
                                    <p className="text-[11px] font-mono text-secondary group-hover:text-primary-foreground">0815 7336 0009</p>
                                </div>
                            </a>

                            <a
                                href="mailto:admisi@sttb.ac.id"
                                className="bg-primary-foreground/5 border border-primary-foreground/10 p-10 rounded-sm hover:bg-secondary hover:text-secondary-foreground transition-all group no-underline flex items-center gap-6"
                            >
                                <div className="p-4 bg-primary rounded-sm border border-primary-foreground/10 group-hover:bg-primary-foreground group-hover:text-primary">
                                    <Mail size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-1">Email Support</h4>
                                    <p className="text-[11px] font-mono text-secondary group-hover:text-primary-foreground">admisi@sttb.ac.id</p>
                                </div>
                            </a>
                        </div>

                        <div className="mt-20 pt-12 border-t border-primary-foreground/10 text-center">
                            <img src="https://sis.sttb.ac.id/images_siakad/metroui/logo-siakad.png" alt="STTB Logo" className="h-32 mx-auto object-contain opacity-50 grayscale hover:grayscale-0 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Decorative textures */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none rotate-3 scale-150">
                    <div className="grid grid-cols-12 h-full w-full">
                        {[...Array(144)].map((_, i) => (
                            <div key={i} className="border border-primary-foreground/20 aspect-square" />
                        ))}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendaftaranPage;