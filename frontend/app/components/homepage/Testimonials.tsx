'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
    {
        name: "Yulianus Aris",
        role: "Alumni S.Th",
        content: "Belajar di STTB bukan hanya sekadar menambah wawasan teologis, tapi benar-benar mentransformasi cara saya memandang pelayanan di tengah masyarakat urban yang kompleks.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Siska Pratama",
        role: "Mahasiswa M.Pd.K",
        content: "Kurikulum yang relevan dan dosen yang kompeten sangat membantu saya dalam mengintegrasikan iman Kristen dengan tantangan pendidikan masa kini.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Daniel Santoso",
        role: "Alumni S.Th",
        content: "STTB memberikan fondasi Alkitabiah yang sangat kokoh. Saya merasa diperlengkapi untuk menjadi hamba Tuhan yang setia di ladang misi manapun.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Andi Wijaya",
        role: "Alumni S.Th",
        content: "Pengalaman belajar di sini sangat mendalam. Interaksi antara teori dan praktek lapangan sangat seimbang, memberikan perspektif baru dalam pelayanan gerejawi.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Siti Rahma",
        role: "Mahasiswa S2 Teologi",
        content: "Fasilitas perpustakaan dan riset yang disediakan STTB sangat mendukung studi lanjut saya di bidang Teologi Urban, sangat terbantu dengan bimbingan dosen.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=2070&auto=format&fit=crop"
    },
    {
        name: "Budi Setiawan",
        role: "Alumni M.Th",
        content: "STTB bukan sekadar tempat menimba ilmu, tapi sebuah komunitas iman yang saling mendukung pertumbuhan rohani dan intelektual.",
        image: "https://images.unsplash.com/photo-1547037579-f0fc020ac3be?q=80&w=2070&auto=format&fit=crop"
    }
];

const Testimonials: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            containScroll: 'trimSnaps'
        },
        [Autoplay({ delay: 6000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-16 md:py-24 bg-background relative border-t border-border/50 w-full overflow-x-hidden">
            {/* Fail-safe absolute bar - constrained to 100% width */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary opacity-20 pointer-events-none" />

            <div className="max-w-[100vw] px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                    <div className="max-w-full">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-6 h-px bg-secondary" />
                            <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-[10px]">
                                Suara Komunitas
                            </h2>
                        </div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-primary tracking-tighter leading-tight">
                            Kesaksian & Cerita <br />
                            <span className="text-foreground/40 italic">Transformasi</span>
                        </h3>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                        <button
                            onClick={scrollPrev}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90 bg-card"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90 bg-card"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 md:-ml-6">
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] min-w-0 pl-4 md:pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                            >
                                <div className="bg-card p-6 sm:p-8 md:p-10 rounded-sm border border-border relative group h-full min-h-75 flex flex-col hover:shadow-xl transition-all duration-30">

                                    <div className="grow py-2">
                                        <p className="text-foreground/90 leading-relaxed italic text-sm sm:text-base font-medium">
                                            "{item.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 border-t border-border pt-6 mt-6 shrink-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-secondary/20 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-primary uppercase tracking-wider text-xs sm:text-sm truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-[9px] sm:text-[10px] font-bold text-secondary uppercase tracking-widest mt-0.5 truncate opacity-70">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border/30">
                    <div className="flex items-center space-x-2">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`h-1 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-8 bg-secondary' : 'w-2 bg-border'
                                    }`}
                            />
                        ))}
                    </div>

                    <a
                        href="/admission"
                        className="inline-flex items-center space-x-3 text-primary font-bold uppercase tracking-widest text-[10px] hover:text-secondary transition-all no-underline group"
                    >
                        <span>Mulai Cerita Anda</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;