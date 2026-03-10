'use client'
import React from 'react';

const founders = [
    {
        name: "Rev. DR. Caleb Tong (Alm.)",
        image: "https://sttb.ac.id/storage/2022/06/caleb-tong-rev-1.png", // User to replace with actual image
        role: "Founder"
    },
    {
        name: "Rev. DR. Joseph Tong, Ph.D.",
        image: "https://sttb.ac.id/storage/2022/06/joseph-tong-rev-1.png", // User to replace with actual image
        role: "Founder"
    },
    {
        name: "Rev. Dorothy I. Marx (Alm.)",
        image: "https://sttb.ac.id/storage/2022/06/dorothy-marx-rev-1.png", // User to replace with actual image
        role: "Founder"
    }
];

const Founders: React.FC = () => {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-flex flex-col items-center">
                        <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">
                            Akar Sejarah
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary uppercase tracking-tighter mt-2">
                            Para Pendiri STTB
                        </h2>
                        <div className="w-24 h-1 bg-secondary mt-4" />
                    </div>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-[12px] md:text-[13px] italic leading-relaxed pt-4">
                        "Menghormati dedikasi dan visi para tokoh yang telah meletakkan batu pertama bagi pendidikan teologi berkualitas di Bandung."
                    </p>
                </div>

                {/* Equal Grid Structure */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
                    {founders.map((founder, index) => (
                        <div key={index} className="group flex flex-col items-center">
                            {/* Portrait Frame */}
                            <div className="relative w-full aspect-4/5 bg-card border border-border overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-sm">
                                {/* Decorative Corner Accent */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-secondary/40 m-2 group-hover:m-0 group-hover:w-full group-hover:h-full group-hover:border-secondary transition-all duration-500 z-20" />

                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />

                                {/* Inner Shadow Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Name & Title */}
                            <div className="mt-8 text-center space-y-2">
                                <h3 className="text-lg md:text-xl font-bold text-primary font-serif group-hover:text-secondary transition-colors duration-300">
                                    {founder.name}
                                </h3>
                                <div className="flex items-center justify-center space-x-3">
                                    <span className="h-px w-6 bg-border" />
                                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
                                        {founder.role}
                                    </p>
                                    <span className="h-px w-6 bg-border" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Founders;