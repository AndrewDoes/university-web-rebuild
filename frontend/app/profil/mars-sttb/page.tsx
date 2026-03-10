'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Download, ChevronRight, Share2 } from 'lucide-react';

const MarsSTTBPage: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            const newState = !isMuted;
            audioRef.current.muted = newState;
            setIsMuted(newState);
        }
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
            if (value > 0) {
                setIsMuted(false);
                audioRef.current.muted = false;
            }
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Mars STT Bandung',
            text: 'Dengarkan Mars STT Bandung karya Dorothy I. Marx',
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    return (
        <div className="bg-background min-h-screen">
            {/* --- HERO HEADER --- */}
            <div className="relative bg-primary py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-12 h-full w-full">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-primary-foreground/10 h-full" />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-secondary">
                        <Music size={20} />
                        <span className="font-bold tracking-[0.4em] uppercase text-xs">Identitas Suara</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground font-serif tracking-tighter uppercase leading-tight">
                        Mars <span className="text-secondary italic">STT Bandung</span>
                    </h1>
                </div>
            </div>

            {/* --- AUDIO PLAYER SECTION --- */}
            <section className="py-12 bg-muted/50 border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-primary rounded-sm p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        <Music className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64 rotate-12" />

                        <div className="relative z-10">
                            <div className="mb-10">
                                <h2 className="text-2xl md:text-4xl font-bold text-white font-serif tracking-tight mb-2">
                                    Mars STT Bandung
                                </h2>
                                <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                                    BY <span className="text-white">DOROTHY I. MARX</span>
                                </p>
                            </div>

                            <audio
                                ref={audioRef}
                                src="https://sttb.ac.id/storage/2022/05/Audio-Mars-STTB.mp3"
                                onTimeUpdate={onTimeUpdate}
                                onLoadedMetadata={onLoadedMetadata}
                                onEnded={() => setIsPlaying(false)}
                            />

                            {/* Player Controls */}
                            <div className="flex flex-col space-y-6">
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={togglePlay}
                                        className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all shadow-xl active:scale-95 shrink-0"
                                    >
                                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                                    </button>

                                    <div className="flex-1 flex flex-col space-y-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max={duration || 0}
                                            value={currentTime}
                                            onChange={handleSeek}
                                            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary"
                                        />
                                        <div className="flex justify-between text-[10px] font-mono text-white/60">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6 shrink-0">
                                        <button onClick={toggleMute} className="text-white/60 hover:text-secondary transition-colors">
                                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <a
                            href="https://sttb.ac.id/storage/2022/05/Audio-Mars-STTB.mp3"
                            download="Mars-STTB-Bandung.mp3"
                            className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors no-underline"
                        >
                            <Download size={14} />
                            <span>Download Audio</span>
                        </a>
                        <span className="text-border">|</span>
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
                        >
                            <Share2 size={14} />
                            <span>Bagikan</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- LYRICS / SHEET MUSIC SECTION --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold font-serif text-primary uppercase tracking-tighter">Lirik & Aransemen</h3>
                            <div className="w-20 h-1 bg-secondary mx-auto" />
                            <p className="text-muted-foreground text-sm italic leading-relaxed max-w-2xl mx-auto">
                                "Nyanyian perjuangan dan iman yang melandasi setiap derap langkah civitas akademika STT Bandung dalam melayani Tuhan."
                            </p>
                        </div>

                        <div className="relative p-2 md:p-4 bg-white border border-border shadow-2xl rounded-sm group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <img
                                src="https://sttb.ac.id/storage/2022/01/09-MARS-STTB.jpg"
                                alt="Lirik Mars STTB"
                                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                            />

                            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-secondary/20 m-4" />
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-secondary/20 m-4" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-20 bg-muted border-t border-border">
                <div className="container mx-auto px-6 text-center">
                    <h4 className="text-primary font-bold font-serif uppercase tracking-widest text-sm mb-8">Pelajari Lebih Lanjut</h4>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="/profil/sejarah" className="group flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary no-underline border-b border-transparent hover:border-secondary transition-all pb-1">
                            <span>Sejarah Perjalanan</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="/profil/visi-misi" className="group flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary no-underline border-b border-transparent hover:border-secondary transition-all pb-1">
                            <span>Visi & Misi Kami</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarsSTTBPage;