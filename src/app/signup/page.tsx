'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import AuthForm from '@/components/Auth/AuthForm';
import { useSession } from 'next-auth/react';
import { auth } from '../../lib/firebase/config';

export default function SignUp() {
    const [error, setError] = useState('');
    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async (values) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
            if (result.user) {
                router.push('/signin');
                toast.success('Signed up successfully!');
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
        <AuthForm
            handleSubmit={handleSubmit}
            buttonText="Sign Up"
            linkText="Already have an account?"
            linkHref="/signin"
            error={error}
        />
    );
}