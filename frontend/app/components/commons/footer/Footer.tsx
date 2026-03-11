'use client'
import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, MessageCircle, Send, CheckCircle2, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setEmail('');
        setName('');

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    if (!isMounted) return null;

    return (
        <footer className="w-full bg-background border-t border-border pt-16 font-sans">
            {/* Top Identity Line */}
            <div className="h-4 w-full bg-secondary mb-12 shadow-inner" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 pb-16">

                    {/* Columns Container */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-4">

                        {/* Section 1: Profil & Institusi */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-black font-serif uppercase tracking-[0.2em] border-b-2 border-secondary pb-2 inline-block text-sm">
                                Institusi
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Sejarah STTB', href: '/profil/sejarah' },
                                    { label: 'Visi & Misi', href: '/profil/visi-misi' },
                                    { label: 'Mars STTB', href: '/profil/mars-sttb' },
                                    { label: 'Pengakuan Iman', href: '/profil/pengakuan-iman' },
                                    { label: 'Yayasan', href: '/profil/yayasan' },
                                    { label: 'Berita & Media', href: '/berita' }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-all text-[12px] md:text-[13px] no-underline flex items-center group">
                                            <span className="w-0 group-hover:w-3 h-px bg-secondary mr-0 group-hover:mr-2 transition-all" />
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 2: Admisi & Layanan Digital (Academic Help) */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-black font-serif uppercase tracking-[0.2em] border-b-2 border-secondary pb-2 inline-block text-sm">
                                Admisi & Layanan
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Pendaftaran Online', href: '/admisi/pendaftaran' },
                                    { label: 'Biaya & Beasiswa', href: '/admisi/biaya' },
                                    { label: 'Sistem Informasi Akademik', href: 'https://sis.sttb.ac.id', external: true },
                                    { label: 'Sistem E-Learning', href: 'https://elearning.sttb.ac.id', external: true },
                                    { label: 'Sistem Perpustakaan', href: 'https://sttb.ac.id/perpustakaan/perpustakaan/', external: true },
                                    { label: 'Portal Alumni', href: '#', external: true }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                            className="text-muted-foreground hover:text-primary transition-all text-[12px] md:text-[13px] no-underline flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-secondary mr-0 group-hover:mr-2 transition-all" />
                                            {item.label}
                                            {item.external && <ExternalLink size={10} className="ml-1 opacity-0 group-hover:opacity-40 transition-opacity" />}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 3: Program Studi (Academic Section) */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-black font-serif uppercase tracking-[0.2em] border-b-2 border-secondary pb-2 inline-block text-sm">
                                Program Studi
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    { label: 'S1 Teologi (S.Th)', href: '/prodi/s1-teologi' },
                                    { label: 'S1 Pendidikan Kristen (S.Pd)', href: '/prodi/s1-pak' },
                                    { label: 'S2 Teologi Urban', href: '/prodi/s2-teologi-urban' },
                                    { label: 'S2 Teologi Transformasi', href: '/prodi/s2-teologi-transformasi' },
                                    { label: 'S2 Pendidikan Kristen', href: '/prodi/s2-pak' },
                                    { label: 'S2 Marketplace', href: '/prodi/s2-ministri-marketplace' },
                                    { label: 'S2 Kepemimpinan', href: '/prodi/s2-ministri-kepemimpinan' },
                                    { label: 'S2 Pelayanan Gerejawi', href: '/prodi/s2-ministri-gerejawi' }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-all text-[11px] leading-tight block no-underline group">
                                            <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity mr-1">›</span>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 4: No. Rekening & Dukungan */}
                        <div className="space-y-6">
                            <h4 className="text-primary font-black font-serif uppercase tracking-[0.2em] border-b-2 border-secondary pb-2 inline-block text-sm">
                                Keuangan
                            </h4>
                            <div className="space-y-4">
                                <div className="bg-muted/50 p-4 border border-border rounded-sm">
                                    <p className="font-bold text-primary text-[11px] uppercase tracking-wider">BCA Surya Sumantri</p>
                                    <p className="text-secondary font-mono font-black text-lg tracking-tighter mt-1">282.300.5555</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">an. Yayasan STT Bandung</p>
                                </div>
                                <a
                                    href="/mahasiswa/dukung"
                                    className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary no-underline border-b border-primary/20 pb-1 transition-all"
                                >
                                    Dukung Pelayanan STTB
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="bg-primary p-8 rounded-sm shadow-2xl relative overflow-hidden group border border-white/5">
                            <div className="absolute top-0 right-0 w-24 h-1 bg-secondary" />

                            <h4 className="text-primary-foreground font-black font-serif uppercase tracking-[0.2em] mb-6 text-center text-sm">
                                Newsletter
                            </h4>

                            {isSuccess ? (
                                <div className="h-48 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                                    <CheckCircle2 size={48} className="text-secondary" />
                                    <p className="text-primary-foreground text-xs font-bold uppercase tracking-widest">Berhasil Terdaftar!</p>
                                </div>
                            ) : (
                                <form className="space-y-4 relative z-10" onSubmit={handleSubscribe}>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nama Lengkap *"
                                        className="w-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 px-4 py-3 text-xs border border-white/10 focus:ring-2 focus:ring-secondary outline-none rounded-sm transition-all"
                                    />
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="E-mail *"
                                        className="w-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 px-4 py-3 text-xs border border-white/10 focus:ring-2 focus:ring-secondary outline-none rounded-sm transition-all"
                                    />
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-[10px] py-4 rounded-sm hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                                    >
                                        <span>{isSubmitting ? 'Subscribing...' : 'Subscribe Now'}</span>
                                        {!isSubmitting && <Send size={14} />}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center lg:justify-end space-x-6 mt-8 text-muted-foreground">
                            <a href="https://facebook.com/sttbandung" target="_blank" className="hover:text-primary transition-all transform hover:-translate-y-1"><Facebook size={20} /></a>
                            <a href="https://instagram.com/sttbandung" target="_blank" className="hover:text-secondary transition-all transform hover:-translate-y-1"><Instagram size={20} /></a>
                            <a href="https://youtube.com/sttbandung" target="_blank" className="hover:text-red-600 transition-all transform hover:-translate-y-1"><Youtube size={20} /></a>
                            <a href="https://wa.me/6281573360009" target="_blank" className="hover:text-green-600 transition-all transform hover:-translate-y-1"><MessageCircle size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Contact Bar */}
            <div className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
                {/* Subtle Watermark */}
                <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-y-1/4 translate-x-1/4">
                    <img src="https://sttb.ac.id/storage/2023/11/Logo-STTB-2023.png" alt="" className="w-96" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[11px] md:text-[12px]">

                        {/* Address */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                                    <MapPin size={16} />
                                </div>
                                <h5 className="font-black uppercase tracking-[0.2em] text-secondary">Main Campus</h5>
                            </div>
                            <div className="opacity-70 leading-loose italic pl-11">
                                <p>Jl. Dr. Djunjunan No. 105</p>
                                <p>Bandung 40173, Jawa Barat</p>
                                <p>Indonesia</p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                                    <Phone size={16} />
                                </div>
                                <h5 className="font-black uppercase tracking-[0.2em] text-secondary">Get In Touch</h5>
                            </div>
                            <div className="opacity-70 leading-loose pl-11">
                                <p>Phone: (+62) 22 601-6454</p>
                                <p>Whatsapp: (+62) 815 7336 0009</p>
                                <p className="font-bold text-primary-foreground/90">E-mail: official@sttb.ac.id</p>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="md:text-right flex flex-col justify-center items-center md:items-end">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Copyright © {new Date().getFullYear()}</p>
                                <p className="font-black text-sm uppercase tracking-tighter">Sekolah Tinggi Teologi Bandung</p>
                                <p className="opacity-50 italic text-[10px]">Excellence in Reformed & Transformative Education</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;