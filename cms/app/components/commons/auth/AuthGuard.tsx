'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getStoredAuth, clearStoredAuth } from '@/app/services/api';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const isLoginPage = pathname === '/login';
        const auth = getStoredAuth();

        if (isLoginPage) {
            setAllowed(true);
            return;
        }

        if (!auth) {
            router.replace('/login');
            return;
        }

        if (auth.role?.toLowerCase() !== 'admin') {
            clearStoredAuth();
            router.replace('/login');
            return;
        }

        setAllowed(true);
    }, [pathname, router]);

    if (!allowed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}