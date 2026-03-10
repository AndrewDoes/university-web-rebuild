'use client'
import React from 'react';
import { Flame, BookOpen, Cross, Scale } from 'lucide-react';
import { Image } from 'antd';

const logoMeanings = [
    {
        title: "Api",
        icon: <Image src='https://sttb.ac.id/storage/2022/01/api.png' height={52} />,
        text: "Menggambarkan penyertaan dan pemenuhan dari Allah Roh Kudus yang menjadi sumber hikmat, kuasa, dan kasih serta merupakan syarat mutlak bagi pelayan Tuhan."
    },
    {
        title: "Alkitab",
        icon: <Image src='https://sttb.ac.id/storage/2022/01/alkitab.png' height={52} />,
        text: "Adalah satu-satunya sumber pengetahuan yang benar tentang Allah dan dasar bagi panggilan serta pelayanan (Sola Scriptura)."
    },
    {
        title: "Salib & Mahkota",
        icon: <Image src='https://sttb.ac.id/storage/2022/01/salib.png' height={52} />,
        text: "Melambangkan panggilan untuk berpegang kepada kebenaran dan merajakan Kristus."
    },
    {
        title: "Tongkat Gembala",
        icon: <Image src='https://sttb.ac.id/storage/2022/01/tongkat.png' height={52} />,
        text: "Melambangkan panggilan Tuhan untuk menggembalakan umat-Nya."
    }
];

const LogoExplanation: React.FC = () => {
    return (
        <section className="py-24 bg-card border-y border-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Text & Grid Info */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">
                                Identitas Visual
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif text-primary uppercase tracking-tighter">
                                Arti Logo STTB
                            </h3>
                            <div className="w-16 h-1 bg-secondary mt-2" />
                        </div>

                        <div className="w-full lg:w-1/2 flex justify-center items-center lg:hidden">
                            <div className="relative w-full max-w-lg aspect-square bg-background rounded-sm shadow-inner border border-border flex flex-col items-center justify-center p-12 overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-150 transition-transform duration-1000 rounded-full" />

                                <div className="relative z-10 text-center">
                                    <img
                                        src="https://sis.sttb.ac.id/images_siakad/metroui/logo-siakad.png"
                                        alt="STTB Logo"
                                        className="max-w-70 md:max-w-85 h-auto lg:grayscale hover:grayscale-0 transition-all duration-700 drop-shadow-2xl"
                                    />
                                    <div className="mt-10 flex flex-col items-center space-y-2">
                                        <span className="h-px w-12 bg-secondary/50" />
                                        <p className="text-[11px] uppercase font-bold tracking-[0.4em] text-primary italic">
                                            Sola Scriptura
                                        </p>
                                        <span className="h-px w-12 bg-secondary/50" />
                                    </div>
                                </div>

                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/30 m-4" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/30 m-4" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {logoMeanings.map((m, i) => (
                                <div key={i} className="flex group p-6 border border-border hover:border-secondary/40 transition-all bg-background rounded-sm hover:scale-110">
                                    <div className="pr-6 flex justify-center items-center border-r border-primary transform group-hover:scale-110 transition-transform duration-300">
                                        {m.icon}
                                    </div>
                                    <div className="flex-1 ml-6">
                                        <h4 className="font-bold text-primary mb-2 uppercase tracking-wider text-xs transform group-hover:scale-110 transition-transform duration-300">
                                            {m.title}
                                        </h4>
                                        <p className="text-[11px] md:text-[12px] text-muted-foreground leading-relaxed italic">
                                            "{m.text}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 justify-center items-center hidden lg:flex">
                        <div className="relative w-full max-w-lg aspect-square bg-background rounded-sm shadow-inner border border-border flex flex-col items-center justify-center p-12 overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-150 transition-transform duration-1000 rounded-full" />

                            <div className="relative z-10 text-center">
                                <img
                                    src="https://sis.sttb.ac.id/images_siakad/metroui/logo-siakad.png"
                                    alt="STTB Logo"
                                    className="max-w-70 md:max-w-85 h-auto lg:grayscale hover:grayscale-0 transition-all duration-700 drop-shadow-2xl"
                                />
                                <div className="mt-10 flex flex-col items-center space-y-2">
                                    <span className="h-px w-12 bg-secondary/50" />
                                    <p className="text-[11px] uppercase font-bold tracking-[0.4em] text-primary italic">
                                        Sola Scriptura
                                    </p>
                                    <span className="h-px w-12 bg-secondary/50" />
                                </div>
                            </div>

                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/30 m-4" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/30 m-4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoExplanation;