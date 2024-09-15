'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import AuthForm from '@/components/Auth/AuthForm';
import { auth } from '@/lib/firebase/config';
import { useTranslations } from 'next-intl';
import { Box } from '@mui/material';
import { useAuth } from '@/components/AuthWatcher';

export default function SignUp() {
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
            const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
            if (result.user) {
                router.push('/signin');
                toast.success(t('toastRegisterS'));
            }
        } catch (submiterror) {
            setError(submiterror.message);
            toast.error(`${t('toastAuthE')} ${submiterror.message}`);
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
                    buttonText={t('signup')}
                    linkText={t('haveAcc')}
                    linkHref="/signin"
                    error={error}
                />
            </Box>
        )
    );
}
