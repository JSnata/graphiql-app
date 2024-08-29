'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import AuthForm from '@/components/Auth/AuthForm';
import { useSession } from 'next-auth/react';
import { auth } from '@/lib/firebase/config';
import { useTranslations } from 'next-intl';
import { Box } from '@mui/material';

export default function SignUp() {
    const [error, setError] = useState('');
    const router = useRouter();
    const { data: session } = useSession();
    const t = useTranslations('Auth');

    const handleSubmit = async (values) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
            if (result.user) {
                router.push('/signin');
                toast.success(t('toastRegisterS'));
            }
        } catch (submiterror) {
            setError(submiterror.message);
            toast.error(`Error: ${submiterror}`);
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
                buttonText={t('signup')}
                linkText={t('haveAcc')}
                linkHref="/signin"
                error={error}
            />
        </Box>
    );
}
