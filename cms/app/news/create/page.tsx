'use client'
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { NewsForm } from '@/app/components/news/CreateNewsForm';

const CreateNewsPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCreate = async (formData: any) => {
        setLoading(true);
        try {
            // Panggil API (Pastikan C# NewsController sudah punya [HttpPost])
            // await api.news.create(formData); 
            console.log("Mengirim data ke backend:", formData);

            setSuccess(true);
            // Redirect atau reset form setelah sukses
        } catch (err) {
            alert("Gagal menyimpan berita. Periksa backend C#.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 font-sans">
            <a href="/news" className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] no-underline">
                <ArrowLeft size={16} /> Kembali
            </a>

            <div className="text-left space-y-2">
                <h2 className="text-4xl font-bold text-text uppercase tracking-tighter">Compose Article</h2>
            </div>

            {success && (
                <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center gap-4 text-secondary">
                    <CheckCircle2 size={24} />
                    <p className="text-xs font-bold uppercase tracking-widest">Berita Terbit!</p>
                </div>
            )}

            <NewsForm onSubmit={handleCreate} isLoading={loading} />
        </div>
    );
};

export default CreateNewsPage;