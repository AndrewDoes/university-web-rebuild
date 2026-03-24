'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearStoredAuth, getStoredAuth } from '@/app/services/api';

type AuthData = {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
};

export default function SettingsPage() {
    const router = useRouter();
    const [auth, setAuth] = useState<AuthData | null>(null);

    useEffect(() => {
        const storedAuth = getStoredAuth();

        if (!storedAuth) {
            router.replace('/login');
            return;
        }

        setAuth(storedAuth);
    }, [router]);

    const handleLogout = () => {
        clearStoredAuth();
        router.replace('/login');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Sistem Admin</h1>
                <p className="text-sm text-muted-foreground mt-2">
                    Informasi akun admin yang sedang login.
                </p>
            </div>

            <div className="max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                    Profil Admin
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Nama</p>
                        <p className="text-base font-medium text-foreground">
                            {auth?.name || '-'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Email</p>
                        <p className="text-base font-medium text-foreground">
                            {auth?.email || '-'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Role</p>
                        <p className="text-base font-medium text-foreground uppercase">
                            {auth?.role || '-'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Status</p>
                        <p className="text-base font-medium text-green-400">
                            Active
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="px-5 py-3 rounded-xl bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}