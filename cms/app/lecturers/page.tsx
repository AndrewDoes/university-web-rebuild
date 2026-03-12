'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
    GraduationCap,
    Plus,
    Search,
    Edit2,
    Trash2,
    Loader2,
    AlertCircle,
    X,
    Save,
    User
} from 'lucide-react';
import { api, LecturerDto } from '../services/api';

const EMPTY_FORM: Partial<LecturerDto> = {
    name: '',
    position: '',
    description: '',
    photo: '',
};

export default function LecturersPage() {
    const [lecturers, setLecturers] = useState<LecturerDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLecturer, setEditingLecturer] = useState<LecturerDto | null>(null);
    const [formData, setFormData] = useState<Partial<LecturerDto>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchLecturers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.lecturers.getAll();
            setLecturers(data || []);
        } catch {
            setError("Gagal memuat data dosen. Pastikan API aktif.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLecturers(); }, []);

    const openCreate = () => {
        setEditingLecturer(null);
        setFormData(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEdit = (lecturer: LecturerDto) => {
        setEditingLecturer(lecturer);
        setFormData({
            name: lecturer.name,
            position: lecturer.position,
            description: lecturer.description,
            photo: lecturer.photo,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingLecturer(null);
        setFormData(EMPTY_FORM);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.position) return;
        setSaving(true);
        try {
            if (editingLecturer) {
                await api.lecturers.update(editingLecturer.id, formData);
            } else {
                await api.lecturers.create(formData);
            }
            closeModal();
            await fetchLecturers();
        } catch {
            setError("Gagal menyimpan data dosen.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus dosen ini?")) return;
        setDeletingId(id);
        try {
            await api.lecturers.delete(id);
            await fetchLecturers();
        } catch {
            setError("Gagal menghapus dosen.");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = lecturers.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans p-4 md:p-8 text-left">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                        Dosen <span className="text-primary italic">Directory</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-[0.3em]">
                        Manajemen Data Dosen STTB
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all w-fit"
                >
                    <Plus size={16} /> Tambah Dosen
                </button>
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Cari nama atau jabatan dosen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all shadow-sm"
                    />
                </div>
                <button
                    onClick={fetchLecturers}
                    className="flex items-center gap-2 px-6 py-3 bg-muted border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                    <Loader2 size={16} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                {loading && lecturers.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Memuat data dosen...</p>
                    </div>
                ) : error ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-danger">
                        <AlertCircle size={48} />
                        <p className="text-sm font-bold uppercase">{error}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Foto & Nama</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Jabatan</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Deskripsi</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground text-sm">
                                            Belum ada data dosen. Klik &ldquo;Tambah Dosen&rdquo;.
                                        </td>
                                    </tr>
                                ) : filtered.map((lecturer) => (
                                    <tr key={lecturer.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                {lecturer.photo ? (
                                                    <img src={lecturer.photo} alt={lecturer.name} className="w-10 h-10 rounded-full object-cover border border-border shrink-0" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-border flex items-center justify-center shrink-0">
                                                        <User size={18} className="text-primary opacity-60" />
                                                    </div>
                                                )}
                                                <p className="text-sm font-bold text-foreground tracking-tight">{lecturer.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {lecturer.position}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[11px] text-muted-foreground line-clamp-2 max-w-xs italic">
                                                {lecturer.description || '—'}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-20 group-hover:opacity-100 transition-all">
                                                <button
                                                    onClick={() => openEdit(lecturer)}
                                                    className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                                                ><Edit2 size={16} /></button>
                                                <button
                                                    onClick={() => handleDelete(lecturer.id)}
                                                    disabled={deletingId === lecturer.id}
                                                    className="p-2.5 hover:bg-danger/10 hover:text-danger rounded-xl transition-colors disabled:opacity-40"
                                                >
                                                    {deletingId === lecturer.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="text-primary" size={22} />
                                <h2 className="font-bold text-sm uppercase tracking-widest text-foreground">
                                    {editingLecturer ? 'Edit Dosen' : 'Tambah Dosen Baru'}
                                </h2>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-muted rounded-xl transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    Nama Lengkap *
                                </label>
                                <input
                                    id="lecturer-name"
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                    placeholder="Dr. Samuel Wijaya, M.Th."
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    Jabatan / Bidang *
                                </label>
                                <input
                                    id="lecturer-position"
                                    type="text"
                                    value={formData.position || ''}
                                    onChange={e => setFormData(p => ({ ...p, position: e.target.value }))}
                                    placeholder="Dosen Teologi Sistematik"
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    URL Foto
                                </label>
                                <input
                                    id="lecturer-photo"
                                    type="text"
                                    value={formData.photo || ''}
                                    onChange={e => setFormData(p => ({ ...p, photo: e.target.value }))}
                                    placeholder="/images/lecturers/nama.jpg"
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="lecturer-description"
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                    placeholder="Deskripsi singkat tentang dosen..."
                                    className="w-full bg-muted border border-border px-4 py-3 rounded-xl text-sm outline-none focus:border-primary transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2.5 bg-muted text-muted-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all"
                            >
                                Batal
                            </button>
                            <button
                                id="lecturer-save-btn"
                                onClick={handleSave}
                                disabled={saving || !formData.name || !formData.position}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                {saving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
