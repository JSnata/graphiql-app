'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthForm from '@/components/Auth/AuthForm';
import { useTranslations } from 'next-intl';
import { Box } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/components/AuthWatcher';
import { auth } from '../../lib/firebase/config';

export default function SignIn() {
    const [error, setError] = useState('');
    const router = useRouter();
    const t = useTranslations('Auth');
    const { user, loading } = useAuth();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    if (loading) {
        return <div>{t('loading')}</div>;
    }

    const handleSubmit = async (values) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast.success(t('toastLoginS'));
            router.push('/');
        } catch (err) {
            setError('Ошибка входа. Проверьте данные.');
            toast.error(`${t('toastAuthE')} ${err.message}`);
        }
    };

    return (
        !user && (
            <Box
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AuthForm
                    handleSubmit={handleSubmit}
                    buttonText={t('signin')}
                    linkText={t('noHaveAcc')}
                    linkHref="/signup"
                    error={error}
                />
            </Box>
        )
    );
}
