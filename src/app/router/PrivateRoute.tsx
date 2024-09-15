'use client';

import React, { useEffect, ReactNode } from 'react';
import { useAuth } from '@/components/AuthWatcher';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element | null {
    const { user, loading } = useAuth();
    const router = useRouter();
    const t = useTranslations('Auth');

    useEffect(() => {
        if (!user && !loading) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>{t('loading')}</div>;
    }
    return <>{children}</>;
}
