'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronDown, User, Search, Clock } from 'lucide-react';

interface NavLink {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);

    function getDayInString(day: number) {
        switch (day) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: return "";
        }
    }

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const updateDateAndClock = () => {
            const now = new Date();
            const dayStr = getDayInString(now.getDay());
            const date = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();

            const today = `${dayStr}, ${date}-${month < 10 ? `0${month}` : month}-${year}`;
            const timeString = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            setCurrentDate(today);
            setCurrentTime(timeString);
        };

        updateDateAndClock();
        const timer = setInterval(updateDateAndClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const navLinks: NavLink[] = [
        { label: 'Beranda', href: '/' },
        {
            label: 'Profil',
            href: '/',
            children: [
                { label: 'Sejarah STTB', href: '/profil/sejarah' },
                { label: 'Visi & Misi', href: '/profil/visi-misi' },
                { label: 'Mars STTB', href: '/profil/mars-sttb' },
                { label: 'Pengakuan Iman', href: '/profil/pengakuan-iman' },
                { label: 'Dewan Dosen', href: '/profil/dewan-dosen' },
                { label: 'Yayasan', href: '/profil/yayasan' },
            ]
        },
        {
            label: 'Akademik',
            href: '/',
            children: [
                { label: 'Sarjana Teologi', href: '/prodi/s1-teologi' },
                { label: 'Sarjana Pendidikan Kristen', href: '/prodi/s1-pak' },
                { label: 'Magister Teologi Pelayanan Pastoral Gereja Urban', href: '/prodi/s2-teologi-urban' },
                { label: 'Magister Teologi Transformasi Budaya & Masyarakat', href: '/prodi/s2-teologi-transformasi' },
                { label: 'Magister Pendidikan Kristen', href: '/prodi/s2-pak' },
                { label: 'Magister Ministri Marketplace', href: '/prodi/s2-ministri-marketplace' },
                { label: 'Magister Ministri Kepemimpinan Pastoral', href: '/prodi/s2-ministri-kepemimpinan' },
                { label: 'Magister Ministri Teologi Pelayanan Gerejawi', href: '/prodi/s2-ministri-gerejawi' },
                { label: 'Kalender Akademik', href: '/akademik/kalender' },
            ]
        },
        {
            label: 'Keuangan',
            href: '/',
            children: [
                { label: 'Biaya Studi', href: '/mahasiswa/biaya' },
                { label: 'Beasiswa', href: '/mahasiswa/beasiswa' },
                { label: 'Dukung STTB', href: '/mahasiswa/dukung' },
            ]
        },
        {
            label: 'Kehidupan Kampus',
            href: '/',
            children: [
                { label: 'Fasilitas', href: '/kampus/fasilitas' },
                { label: 'Pembinaan', href: '/kampus/pembinaan' },
                { label: 'Senat', href: '/kampus/senat' },
            ]
        },
        { label: 'Berita', href: '/berita' },
        { label: 'Kegiatan', href: '/kegiatan' },
    ];

    return (
        <header className="fixed w-full top-0 left-0 z-50 transition-all duration-300">
            {/* --- TOP BAR --- */}
            <div className={`bg-primary text-primary-foreground py-2 transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
                <div className="container mx-auto px-6 flex justify-center md:justify-between items-center text-[11px] font-medium tracking-wide">
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="tel:+62224203746" className="flex items-center hover:text-secondary transition-colors no-underline">
                            <Phone size={12} className="mr-2" /> (022) 4203746
                        </a>
                        <a href="mailto:info@sttb.ac.id" className="hidden sm:flex items-center hover:text-secondary transition-colors no-underline">
                            <Mail size={12} className="mr-2" /> info@sttb.ac.id
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isMounted && (
                            <>
                                <div className="hidden md:flex items-center space-x-3 pr-4 border-r border-white/20">
                                    {currentDate}
                                </div>
                                <div className="flex items-center bg-white/5 md:border md:border-border px-3 py-0.5 rounded-full text-secondary">
                                    <Clock size={12} className="mr-1.5 animate-pulse" />
                                    <span className="font-mono tabular-nums">{currentTime}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MAIN NAVIGATION --- */}
            <nav className={`transition-all duration-300 relative w-full ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg py-2' : 'bg-background py-4'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
                    {/* Logo Area */}
                    <a href="/" className="flex items-center group no-underline shrink-0">
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold tracking-tighter text-primary group-hover:opacity-80 transition-opacity uppercase">STT Bandung</span>
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.25em] font-bold text-muted-foreground leading-tight">Sekolah Tinggi Teologi</span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative group px-2 py-2"
                                onMouseEnter={() => setActiveDropdown(link.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {link.children ? (
                                    <span className="text-foreground hover:text-primary font-bold text-[13px] uppercase tracking-wide transition-colors flex items-center cursor-default">
                                        {link.label}
                                        <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180 text-primary' : 'opacity-40'}`} />
                                    </span>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="text-foreground hover:text-primary font-bold text-[13px] uppercase tracking-wide transition-colors flex items-center no-underline"
                                    >
                                        {link.label}
                                    </a>
                                )}

                                {link.children && (
                                    <div className={`absolute top-full left-0 mt-2 w-72 bg-card shadow-2xl rounded-sm border-t-4 border-primary transition-all duration-200 ${activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                        <div className="py-2">
                                            {link.children.map(child => (
                                                <a
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-6 py-3 text-[12px] font-bold text-muted-foreground hover:bg-muted hover:text-primary no-underline transition-colors uppercase leading-tight"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="/contact"
                            className="text-foreground hover:text-primary font-bold text-[13px] uppercase tracking-wide transition-colors flex items-center no-underline"
                        >
                            KONTAK KAMI
                        </a>
                        <a
                            href="/login"
                            className="bg-primary text-primary-foreground px-8 py-2.5 rounded-sm hover:opacity-90 transition-all font-bold text-xs tracking-widest uppercase shadow-sm hover:shadow-md active:scale-95 inline-flex items-center no-underline"
                        >
                            <User size={14} className="mr-2" /> LOGIN
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="xl:hidden p-2 text-primary bg-transparent border-none cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`xl:hidden absolute top-full left-0 w-full bg-background z-40 shadow-2xl overflow-y-auto transition-all duration-500 ease-in-out transform origin-top ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-10 opacity-0 pointer-events-none'}`}
                    style={{ maxHeight: 'calc(100vh - 80px)' }}
                >
                    <div className="p-6 space-y-2 pb-32">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Website Time</span>
                            <div className="flex items-center text-primary font-mono font-bold">
                                <Clock size={14} className="mr-2 animate-pulse text-secondary" />
                                {currentTime}
                            </div>
                        </div>
                        {navLinks.map((link) => (
                            <div key={link.label} className="border-b border-border last:border-0">
                                <div
                                    className="flex justify-between items-center py-4 cursor-pointer"
                                    onClick={() => link.children ? setActiveDropdown(activeDropdown === link.label ? null : link.label) : null}
                                >
                                    {link.children ? (
                                        <span className="text-base font-bold text-foreground uppercase tracking-wide">
                                            {link.label}
                                        </span>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="text-base font-bold text-foreground no-underline uppercase tracking-wide"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                    {link.children && <ChevronDown size={20} className={`text-primary transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                                </div>

                                {link.children && activeDropdown === link.label && (
                                    <div className="bg-muted rounded-lg mb-4 py-2">
                                        {link.children.map(child => (
                                            <a
                                                key={child.label}
                                                href={child.href}
                                                className="block px-6 py-3 text-sm font-medium text-muted-foreground no-underline"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-6 space-y-4">
                            <a
                                href="/login"
                                className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-sm font-bold tracking-widest uppercase no-underline shadow-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Login Ke Portal
                            </a>
                            <div className="flex justify-center space-x-6 text-muted-foreground py-4">
                                <a href="tel:+62224203746" className="no-underline text-inherit hover:text-primary transition-colors"><Phone size={20} /></a>
                                <a href="mailto:info@sttb.ac.id" className="no-underline text-inherit hover:text-primary transition-colors"><Mail size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;