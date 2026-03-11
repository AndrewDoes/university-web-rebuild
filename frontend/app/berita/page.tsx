'use client'
import React, { useState, useEffect, useMemo } from 'react';
import {
    Clock,
    Calendar,
    Tag,
    Search,
    ChevronRight,
    ArrowRight,
    Newspaper,
    Filter,
    ChevronLeft,
    Share2,
    BookOpen,
    CheckCircle2
} from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image: string;
    featured: boolean;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: "SENAT DOM Cup STTB 2026",
        date: "Feb 10, 2026",
        category: "Kemahasiswaan",
        excerpt: "SENAT STTB mengadakan DOM CUP 2026 sebagai wadah kreativitas dan sportivitas mahasiswa...",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Kunjungan dari Scholar Leaders",
        date: "Jan 28, 2026",
        category: "Institusi",
        excerpt: "Kunjungan dari Scholar Leaders ke Sekolah Tinggi Teologi Bandung untuk memperkuat kemitraan strategis...",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: 3,
        title: "Ibadah Pembukaan Semester Genap 2025/2026",
        date: "Jan 12, 2026",
        category: "Civitas",
        excerpt: "STTB mengadakan Ibadah pembukaan semester genap bersama seluruh civitas mahasiswa, staff dan dosen...",
        image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
        featured: false
    },
    {
        id: 4,
        title: "Kunjungan ECLAS International",
        date: "Oct 24, 2025",
        category: "Institusi",
        excerpt: "STT Bandung dipercaya mendapatkan Grand dari Templeton untuk mengerjakan project ECLAS (Equipping Christian Leadership)...",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
        featured: false
    },
    {
        id: 5,
        title: "Wisuda dan Dies Natalis ke XXXIII STTB 2025",
        date: "Oct 10, 2025",
        category: "Akademik",
        excerpt: "STT Bandung menyelenggarakan wisuda bagi program Sarjana (S.Th. & S.Pd.) angkatan 2021 serta program Magister...",
        image: "https://images.unsplash.com/photo-1523050853063-915894614232?q=80&w=2070&auto=format&fit=crop",
        featured: false
    },
    {
        id: 6,
        title: "Welcoming Alumni 2025",
        date: "Oct 10, 2025",
        category: "Alumni",
        excerpt: "Ikatan Alumni Nasional STTB menyambut alumni Angkatan 2021 dalam suasana penuh kebahagiaan...",
        image: "https://images.unsplash.com/photo-1529070538774-1843cbad2ad6?q=80&w=2070&auto=format&fit=crop",
        featured: false
    }
];

const ITEMS_PER_PAGE = 4;

const BeritaPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    // Calculate Dynamic Counts
    const categoryStats = useMemo(() => {
        const stats: Record<string, number> = { "Semua": newsData.length };
        newsData.forEach(item => {
            stats[item.category] = (stats[item.category] || 0) + 1;
        });
        return stats;
    }, []);

    const categoryList = Object.keys(categoryStats).sort((a, b) => (a === "Semua" ? -1 : b === "Semua" ? 1 : 0));

    // Filter Logic
    const filteredNews = useMemo(() => {
        return newsData.filter(news =>
            (activeCategory === "Semua" || news.category === activeCategory) &&
            (news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [activeCategory, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const paginatedNews = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredNews.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredNews, currentPage]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 5000);
    };

    if (!isMounted) return null;

    return (
        <div className="bg-background min-h-screen font-sans pt-20">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-12 h-full w-full opacity-20">
                        {[...Array(24)].map((_, i) => (
                            <div key={i} className="border-r border-primary-foreground/20 h-full" />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center space-x-3 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full text-secondary">
                            <Newspaper size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">News & Documentation</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                            Berita & <span className="text-secondary italic">Media</span>
                        </h1>
                        <p className="text-primary-foreground/70 text-lg md:text-xl italic leading-relaxed font-serif max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                            "Informasi terkini mengenai kegiatan akademik, kemahasiswaan, dan perkembangan institusi STT Bandung."
                        </p>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* LEFT: NEWS FEED */}
                        <div className="lg:w-2/3 space-y-16">

                            {/* Result Counter (Search Feedback) */}
                            {(searchQuery || activeCategory !== "Semua") && (
                                <div className="bg-muted/50 p-4 rounded-sm border border-border flex items-center justify-between">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        Menampilkan {filteredNews.length} Berita untuk <span className="text-primary">"{activeCategory}"</span>
                                    </p>
                                    <button
                                        onClick={() => { setActiveCategory("Semua"); setSearchQuery(""); }}
                                        className="text-[10px] font-black text-secondary hover:underline uppercase"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            )}

                            {filteredNews.length > 0 ? (
                                <>
                                    {/* Standard Feed (Including Featured style if it's the first result) */}
                                    <div className="space-y-12">
                                        {paginatedNews.map((news, idx) => (
                                            <div key={news.id} className={`group flex flex-col md:flex-row gap-8 items-stretch ${idx === 0 && currentPage === 1 ? 'pb-12 border-b border-border' : ''}`}>
                                                <div className={`overflow-hidden rounded-sm border border-border shadow-lg ${idx === 0 && currentPage === 1 ? 'md:w-1/2 aspect-video lg:aspect-[4/3]' : 'md:w-1/3 aspect-video'}`}>
                                                    <img
                                                        src={news.image}
                                                        alt={news.title}
                                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                                    />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center space-y-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-secondary">
                                                                {news.category}
                                                            </span>
                                                            <div className="flex items-center text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                                                <Calendar size={12} className="mr-2 opacity-40" /> {news.date}
                                                            </div>
                                                        </div>
                                                        <h2 className={`${idx === 0 && currentPage === 1 ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold font-serif text-primary uppercase tracking-tight leading-tight group-hover:text-secondary transition-colors`}>
                                                            {news.title}
                                                        </h2>
                                                        <p className="text-[13px] text-muted-foreground italic leading-relaxed line-clamp-3">
                                                            "{news.excerpt}"
                                                        </p>
                                                    </div>
                                                    <a href={`/berita/${news.id}`} className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-secondary no-underline gap-2 w-fit pb-1 border-b border-transparent hover:border-secondary transition-all">
                                                        Baca Selengkapnya <ChevronRight size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination Buttons */}
                                    {totalPages > 1 && (
                                        <div className="pt-16 border-t border-border flex justify-center gap-2">
                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className="w-10 h-10 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`w-10 h-10 border rounded-sm font-bold text-xs ${currentPage === i + 1 ? 'bg-primary border-primary text-primary-foreground shadow-lg' : 'border-border text-muted-foreground hover:bg-muted'}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button
                                                disabled={currentPage === totalPages}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className="w-10 h-10 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="py-24 text-center border-2 border-dashed border-border rounded-sm opacity-50 space-y-4">
                                    <Search size={48} className="mx-auto text-muted-foreground" />
                                    <h3 className="text-xl font-bold font-serif text-primary uppercase">Tidak Ada Berita</h3>
                                    <p className="text-xs italic">Maaf, kami tidak menemukan berita yang sesuai dengan kriteria pencarian Anda.</p>
                                    <button
                                        onClick={() => { setActiveCategory("Semua"); setSearchQuery(""); }}
                                        className="text-[10px] font-black text-secondary uppercase tracking-widest border border-secondary px-6 py-2 rounded-sm"
                                    >
                                        Lihat Semua Berita
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: SIDEBAR */}
                        <aside className="lg:w-1/3 space-y-12">

                            {/* Search Widget */}
                            <div className="bg-card border border-border p-8 rounded-sm shadow-sm space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary border-l-4 border-secondary pl-4">Cari Berita</h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Ketik kata kunci..."
                                        className="w-full bg-muted/50 border border-border px-12 py-3 text-xs outline-none focus:ring-1 focus:ring-secondary rounded-sm transition-all"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="bg-card border border-border p-8 rounded-sm shadow-sm space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary border-l-4 border-secondary pl-4">Kategori</h4>
                                <div className="flex flex-col gap-1">
                                    {categoryList.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`flex items-center justify-between py-3 px-4 rounded-sm transition-all text-left ${activeCategory === cat
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-muted-foreground hover:bg-muted hover:text-primary"
                                                }`}
                                        >
                                            <span className="text-[11px] font-bold uppercase tracking-tight">{cat}</span>
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeCategory === cat ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                                                {categoryStats[cat]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recent News Widget */}
                            <div className="space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary border-l-4 border-secondary pl-4">Berita Terkini</h4>
                                <div className="space-y-8">
                                    {newsData.slice(0, 3).map((item) => (
                                        <a href={`/berita/${item.id}`} key={item.id} className="flex gap-4 group no-underline">
                                            <div className="shrink-0 w-20 h-20 overflow-hidden rounded-sm border border-border">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <p className="text-[9px] font-bold text-secondary uppercase tracking-widest">{item.date}</p>
                                                <h5 className="text-[12px] font-bold text-primary leading-tight uppercase tracking-tight group-hover:text-secondary transition-colors line-clamp-2">
                                                    {item.title}
                                                </h5>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Archives / Archive Widget */}
                            <div className="bg-muted/30 p-8 rounded-sm border border-border border-dashed space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                                    <Clock size={16} className="text-secondary" /> Arsip Berita
                                </h4>
                                <ul className="space-y-3">
                                    {["February 2026", "January 2026", "December 2025", "November 2025"].map(archive => (
                                        <li key={archive} className="flex items-center justify-between text-[11px] text-muted-foreground hover:text-primary cursor-pointer transition-colors group">
                                            <span className="italic">{archive}</span>
                                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

            {/* --- CTA: NEWSLETTER --- */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tighter text-secondary leading-none">Tetap Terhubung</h3>
                            <p className="text-primary-foreground/70 text-lg italic leading-relaxed max-w-xl mx-auto border-t border-primary-foreground/10 pt-6">
                                "Dapatkan update mingguan mengenai kegiatan kampus dan publikasi artikel teologi terbaru langsung di email Anda."
                            </p>
                        </div>

                        {subscribed ? (
                            <div className="bg-secondary/10 border border-secondary/30 p-8 rounded-sm animate-fade-in">
                                <div className="flex flex-col items-center gap-4">
                                    <CheckCircle2 size={48} className="text-secondary" />
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold text-secondary uppercase tracking-widest">Terima Kasih!</h4>
                                        <p className="text-sm text-primary-foreground/60 italic">Email Anda telah berhasil didaftarkan.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={handleNewsletter}>
                                <input
                                    required
                                    type="email"
                                    placeholder="Masukkan email Anda..."
                                    className="bg-primary-foreground px-8 py-4 rounded-sm text-sm outline-none focus:ring-2 focus:ring-secondary min-w-[300px] text-primary"
                                />
                                <button className="bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-xs px-12 py-4 rounded-sm hover:opacity-90 transition-all shadow-xl">
                                    Langganan Sekarang
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeritaPage;