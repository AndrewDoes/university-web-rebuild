'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setStoredAuth, getStoredAuth } from '../services/api';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const auth = getStoredAuth();

        if (auth && auth.role?.toLowerCase() === 'admin') {
            router.replace('/');
        }
    }, [router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail.endsWith('@sttb.com')) {
            setError('Email admin harus menggunakan domain @sttb.com.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5176/api/auth/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: normalizedEmail,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Email atau password salah.');
                setLoading(false);
                return;
            }

            if (data.role?.toLowerCase() !== 'admin') {
                setError('Akses ditolak. Hanya admin yang bisa masuk.');
                setLoading(false);
                return;
            }

            setStoredAuth(data);
            router.replace('/');
        } catch {
            setError('Tidak dapat terhubung ke server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground">Admin Login</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Masuk ke STTB CORE CMS
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-border bg-muted/30 rounded-xl px-4 py-3 outline-none focus:border-primary"
                            placeholder="admin@sttb.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-border bg-muted/30 rounded-xl px-4 py-3 outline-none focus:border-primary"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}