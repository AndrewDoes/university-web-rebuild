'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Clock, Share2 } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const eventsData = [
    {
        id: 1,
        title: "Webinar Series M.Pd.K.",
        date: "Mar 11, 2026",
        time: "17:00 - 19:00",
        location: "STTB Zoom 1",
        image: "https://images.unsplash.com/photo-1591115765373-520b7a21769b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "CHRISTIAN BIOETHICS SYMPOSIUM END-OF-LIFE",
        date: "Apr 18, 2026",
        time: "09:00 - 16:00",
        location: "Jl. Dr Djunjunan 105",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Preparing for Leadership Transition & Discipleship",
        date: "Apr 24 - 25, 2026",
        time: "15:30 - 18:00",
        location: "Jl. Dr Djunjunan 105",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
    }
];

const EventsCarousel: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="py-24 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- LEFT: TITLE SECTION --- */}
                    <div className="lg:w-1/4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1.5 h-12 bg-secondary rounded-full" />
                            <h3 className="text-4xl font-black font-serif text-primary uppercase tracking-tighter flex flex-col leading-none">
                                <span className="text-[10px] tracking-[0.4em] font-bold text-muted-foreground mb-1 uppercase">Kegiatan &</span>
                                Acara
                            </h3>
                        </div>
                        <p className="text-xs text-muted-foreground italic mb-8">Stay updated with our latest academic and community events.</p>

                        {/* Navigation Controls */}
                        <div className="flex space-x-3">
                            <button onClick={scrollPrev} className="w-10 h-10 border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ChevronLeft size={20} /></button>
                            <button onClick={scrollNext} className="w-10 h-10 border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    {/* --- RIGHT: CAROUSEL --- */}
                    <div className="lg:w-3/4 overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-6">
                            {eventsData.map((event) => (
                                <div key={event.id} className="flex-[0_0_100%] min-w-0 pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                                    <div className="bg-card border border-border hover:shadow-xl transition-all h-full flex flex-col group">
                                        <div className="aspect-video overflow-hidden">
                                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="space-y-1 mb-4">
                                                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{event.date}</p>
                                                <div className="flex items-center text-[10px] text-muted-foreground uppercase font-medium">
                                                    <Clock size={12} className="mr-1.5 opacity-60" /> {event.time}
                                                </div>
                                            </div>
                                            <h4 className="text-sm font-bold text-primary mb-6 line-clamp-2 min-h-[40px] leading-snug uppercase tracking-tight">{event.title}</h4>

                                            <div className="mt-auto space-y-4">
                                                <div className="flex items-center text-[10px] text-muted-foreground font-semibold">
                                                    <MapPin size={12} className="mr-2 text-secondary" /> {event.location}
                                                </div>
                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                                    <button className="text-muted-foreground hover:text-secondary transition-colors"><Share2 size={16} /></button>
                                                    <button className="text-[9px] font-bold uppercase tracking-widest border border-border px-4 py-2 hover:bg-primary hover:text-white transition-all">View Detail</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EventsCarousel;