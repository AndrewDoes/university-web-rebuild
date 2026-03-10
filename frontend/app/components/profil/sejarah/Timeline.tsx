'use client'
import React, { useState, useEffect } from 'react';
import { History, Milestone, Award, Building2, Globe, Users, ChevronRight } from 'lucide-react';

const historyData = [
    {
        period: "1992 - 1998",
        title: "Peletakan Batu Pertama & Fondasi Akademik",
        description: "Pdt. Caleb Tong, Pdt. Joseph Tong, dan Pdt. Dorothy I. Marx mendirikan STTB pada tahun 1992 untuk menghasilkan Pastor-Scholar Reformed Injili. Pdt. Daniel Lucas Lukito sebagai Dekan Akademik pertama berperan besar meletakkan kerangka pembangunan. Wisuda pertama diadakan pada tahun 1996.",
        icon: <Milestone size={20} />,
        highlights: ["Wisuda Perdana (1996)", "Event Ferakristal Pertama", "Penerbitan Jurnal STULOS"]
    },
    {
        period: "1999 - 2005",
        title: "Ekspansi Program Pascasarjana & Infrastruktur",
        description: "Di bawah kepemimpinan Ibu Dorothy I. Marx sebagai Rektor, STTB membuka program M.A. dan M.Th. Pembangunan asrama dosen berdampingan dengan asrama mahasiswa dilakukan. Mulai menerbitkan seri buku 'Sola...' dan menyelenggarakan acara nasional CYLF.",
        icon: <Building2 size={20} />,
        highlights: ["Pembukaan M.A. & M.Th.", "Pembangunan Asrama", "Inisiasi CYLF"]
    },
    {
        period: "2006 - 2010",
        title: "Internasionalisasi & Pengembangan Dosen",
        description: "Pdt. Joseph Tong fokus pada peningkatan kualifikasi dosen dengan mengirimkan staf studi ke USA. STTB membuka program bahasa Mandarin (S.Th, M.Div, M.A.) dengan menghadirkan dosen tamu dari Taiwan seperti Pdt. Lee Ching Yen dan Pdt. Joseph Lin.",
        icon: <Globe size={20} />,
        highlights: ["Program Bahasa Mandarin", "Studi Dosen ke USA", "Buku Sola Scriptura & Sola Fide"]
    },
    {
        period: "2011 - 2016",
        title: "Transformasi Kampus & Akreditasi Global",
        description: "Pdt. Agus Gunawan memimpin pembangunan gedung baru berlantai tujuh (2011). Akreditasi diraih dari BAN-PT dan ATA (Asian Theological Association). STTB memperluas jejaring global dengan dosen dari Inggris, India, dan Filipina, serta menyelenggarakan M.Th berbahasa Inggris.",
        icon: <Award size={20} />,
        highlights: ["Gedung 7 Lantai (2011)", "Akreditasi BAN-PT & ATA", "M.Th Global Class"]
    },
    {
        period: "2017 - 2022",
        title: "Inovasi Digital & Kepemimpinan Transformatif",
        description: "Pembenahan kualitas dan penajaman arah pengembangan program studi formal dan non-formal. Inisiasi LEAD Center untuk pendidikan non-formal dan adaptasi budaya digital selama pandemi. Estafet kepemimpinan dari Pdt. Chandra Koewoso ke Sutrisna Harjanto, PhD.",
        icon: <Users size={20} />,
        highlights: ["LEAD Center", "Pendidikan Digital", "Kepemimpinan Baru"]
    }
];

const Timeline = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-background min-h-screen pt-20">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-12 h-full w-full opacity-20">
                        {isMounted && [...Array(24)].map((_, i) => (
                            <div key={i} className="border-r border-primary-foreground/20 h-full" />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-secondary">
                        <History size={24} />
                        <span className="font-bold tracking-[0.4em] uppercase text-xs">Profil Institusi</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                        Sejarah <br /> <span className="text-secondary italic">Perjalanan Kami</span>
                    </h1>
                    <p className="text-primary-foreground/60 max-w-2xl mt-8 text-sm md:text-base leading-relaxed italic border-l-2 border-secondary/50 pl-6">
                        "Mengingat kembali pimpinan Tuhan selama lebih dari tiga dekade dalam membentuk pemimpin yang setia dan kompeten bagi Kerajaan Allah."
                    </p>
                </div>
            </div>

            {/* --- TIMELINE SECTION --- */}
            <div className="container mx-auto px-6 py-24 relative">
                <div className="absolute left-6 lg:left-1/2 top-24 bottom-24 w-0.5 bg-border lg:-translate-x-1/2" />

                <div className="space-y-16 lg:space-y-24">
                    {historyData.map((item, index) => (
                        <div key={index} className={`relative flex flex-col lg:flex-row items-start ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Milestone Dot */}
                            <div className="absolute left-0 lg:left-1/2 w-12 h-12 bg-background border-4 border-primary rounded-full z-20 flex items-center justify-center text-secondary lg:-translate-x-1/2 -translate-y-2 shadow-lg">
                                {item.icon}
                            </div>

                            {/* Content Card */}
                            <div className={`w-full lg:w-[45%] pl-16 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                                <div className="group bg-card border border-border p-6 md:p-8 rounded-sm hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 relative">
                                    {/* Date Badge */}
                                    <div className="inline-block bg-primary text-primary-foreground px-4 py-1 mb-4 rounded-sm text-[10px] font-bold tracking-[0.2em] shadow-lg">
                                        {item.period}
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-primary mb-4 font-serif leading-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-muted-foreground text-[12px] md:text-[13px] leading-relaxed italic mb-6">
                                        "{item.description}"
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                                        {item.highlights.map((tag, i) => (
                                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-secondary bg-secondary/5 border border-secondary/10 px-2 py-0.5 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={`absolute top-0 bottom-0 w-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity ${index % 2 === 0 ? 'right-0' : 'left-0'}`} />
                                </div>
                            </div>

                            <div className="hidden lg:block lg:w-[45%]" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                body {
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
}

export default Timeline
