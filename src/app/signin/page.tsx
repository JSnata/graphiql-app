'use client';

import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthForm from '@/components/Auth/AuthForm';
import { useTranslations } from 'next-intl';
import { Box } from '@mui/material';

export default function SignIn() {
    const [error, setError] = useState('');
    const router = useRouter();
    const { data: session } = useSession();
    const t = useTranslations('Auth');

    const handleSubmit = async (values) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                setError(result.error);
                toast.error(`${t('toastAuthE')} ${result.error}`);
            } else {
                toast.success(t('toastLoginS'));
                router.push('/');
            }
        } catch (err) {
            toast.error(`${t('toastAuthE')} ${err}`);
        }
    };

    if (session) {
        router.push('/');
        return null;
    }

    return (
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
    );
}
