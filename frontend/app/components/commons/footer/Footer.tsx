'use client'
import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, MessageCircle, Send } from 'lucide-react';

const Footer: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <footer className="w-full bg-background border-t border-border">
            <div className="h-4 w-full bg-secondary mb-12" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 pb-16">

                    {/* Columns Container */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-4">

                        {/* Section 1: Sumber Daya */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-bold font-serif uppercase tracking-widest border-b border-border pb-2 inline-block text-sm">
                                Sumber Daya
                            </h4>
                            <ul className="space-y-3">
                                {['Perpustakaan', 'Perpustakaan Digital', 'Jurnal Transformatio', 'Podcast', 'Video', 'Buletin'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-[12px] md:text-[13px]">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 2: Link Bantuan */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-bold font-serif uppercase tracking-widest border-b border-border pb-2 inline-block text-sm">
                                Link Bantuan
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    'Sistem Informasi Akademik',
                                    'Sistem E-Learning',
                                    'Sistem Perpustakaan',
                                    'Sistem Kolaborasi Terpadu',
                                    'Portal Alumni',
                                    'Mail Server'
                                ].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-[12px] md:text-[13px]">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 3: Program Studi */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-bold font-serif uppercase tracking-widest border-b border-border pb-2 inline-block text-sm">
                                Program Studi
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    'Sarjana Teologi',
                                    'Sarjana Pendidikan Kristen',
                                    'Magister Teologi Pelayanan Pastoral',
                                    'Magister Teologi Transformasi Budaya',
                                    'Magister Pendidikan Kristen',
                                    'Magister Ministri Pastoral',
                                    'Magister Ministri Marketplace',
                                    'Magister Ministri Kepemimpinan',
                                    'Magister Ministri Musik'
                                ].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-[11px] leading-tight block">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 4: No. Rekening */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-bold font-serif uppercase tracking-widest border-b border-border pb-2 inline-block text-sm">
                                No. Rekening
                            </h4>
                            <div className="space-y-4">
                                <div className="text-muted-foreground text-[12px] leading-relaxed">
                                    <p className="font-bold text-primary">BCA cab. Surya Sumantri</p>
                                    <p>Bandung</p>
                                    <p className="text-secondary font-mono font-bold mt-1">a/c 282.300.5555</p>
                                    <p>a/n Yayasan STT Bandung</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="bg-primary p-8 rounded-sm shadow-xl relative overflow-hidden group">
                            {/* Decorative accent for the Newsletter block */}
                            <div className="absolute top-0 right-0 w-24 h-1 bg-secondary" />

                            <h4 className="text-primary-foreground font-bold font-serif uppercase tracking-[0.2em] mb-6 text-center">
                                Newsletter
                            </h4>

                            {isMounted ? (
                                <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="text"
                                        placeholder="Nama Lengkap *"
                                        className="w-full bg-white text-foreground px-4 py-3 text-xs border-none focus:ring-2 focus:ring-secondary outline-none rounded-sm"
                                    />
                                    <input
                                        type="email"
                                        placeholder="E-mail *"
                                        className="w-full bg-white text-foreground px-4 py-3 text-xs border-none focus:ring-2 focus:ring-secondary outline-none rounded-sm"
                                    />
                                    <button className="w-full bg-secondary text-secondary-foreground font-bold uppercase tracking-widest text-[10px] py-4 rounded-sm hover:opacity-90 transition-all flex items-center justify-center space-x-2">
                                        <span>Subscribe</span>
                                        <Send size={14} />
                                    </button>
                                </form>
                            ) : (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center lg:justify-end space-x-6 mt-8 text-muted-foreground">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><MessageCircle size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Contact Bar */}
            <div className="bg-primary text-primary-foreground py-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] md:text-[12px] opacity-90">

                        {/* Address */}
                        <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-secondary mb-2">Location</p>
                            <p>Jl. Dr. Djunjunan No. 105</p>
                            <p>Bandung 40173</p>
                            <p>Indonesia</p>
                        </div>

                        {/* Contact */}
                        <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-secondary mb-2">Contact Info</p>
                            <p>Phone: (+62) 22 601-6454, 607-7920</p>
                            <p>Whatsapp: (+62) 815 7336 0009</p>
                            <p>E-mail: official@sttb.ac.id</p>
                        </div>

                        {/* Copyright */}
                        <div className="md:text-right space-y-1 flex flex-col justify-end">
                            <p>Copyright © {new Date().getFullYear()}</p>
                            <p className="font-bold">Sekolah Tinggi Teologi Bandung</p>
                            <p className="opacity-60 italic">All Rights Reserved.</p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;