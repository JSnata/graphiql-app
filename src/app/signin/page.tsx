'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthForm from '@/components/AuthForm';

export default function SignIn() {
    const [error, setError] = useState('');
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            redirect('/');
        }
    }, [session, router]);

    const handleSubmit = async (values) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                setError(result.error);
                toast.error(`Error: ${result.error}`);
            } else {
                toast.success('Logged in successfully!');
                router.push('/');
            }
        } catch (err) {
            toast.error(`Error: ${err}`);
        }
    };

    return (
        <AuthForm
            handleSubmit={handleSubmit}
            buttonText="Login"
            linkText="Do not have an account?"
            linkHref="/signup"
            error={error}
        />
    );
}
