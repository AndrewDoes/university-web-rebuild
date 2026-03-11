'use client'
import React from 'react';
import {
  TrendingUp,
  Users,
  Newspaper,
  Calendar,
  Clock,
  ShieldCheck,
  MoreVertical,
  Activity,
  ArrowRight
} from 'lucide-react';

const stats = [
  { label: "Berita Aktif", value: "24", icon: <Newspaper size={18} />, trend: "+3 mgg ini" },
  { label: "Agenda Event", value: "8", icon: <Calendar size={18} />, trend: "2 mndtg" },
  { label: "Data Dosen", value: "48", icon: <Users size={18} />, trend: "Terverifikasi" },
  { label: "Kesehatan API", value: "99.8%", icon: <Activity size={18} />, trend: "Stabil" }
];

const recentLogs = [
  { user: "Andrew", action: "Memperbarui Berita", target: "Wisuda 2026", time: "2 menit yang lalu" },
  { user: "Admin", action: "Menambah Agenda", target: "Seminar Teologi", time: "1 jam yang lalu" },
  { user: "System", action: "Auto-backup", target: "Database SQL", time: "4 jam yang lalu" }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
            <ShieldCheck size={14} className="text-secondary" />
            <span className="text-muted-foreground">Node:</span> STTB-ADMIN-01
          </div>
          <h1 className="text-4xl font-bold text-foreground uppercase tracking-tighter leading-none">
            Dashboard <span className="text-muted-foreground opacity-40 italic">Control</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Waktu Sistem</p>
            <p className="text-xs font-mono text-text">04:12:45</p>
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all border border-primary">
            Sinkronisasi Data
          </button>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-lg group transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-muted text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {stat.icon}
              </div>
              <button className="text-muted-foreground hover:text-text p-1">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-text tracking-tighter">{stat.value}</h3>
                <div className="flex items-center gap-1 text-[9px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-sm border border-secondary/20">
                  <TrendingUp size={10} />
                  {stat.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Activity Feed Container */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text flex items-center gap-3">
                <Clock size={16} className="text-secondary" /> Log Aktivitas Terakhir
              </h4>
              <button className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:opacity-70">
                Lihat Semua <ArrowRight size={12} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest">Operator</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest">Kegiatan</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest">Durasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/20">
                            {log.user.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-text uppercase tracking-tight">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-text">{log.action}</p>
                          <p className="text-[10px] text-muted-foreground italic">{log.target}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-medium text-muted-foreground uppercase">{log.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side Info Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Primary Status Card */}
          <div className="bg-primary p-8 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[320px] border border-primary">
            <Activity className="absolute -right-8 -bottom-8 w-40 h-40 text-primary-foreground opacity-5 rotate-12" />

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <h4 className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">Security Protocol</h4>
                <h5 className="text-2xl font-bold font-serif italic text-primary-foreground leading-tight tracking-tighter">
                  Integrity in Academic Governance
                </h5>
              </div>
              <p className="text-[11px] text-primary-foreground opacity-70 leading-relaxed italic border-l border-secondary pl-4">
                Pastikan koneksi ASP.NET Core API berada dalam status "Connected" sebelum melakukan modifikasi data permanen.
              </p>
            </div>

            <div className="relative z-10 pt-8">
              <div className="bg-primary-foreground/10 p-4 rounded-lg border border-primary-foreground/10 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground opacity-60">Status API</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)] animate-pulse" />
                  <span className="text-[10px] font-bold text-primary-foreground uppercase">Linked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Utility Card */}
          <div className="bg-card border border-border p-6 rounded-lg">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Pesan Sistem</h4>
            <div className="p-4 bg-muted border-l-4 border-danger rounded-sm">
              <p className="text-[11px] text-text font-medium leading-relaxed">
                Terdapat 3 berkas pendaftaran mahasiswa baru yang memerlukan verifikasi manual segera.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;