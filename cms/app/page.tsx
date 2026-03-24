'use client';
import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Newspaper,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  Server,
  Database,
  RefreshCcw,
  Clock
} from 'lucide-react';
import { api, EventDto, NewsDto } from './services/api';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5176/api';

export default function DashboardPage() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [news, setNews] = useState<NewsDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'loading'>('loading');

  const checkDbStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/test/db-health`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        setDbStatus('error');
        return false;
      }

      setDbStatus('connected');
      return true;
    } catch {
      setDbStatus('error');
      return false;
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    const isDbConnected = await checkDbStatus();

    if (!isDbConnected) {
      setEvents([]);
      setNews([]);
      setError('Database SQL Server sedang tidak terhubung.');
      setLoading(false);

      window.dispatchEvent(new Event('refresh-api-status'));
      return;
    }

    try {
      const [eventsData, newsData] = await Promise.all([
        api.events.getAll(),
        api.news.getAll()
      ]);

      setEvents(eventsData || []);
      setNews(newsData.news || []);
      setDbStatus('connected');
    } catch {
      setEvents([]);
      setNews([]);
      setError('Gagal sinkronisasi data dari database SQL Server.');
      setDbStatus('error');
    } finally {
      setLoading(false);
      window.dispatchEvent(new Event('refresh-api-status'));
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans p-4 md:p-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8 text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">
            <Server size={14} /> System Node: Active
          </div>
          <h1 className="text-4xl font-bold text-foreground uppercase tracking-tighter leading-none">
            Admin <span className="text-primary italic">Dashboard</span>
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

      {error && (
        <div className="p-6 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-4 text-left">
          <div className="p-3 bg-danger/10 rounded-full text-danger shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground uppercase tracking-widest leading-none mb-1">
              Database Error
            </p>
            <p className="text-xs text-muted-foreground italic">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm group hover:border-primary transition-all relative overflow-hidden">
          <Newspaper className="absolute -right-4 -bottom-4 w-24 h-24 text-primary opacity-[0.03] group-hover:opacity-[0.08] transition-all" />
          <div className="space-y-1 text-left relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Total Artikel Berita
            </p>
            <p className="text-5xl font-bold text-primary tracking-tighter">
              {loading ? '...' : news.length}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm group hover:border-secondary transition-all relative overflow-hidden">
          <Calendar className="absolute -right-4 -bottom-4 w-24 h-24 text-secondary opacity-[0.03] group-hover:opacity-[0.08] transition-all" />
          <div className="space-y-1 text-left relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Total Kegiatan Kampus
            </p>
            <p className="text-5xl font-bold text-secondary tracking-tighter">
              {loading ? '...' : events.length}
            </p>
          </div>
        </div>

        <div className="bg-muted/50 border border-border p-8 rounded-2xl shadow-sm flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                dbStatus === 'connected'
                  ? 'bg-secondary shadow-[0_0_12px_var(--secondary)]'
                  : dbStatus === 'error'
                  ? 'bg-danger'
                  : 'bg-muted-foreground animate-pulse'
              }`}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
              {dbStatus === 'loading'
                ? 'Checking Database'
                : dbStatus === 'connected'
                ? 'Database Linked'
                : 'Database Disconnected'}
            </p>
          </div>

          <p className="text-[10px] text-muted-foreground text-left leading-relaxed">
            {dbStatus === 'connected' ? (
              <>
                Terhubung ke <span className="text-primary font-bold">sttb_db</span>. Perubahan berdampak langsung pada SQL Server.
              </>
            ) : dbStatus === 'error' ? (
              <>
                Tidak terhubung ke <span className="text-danger font-bold">sttb_db</span>. Pastikan SQL Server aktif dan koneksi database benar.
              </>
            ) : (
              <>
                Sedang memeriksa koneksi ke <span className="text-primary font-bold">sttb_db</span>...
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2 leading-none">
              <Database size={16} className="text-secondary" /> Events Repository
            </h4>
            <Link
              href="/events"
              className="text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest transition-colors no-underline"
            >
              Manage All
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-xl border border-border" />
              ))
            ) : events.length > 0 ? (
              events.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="bg-card border border-border p-5 rounded-xl flex items-center justify-between group hover:border-primary transition-all shadow-sm"
                >
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-secondary uppercase tracking-widest mb-1">
                      {new Date(event.startDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                    <h5 className="text-sm font-bold text-foreground uppercase tracking-tight truncate max-w-75">
                      {event.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[9px] font-bold px-2 py-1 rounded uppercase ${
                        event.isFeatured
                          ? 'bg-secondary/10 text-secondary border border-secondary/20'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {event.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                    <Link href="/events" className="p-2 text-muted-foreground hover:text-primary transition-all">
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center opacity-40 italic">
                <p className="text-sm">
                  {dbStatus === 'error' ? 'Database disconnected.' : 'No events found in database.'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2 leading-none">
              <Newspaper size={16} className="text-primary" /> News Feed
            </h4>
            <Link
              href="/news"
              className="text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest transition-colors no-underline"
            >
              Go to Newsroom
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-xl border border-border" />
              ))
            ) : news.length > 0 ? (
              news.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-border rounded-xl flex items-center gap-4 group hover:bg-muted/30 transition-all text-left"
                >
                  <div className="w-1.5 h-8 bg-primary/20 group-hover:bg-primary transition-all rounded-full" />
                  <div className="flex-1 overflow-hidden">
                    <h6 className="text-[11px] font-bold text-foreground uppercase truncate leading-tight">
                      {item.title}
                    </h6>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={10} className="text-muted-foreground" />
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                        {new Date(item.publishedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center opacity-40 italic">
                <p className="text-sm">
                  {dbStatus === 'error' ? 'Database disconnected.' : 'No news found in database.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}