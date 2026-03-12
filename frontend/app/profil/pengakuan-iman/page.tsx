'use client'
import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    ChevronRight,
    MessageSquareQuote
} from 'lucide-react';

const beliefPoints = [
    {
        number: "1",
        content: "bahwa Alkitab secara keseluruhan, Perjanjian Lama dan Perjanjian Baru, adalah firman Allah yang diwahyukan dan diilhamkan tanpa kesalahan. Oleh karena itu, Alkitab adalah sumber otoritas tertinggi bagi iman dan kehidupan orang percaya di segala abad dan tempat."
    },
    {
        number: "2",
        content: "bahwa Allah adalah Esa dan kekal, Mahakudus, dan penuh rahmat. Ia adalah pencipta, penguasa, dan pemelihara alam semesta beserta segala isinya, Tritunggal sebagai Bapa, Anak, dan Roh Kudus. Masing-masing adalah Pribadi yang tidak diciptakan, sehakikat, dan setara dalam kuasa dan kemuliaan."
    },
    {
        number: "3",
        content: "bahwa manusia, laki-laki dan perempuan, telah diciptakan oleh Allah menurut gambar-Nya, yang telah dimahkotai-Nya dengan kemuliaan serta mandat untuk memenuhi bumi, mengelola dan memelihara seluruh ciptaan-Nya. Tetapi manusia telah jatuh ke dalam dosa, terpisah dari Allah, dan kehilangan kemampuan untuk hidup sesuai dengan citranya sebagai ciptaan Allah, sehingga tidak mampu menyelamatkan dirinya sendiri."
    },
    {
        number: "4",
        content: "bahwa Yesus Kristus adalah Anak Tunggal Allah, Allah sejati dan Manusia sejati, penebus dan satu-satunya jalan keselamatan bagi seluruh umat manusia. Ia dikandung dari Roh Kudus, lahir dari anak dara Maria, hidup tanpa dosa, sempurna dalam pengorbanan dan kasih. Ia mati di atas kayu salib, bangkit kembali dari antara orang mati dalam tubuh kebangkitan yang nyata, naik ke sorga, duduk di sebelah kanan Allah Bapa, menjadi Imam Besar Agung bagi orang percaya, dan pengantara tunggal antara Allah dan manusia, serta Raja di atas segala raja."
    },
    {
        number: "5",
        content: "bahwa Roh Kudus adalah Allah yang hidup, yang menginsafkan manusia akan dosa, kebenaran, dan penghakiman. Ia melahirkanbarukan orang berdosa yang percaya, mendiami, menguduskan, dan memberi kuasa serta karunia-karunia kepada setiap orang percaya menurut kehendak-Nya demi kesaksian, persekutuan, dan pelayanan untuk pembangunan tubuh Kristus."
    },
    {
        number: "6",
        content: "bahwa manusia hanya dapat diselamatkan oleh kasih karunia melalui penebusan oleh Tuhan Yesus Kristus dan dibenarkan melalui iman, tanpa jasa, usaha, ataupun kesalahan dari pihak manusia. Melalui penyelamatan Allah dalam Kristus, gambar Allah pada manusia dipulihkan. Dengan demikian, manusia dimampukan untuk menjalani kehidupan yang penuh tanggung jawab dalam pengabdian dan kasih di hadapan Allah dan manusia."
    },
    {
        number: "7",
        content: "bahwa Gereja selaku garam dan terang dunia adalah himpunan semua orang percaya dari segala abad dan bangsa. Ia adalah tubuh Kristus yang kudus dan Am, dengan Kristus sebagai Kepalanya. Gereja memberitakan Kerajaan Allah melalui kebaktian, pengajaran, sakramen baptisan dan perjamuan kudus, serta pemberitaan Injil dan misi umat Allah seutuhnya di tengah dunia."
    },
    {
        number: "8",
        content: "bahwa kepastian kedatangan kembali Yesus Kristus secara nyata dan pribadi akan terjadi pada akhir zaman untuk menjemput umat-Nya untuk menghakimi seluruh umat manusia, baik yang hidup maupun yang mati. Pada kedatangan-Nya kedua kali itulah setiap orang mati akan dibangkitkan, orang percaya masuk ke dalam kehidupan yang kekal, orang yang tidak percaya masuk ke dalam kebinasaan yang kekal."
    }
];

const PengakuanImanPage: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="bg-background min-h-screen">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-24 lg:py-32 overflow-hidden top-20">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-secondary">
                        <ShieldCheck size={20} />
                        <span className="font-bold tracking-[0.4em] uppercase text-xs">Doctrinal Foundation</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                        Pengakuan <span className="text-secondary italic">Iman STTB</span>
                    </h1>
                </div>
            </div>

            {/* --- MAIN CONTENT SECTION --- */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">

                        <div className="lg:w-1/3 space-y-12">
                            <div className="sticky top-32 space-y-12">
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1 bg-primary/5 border-l-4 border-primary">
                                        <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Credo</span>
                                    </div>
                                    <h2 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter leading-tight">
                                        Kami <br /> Percaya
                                    </h2>
                                    <p className="text-muted-foreground text-[13px] leading-relaxed italic border-b border-border pb-8">
                                        "Pernyataan iman ini merupakan intisari pengajaran Alkitabiah yang menjadi pegangan teguh bagi seluruh pelayanan akademis di STT Bandung."
                                    </p>
                                </div>

                                <div className="bg-muted/30 p-8 rounded-sm border border-border space-y-6">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Navigasi Profil</h4>
                                    <nav className="flex flex-col gap-4">
                                        {[
                                            { label: 'Sejarah Perjalanan', href: '/profil/sejarah' },
                                            { label: 'Visi & Misi Kami', href: '/profil/visi-misi' },
                                            { label: 'Mars STT Bandung', href: '/profil/mars-sttb' },
                                            { label: 'Dewan Pengajar', href: '/profil/dosen' }
                                        ].map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                className="group flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors no-underline"
                                            >
                                                <span>{link.label}</span>
                                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-secondary" />
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {beliefPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="group bg-primary p-8 md:p-10 rounded-sm shadow-xl transition-all duration-500 hover:-translate-y-1"
                                    >
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-black font-serif text-white uppercase tracking-tighter">
                                                {point.number}. Kami Percaya
                                            </h3>

                                            <p className="text-[13px] md:text-[14px] text-primary-foreground/80 leading-relaxed italic">
                                                {point.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className="bg-primary p-8 md:p-10 rounded-sm shadow-xl flex flex-col justify-center items-center text-center">
                                    <div className="space-y-1 mb-8">
                                        <div className="text-[10px] md:text-[11px] font-black tracking-[0.5em] text-secondary uppercase">D O M I N O</div>
                                        <div className="text-[10px] md:text-[11px] font-black tracking-[0.5em] text-secondary uppercase">O P T I M O</div>
                                        <div className="text-[10px] md:text-[11px] font-black tracking-[0.5em] text-secondary uppercase">M A X I M O</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-black text-white uppercase tracking-widest">TO THE LORD</div>
                                        <div className="text-sm font-black text-white uppercase tracking-widest">THE BEST</div>
                                        <div className="text-sm font-black text-white uppercase tracking-widest">THE GREATEST</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- MOTTO SECTION --- */}
            <section className="py-24 bg-card border-t border-border relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <div className="inline-block p-4 border border-secondary/30 rounded-full">
                            <MessageSquareQuote className="text-secondary animate-pulse" size={32} />
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black font-serif text-primary uppercase tracking-tighter leading-tight">
                                Sola Scriptura
                            </h2>
                            <div className="flex items-center justify-center space-x-4">
                                <div className="w-12 h-px bg-secondary" />
                                <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">Firman Tuhan Adalah Otoritas Tertinggi</span>
                                <div className="w-12 h-px bg-secondary" />
                            </div>
                        </div>

                        <p className="text-muted-foreground text-sm italic font-serif max-w-2xl mx-auto">
                            "Sebab itu jadilah penurut-penurut Allah, seperti anak-anak yang kekasih dan hiduplah di dalam kasih, sebagaimana Kristus Yesus juga telah mengasihi kamu."
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PengakuanImanPage;