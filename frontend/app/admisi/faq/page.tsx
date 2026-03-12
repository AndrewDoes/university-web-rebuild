'use client'
import React, { useState } from 'react';
import {
    HelpCircle,
    ChevronDown,
    BookOpen,
    GraduationCap,
    Wallet,
    Home,
    Briefcase,
    Search,
    ArrowRight,
    MessageCircle,
    Info,
    CheckCircle2,
    Clock,
    Target,
    Users,
    Users2,
    Compass
} from 'lucide-react';

const faqCategories = [
    { id: 's1', label: 'Studi S1', icon: <GraduationCap size={18} /> },
    { id: 's2', label: 'Studi S2', icon: <BookOpen size={18} /> },
    { id: 'general', label: 'Pertanyaan Umum', icon: <HelpCircle size={18} /> }
];

const faqs = {
    s1: [
        {
            q: "Saya ingin menjadi Hamba Tuhan secara full time, prodi mana yang tepat?",
            a: "Bagi Anda yang lulus SMA/diploma maka kami menyarankan Anda memilih program Sarjana Teologi (S.Th.). Namun, jika sinode gereja tempat Anda melayani nantinya tidak mengharuskan lulusan S.Th. untuk melayani sebagai pendeta, Anda juga dapat memilih program Sarjana Pendidikan Kristen."
        },
        {
            q: "Saya ingin menjadi guru agama atau guru di sekolah Kristen?",
            a: "Kami menyarankan Anda untuk mengambil program studi Sarjana Pendidikan Kristen (S.Pd.). Meskipun lulusan Sarjana Teologi (S.Th.) dibekali ilmu pendidikan, prodi S.Pd. memiliki muatan ilmu-ilmu pendidikan yang jauh lebih mendalam dan spesifik untuk karier guru."
        },
        {
            q: "Apakah dengan studi S1 di seminari dapat bekerja di lingkungan non-gereja?",
            a: "Ya, baik lulusan Sarjana Teologi (S.Th.) maupun Sarjana Pendidikan Kristen (S.Pd.) dapat bekerja di lingkungan non-gereja atau non-sekolah Kristen. Kami menyarankan Anda mempertimbangkan panggilan dan rencana pelayanan sebelum memutuskan masuk ke seminari."
        }
    ],
    s2: [
        {
            q: "Saya ingin berkarir dalam hal akademik atau pendidikan teologi?",
            a: "Kami menyarankan Anda untuk memilih program studi Magister Pendidikan (M.Pd.) untuk fokus pada metode pembelajaran, atau Magister Teologi (M.Th.) jika ingin menjadi dosen teologi atau mengambil jenjang Doktoral (S3) di masa depan."
        },
        {
            q: "Saya ingin menjadi Hamba Tuhan full time tapi saya lulusan S1 Umum?",
            a: "Bagi lulusan S1 Umum, kami menyarankan program Magister Teologi (M.Th.) melalui jalur matrikulasi. Khusus bagi lulusan Sarjana Pendidikan Kristen (PAK) dari STTB, Anda dapat mengambil program M.Th. tanpa mengikuti jalur matrikulasi."
        },
        {
            q: "Saya ingin mengintegrasikan iman Kristen dalam karier sekuler saya?",
            a: "Program yang paling tepat adalah Magister Ministri Pelayanan Marketplace (M.Min. Marketplace). Program ini menekankan pengajaran teologi sekaligus memberikan ilmu praktis untuk melayani pemuridan di dunia kerja."
        }
    ],
    general: [
        {
            q: "Apakah STTB menyediakan beasiswa?",
            a: "STTB menyediakan beasiswa terbatas baik untuk program Sarjana maupun Magister. Anda dapat bertanya langsung kepada Staf Beasiswa kami di nomor HP: +62 815-7127-228 atau melalui email: beasiswa@sttb.ac.id."
        },
        {
            q: "Apakah perkuliahan dilaksanakan secara online sampai lulus?",
            a: "Program Sarjana menggunakan sistem hybrid learning ( onsite bagi yang di asrama, online bagi yang sudah berkeluarga). Program Magister saat ini sedang dalam transisi menuju hybrid learning setelah sebelumnya full online selama pandemi."
        },
        {
            q: "Apakah saya dapat bekerja sambil kuliah?",
            a: "Untuk program Sarjana (S1) dan M.Th. Matrikulasi, bekerja tidak memungkinkan karena jadwal padat dan kewajiban asrama. Namun, untuk program M.Th., M.Pd., dan M.Min. yang menggunakan sistem block teaching, Anda dapat bekerja/melayani sambil studi."
        },
        {
            q: "Apakah saya harus tinggal di asrama?",
            a: "Mahasiswa S1 dan M.Th. Matrikulasi yang belum menikah WAJIB tinggal di asrama. Mahasiswa S2 dapat menginap di asrama hanya selama kelas intensif berlangsung dengan membayar biaya yang ditetapkan."
        }
    ]
};

const FAQPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('s1');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                            <HelpCircle size={14} className="text-secondary" />
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Support Center</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Frequently Asked <br /> <span className="text-secondary italic">Questions</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Temukan jawaban atas pertanyaan seputar pendaftaran, program studi, dan kehidupan kampus."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- QUICK NAV --- */}
            <section className="py-12 bg-card border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { label: "JADWAL", href: "/admisi/jadwal" },
                            { label: "PROSEDUR", href: "/admisi/prosedur" },
                            { label: "PERSYARATAN", href: "/admisi/persyaratan" }
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

            {/* --- NEW SECTION: MEMILIH PROGRAM STUDI (Based on Image Reference) --- */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-start gap-16">

                        {/* Decorative Left Image Frame */}
                        <div className="lg:w-2/5 w-full relative group">
                            <div className="relative aspect-square md:aspect-4/5 overflow-hidden rounded-sm border-12 border-card shadow-2xl transform lg:-rotate-2 group-hover:rotate-0 transition-transform duration-700">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl81mmgh1fkU_-vbUHKJkFNyfsGaTF-s9Hg&s"
                                    alt="Choosing Study Program"
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-secondary -z-10" />
                        </div>

                        {/* Content Right */}
                        <div className="lg:w-3/5 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-primary font-black font-serif text-3xl md:text-5xl tracking-tighter uppercase leading-none">
                                    Memilih Program <br /> <span className="text-secondary italic">Studi Yang Tepat</span>
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed border-l-4 border-secondary pl-6">
                                    "Memilih sebuah program studi S1 atau S2 adalah sebuah keputusan penting yang membutuhkan pertimbangan yang matang, sedikit riset pribadi, berdoa dan berkonsultasi dengan orang-orang yang tepat."
                                </p>
                            </div>

                            <div className="space-y-10">
                                {/* Points 1 */}
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                        <Target size={16} className="text-secondary" /> Hal-hal yang harus dipertimbangkan:
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Karunia kemampuan/talenta dan rencana pelayanan spesifik.",
                                            "Peluang tempat dan jenis pelayanan di masa depan.",
                                            "Isi kurikulum dan kualitas tim pengajar.",
                                            "Kemampuan finansial dan ketersediaan beasiswa.",
                                            "Manajemen waktu (terutama bagi mahasiswa S2).",
                                            "Komunitas belajar dan dukungan sosial seminari.",
                                            "Fasilitas riset, perpustakaan, dan jurnal online."
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[12px] text-muted-foreground italic leading-relaxed group">
                                                <CheckCircle2 size={14} className="text-secondary mt-0.5 shrink-0" />
                                                <span className="group-hover:text-primary transition-colors">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Points 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                                    <div className="space-y-4">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Berkonsultasi Dengan:</h4>
                                        <ul className="space-y-2">
                                            {["Hamba Tuhan di Gereja Anda", "Pembina atau Mentor Rohani", "Tim Admisi STT Bandung", "Keluarga & Atasan Kerja"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground italic">
                                                    <Users size={12} className="text-secondary" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Lakukan Riset Melalui:</h4>
                                        <ul className="space-y-2">
                                            {["Testimoni Alumni", "Open House STTB", "Website & Media Sosial Resmi"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground italic">
                                                    <Search size={12} className="text-secondary" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- FAQ INTERFACE --- */}
            <section className="py-24 bg-card border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-secondary font-black tracking-[0.4em] uppercase text-[10px]">FAQ Database</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter">Pertanyaan Populer</h3>
                        <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* LEFT: CATEGORY SELECTOR */}
                        <div className="lg:w-1/3 space-y-8">
                            <div className="flex flex-col gap-2">
                                {faqCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setActiveTab(cat.id);
                                            setOpenIndex(0);
                                        }}
                                        className={`flex items-center justify-between p-5 border rounded-sm transition-all text-left ${activeTab === cat.id
                                            ? "bg-primary border-primary text-primary-foreground shadow-xl translate-x-2"
                                            : "bg-background border-border text-muted-foreground hover:border-secondary"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={activeTab === cat.id ? "text-secondary" : "text-muted-foreground"}>
                                                {cat.icon}
                                            </span>
                                            <span className="text-[11px] font-black uppercase tracking-widest">{cat.label}</span>
                                        </div>
                                        <ArrowRight size={14} className={activeTab === cat.id ? "opacity-100" : "opacity-20"} />
                                    </button>
                                ))}
                            </div>

                            <div className="p-8 bg-muted/50 border border-border rounded-sm space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Info size={18} />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest">Layanan Informasi</h4>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                    Pertanyaan Anda belum terjawab? Silahkan gunakan tombol bantuan di bawah untuk terhubung langsung dengan tim kami.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: ACCORDION CONTENT */}
                        <div className="lg:w-2/3 space-y-4">
                            {(faqs[activeTab as keyof typeof faqs]).map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-sm transition-all duration-300 ${openIndex === index ? "bg-background border-secondary shadow-lg" : "bg-background border-border hover:border-secondary/40"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-start justify-between p-6 md:p-8 text-left group"
                                    >
                                        <span className={`text-sm md:text-base font-bold tracking-tight pr-6 transition-colors ${openIndex === index ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                            }`}>
                                            {faq.q}
                                        </span>
                                        <ChevronDown
                                            size={20}
                                            className={`text-secondary shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}>
                                        <div className="p-6 md:p-8 pt-0 border-t border-border/50 text-[13px] md:text-sm italic leading-relaxed text-muted-foreground bg-muted/20">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto bg-primary border border-primary-foreground/10 p-12 md:p-16 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 flex-1">
                            <h3 className="text-3xl md:text-4xl font-bold font-serif uppercase tracking-tighter text-secondary leading-none">Punya Pertanyaan Lain?</h3>
                            <p className="text-primary-foreground/70 text-sm italic leading-relaxed max-w-md">
                                "Jika Anda tidak menemukan jawaban yang dicari, tim pendukung kami siap membantu Anda secara langsung."
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Respon Cepat</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Info Akurat</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <a href="https://wa.me/6281573360009" className="px-10 py-4 bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 transition-all text-center no-underline shadow-lg flex items-center justify-center gap-3">
                                <MessageCircle size={16} /> WhatsApp Admisi
                            </a>
                            <a href="mailto:admisi@sttb.ac.id" className="px-10 py-4 border border-primary-foreground/20 text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-sm hover:bg-primary-foreground/10 transition-all text-center no-underline">
                                Hubungi via Email
                            </a>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-r border-primary-foreground h-full" />)}
                </div>
            </section>

            {/* --- LOCATION FOOTER --- */}
            <div className="bg-background py-8 border-t border-border">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest gap-4">
                    <p>Sekolah Tinggi Teologi Bandung</p>
                    <div className="flex gap-6">
                        <p>WA: 0815 7336 0009</p>
                        <p>official@sttb.ac.id</p>
                        <p>sttb.ac.id</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;