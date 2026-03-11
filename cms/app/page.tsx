'use client'
import React, { useEffect, useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Calendar,
  Newspaper,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  Server,
  Database,
  RefreshCcw
} from 'lucide-react';
import { api, EventDto, NewsDto } from './services/api';

export default function DashboardPage() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [news, setNews] = useState<NewsDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Jalankan fetch secara paralel untuk efisiensi
      const [eventsData, newsData] = await Promise.all([
        api.events.getAll(),
        api.news.getAll()
      ]);

      setEvents(eventsData);
      setNews(newsData.news || []); // Response berita dibungkus property 'news'
    } catch (err) {
      console.error(err);
      setError("Gagal sinkronisasi dengan database SQL Server. Periksa port 5176.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans">
      {/* Header dengan Status Sync Utama */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8 text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">
            <Server size={14} /> System Node: Active
          </div>
          <h1 className="text-4xl font-bold text-foreground uppercase tracking-tighter leading-none">
            Admin <span className="text-muted-foreground/40 italic">Dashboard</span>
          </h1>
        </div>

        <button
          onClick={fetchAllData}
          disabled={loading}
          className="flex items-center gap-3 bg-muted text-primary border border-border px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-border transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
          Sync SQL Server
        </button>
      </header>

      {/* ERROR HANDLING */}
      {error && (
        <div className="p-6 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-4 text-left">
          <div className="p-3 bg-danger/10 rounded-full text-danger">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-text uppercase tracking-widest">Database Offline</p>
            <p className="text-xs text-muted-foreground italic">{error}</p>
          </div>
        </div>
      )}

      {/* STATS CARDS: SEMUA DATA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* News Stats */}
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm group hover:border-primary transition-all relative overflow-hidden">
          <Newspaper className="absolute -right-4 -bottom-4 w-24 h-24 text-primary opacity-[0.03] group-hover:opacity-[0.08] transition-all" />
          <div className="space-y-1 text-left relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Total Artikel Berita</p>
            <p className="text-5xl font-bold text-primary tracking-tighter">{loading ? '...' : news.length}</p>
          </div>
        </div>

        {/* Events Stats */}
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm group hover:border-secondary transition-all relative overflow-hidden">
          <Calendar className="absolute -right-4 -bottom-4 w-24 h-24 text-secondary opacity-[0.03] group-hover:opacity-[0.08] transition-all" />
          <div className="space-y-1 text-left relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Total Kegiatan Kampus</p>
            <p className="text-5xl font-bold text-secondary tracking-tighter">{loading ? '...' : events.length}</p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-muted/50 border border-border p-8 rounded-2xl shadow-sm flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-muted-foreground' : 'bg-secondary animate-pulse shadow-[0_0_12px_var(--secondary)]'}`} />
            <p className="text-xs font-bold text-text uppercase tracking-widest">
              {loading ? 'Connecting...' : 'Database Linked'}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground text-left leading-relaxed">
            Terhubung ke <span className="text-primary font-bold">sttb_db</span> melalui port <span className="text-primary font-bold">5176</span>. Semua perubahan di CMS akan langsung berdampak pada SQL Server.
          </p>
        </div>
      </div>

      {/* FEED SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT: RECENT EVENTS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <Database size={16} className="text-secondary" /> Events Repository
            </h4>
            <a href="/events" className="text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest transition-colors">Manage All</a>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-xl border border-border" />
              ))
            ) : events.length > 0 ? (
              events.slice(0, 4).map((event) => (
                <div key={event.id} className="bg-card border border-border p-5 rounded-xl flex items-center justify-between group hover:border-primary transition-all shadow-sm">
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-secondary uppercase tracking-widest mb-1">
                      {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                    <h5 className="text-sm font-bold text-text uppercase tracking-tight truncate max-w-[300px]">{event.title}</h5>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase ${event.isFeatured ? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'}`}>
                      {event.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center opacity-20 italic">
                <p className="text-sm">No events found in database.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: RECENT NEWS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <Newspaper size={16} className="text-primary" /> News Feed
            </h4>
            <a href="/news" className="text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest transition-colors">Go to Newsroom</a>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-xl border border-border" />
              ))
            ) : news.length > 0 ? (
              news.slice(0, 4).map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-xl flex items-center gap-4 group hover:bg-muted/30 transition-all text-left">
                  <div className="w-1.5 h-8 bg-primary/20 group-hover:bg-primary transition-all rounded-full" />
                  <div className="flex-1 overflow-hidden">
                    <h6 className="text-[11px] font-bold text-text uppercase truncate leading-tight">{item.title}</h6>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1">{item.category} • {item.authorName}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 border border-dashed border-border rounded-xl flex flex-col items-center justify-center opacity-20 italic">
                <p className="text-xs text-center">Newsroom is empty.</p>
              </div>
            )}
          </div>

          {/* SYSTEM ALERT */}
          <div className="bg-primary p-6 rounded-2xl text-primary-foreground relative overflow-hidden flex flex-col gap-4 text-left">
            <ShieldCheck className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10" />
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Integrity Guard</h6>
            <p className="text-[11px] leading-relaxed italic opacity-80 relative z-10">
              "System is currently pulling from all available endpoints. Connection with MediatR Handlers confirmed."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}