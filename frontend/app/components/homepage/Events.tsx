'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Clock, Share2, Loader2 } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { api, EventDto } from '@/app/services/api';
import Link from 'next/link';

const EventsCarousel: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Explicit options for better mobile handling
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 1 }
        }
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.events.getUpcoming(6);
                setEvents(data || []);
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        fetchEvents();
    }, []);

    if (loading) return <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;

    return (
        <section className="py-24 bg-muted/30 border-y border-border w-full overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Header: Takes full width on mobile, 1/4 on desktop */}
                    <div className="w-full lg:w-1/4 shrink-0">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1.5 h-12 bg-secondary rounded-full" />
                            <h3 className="text-4xl font-black font-serif text-primary uppercase tracking-tighter flex flex-col leading-none">
                                <span className="text-[10px] tracking-[0.4em] font-bold text-muted-foreground mb-1 font-sans">KEGIATAN &</span>
                                ACARA
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground italic mb-8 font-sans leading-relaxed">Stay updated with our latest academic and community events.</p>
                        <div className="flex space-x-3">
                            <button onClick={scrollPrev} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all rounded-sm"><ChevronLeft size={20} /></button>
                            <button onClick={scrollNext} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all rounded-sm"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    {/* Carousel Wrapper: Crucial min-w-0 for mobile flex sizing */}
                    <div className="w-full lg:w-3/4 min-w-0">
                        <div className="overflow-hidden touch-pan-y" ref={emblaRef}>
                            <div className="flex -ml-4 lg:-ml-6">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 lg:pl-6"
                                    >
                                        <div className="bg-card border border-border hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 h-full flex flex-col group rounded-sm overflow-hidden">
                                            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                                <img
                                                    //open when already hav imeg
                                                    // src={event.image || "https://images.unsplash.com/photo-1529988885170-6dc8ce34ce6d?q=80&w=1548&auto=format&fit=crop"}
                                                    src={"https://images.unsplash.com/photo-1529988885170-6dc8ce34ce6d?q=80&w=1548&auto=format&fit=crop"}
                                                    alt={event.title}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>

                                            <div className="p-6 flex flex-col grow text-left">
                                                <div className="space-y-1 mb-4">
                                                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                                                        {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                    <div className="flex items-center text-[10px] text-muted-foreground uppercase font-medium">
                                                        <Clock size={12} className="mr-1.5 opacity-60" /> {event.time}
                                                    </div>
                                                </div>

                                                <h4 className="text-sm font-bold text-primary font-serif mb-6 line-clamp-2 min-h-[2.5rem] leading-snug uppercase tracking-tight italic">
                                                    {event.title}
                                                </h4>

                                                <div className="mt-auto space-y-4">
                                                    <div className="flex items-center text-[10px] text-muted-foreground font-semibold">
                                                        <MapPin size={12} className="mr-2 text-secondary shrink-0" />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>

                                                    <Link href={`/kegiatan/${event.id}`} className="block">
                                                        <div className="flex items-center hover:bg-primary group w-fit">
                                                            <div className="p-2 text-muted-foreground group-hover:text-secondary transition-colors border-r border-border group-hover:border-primary-foreground/20">
                                                                <Share2 size={14} />
                                                            </div>
                                                            <span className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 group-hover:text-primary-foreground transition-all font-sans">
                                                                View Detail
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsCarousel;