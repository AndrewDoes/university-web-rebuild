'use client'
import React, { useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel } from 'antd';

const testimonials = [
    {
        name: "Yulianus Aris",
        role: "Alumni S.Th",
        content: "Belajar di STTB bukan hanya sekadar menambah wawasan teologis, tapi benar-benar mentransformasi cara saya memandang pelayanan di tengah masyarakat urban yang kompleks.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Siska Pratama",
        role: "Mahasiswa M.PAK",
        content: "Kurikulum yang relevan dan dosen yang kompeten sangat membantu saya dalam mengintegrasikan iman Kristen dengan tantangan pendidikan masa kini.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Daniel Santoso",
        role: "Alumni S.PAK",
        content: "STTB memberikan fondasi Alkitabiah yang sangat kokoh. Saya merasa diperlengkapi untuk menjadi hamba Tuhan yang setia di ladang misi manapun.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Andi Wijaya",
        role: "Alumni S.Teol",
        content: "Pengalaman belajar di sini sangat mendalam. Interaksi antara teori dan praktek lapangan sangat seimbang, memberikan perspektif baru dalam pelayanan gerejawi.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Siti Rahma",
        role: "Mahasiswa S2 Teologi",
        content: "Fasilitas perpustakaan dan riset yang disediakan STTB sangat mendukung studi lanjut saya di bidang Teologi Urban, sangat terbantu dengan bimbingan dosen.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Budi Setiawan",
        role: "Alumni M.Th",
        content: "STTB bukan sekadar tempat menimba ilmu, tapi sebuah komunitas iman yang saling mendukung pertumbuhan rohani dan intelektual.",
        image: "https://images.unsplash.com/photo-1547037579-f0fc020ac3be?q=80&w=2070&auto=format&fit=crop"
    }
];

const Testimonials: React.FC = () => {
    const carouselRef = useRef<any>(null);

    return (
        <section className="py-24 bg-background overflow-hidden relative border-t border-border/50">

            <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl text-left">
                        <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-xs mb-4">
                            Suara Komunitas
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold font-serif text-primary tracking-tighter">
                            Kesaksian & Cerita <br />
                            <span className="italic">Transformasi</span>
                        </h3>
                    </div>


                    <div className="flex space-x-3">
                        <button
                            onClick={() => carouselRef.current?.prev()}
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => carouselRef.current?.next()}
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>


                <div className="relative">
                    <Carousel
                        ref={carouselRef}
                        dots={true}
                        infinite={true}
                        autoplay={true}
                        autoplaySpeed={5000}
                        slidesToShow={4}
                        slidesToScroll={1}
                        className="testimonial-carousel"
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]}
                    >
                        {testimonials.map((item, index) => (
                            <div key={index} className="px-4 pb-12 pt-6">
                                <div className="bg-card p-8 rounded-sm border border-border relative group h-75 flex flex-col hover:shadow-xl transition-all duration-300">
                                    <div className="absolute -top-4 right-10 w-10 h-10 bg-secondary flex items-center justify-center rounded-sm shadow-lg transform group-hover:rotate-12 transition-transform">
                                        <Quote size={20} className="text-secondary-foreground" />
                                    </div>

                                    <div className="grow overflow-hidden">
                                        <p className="text-foreground leading-relaxed italic text-sm md:text-[13px]">
                                            "{item.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 border-t border-border pt-6 mt-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary opacity-90 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary uppercase tracking-wider text-xs">
                                                {item.name}
                                            </h4>
                                            <p className="text-[9px] font-bold text-secondary uppercase tracking-widest mt-0.5">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground text-xs mb-6 font-medium tracking-wide">
                        Bergabunglah dengan ribuan alumni yang telah berdampak bagi gereja dan bangsa.
                    </p>
                    <a
                        href="/admission"
                        className="inline-flex items-center space-x-4 text-primary font-bold uppercase tracking-widest text-[10px] hover:text-secondary transition-colors group no-underline"
                    >
                        <span>Mulai Cerita Anda</span>
                        <div className="w-12 h-px bg-secondary group-hover:w-16 transition-all" />
                    </a>
                </div>
            </div>

            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none" />

            <style jsx global>{`
                .testimonial-carousel .slick-dots li button {
                    background: var(--border) !important;
                    height: 4px !important;
                    border-radius: 2px !important;
                }
                .testimonial-carousel .slick-dots li.slick-active button {
                    background: var(--secondary) !important;
                    width: 24px !important;
                }
                .testimonial-carousel .slick-list {
                    padding-top: 10px !important;
                    margin-top: -10px !important;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;