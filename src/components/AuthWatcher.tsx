'use client';

import { useEffect } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const handleLogout = async () => {
    try {
        await signOut({ callbackUrl: '/' });
    } catch (err) {
        console.error('Error during logout:', err);
    }
};

function AuthWatcher() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && session) {
            const intervalId = setInterval(async () => {
                const sessionToken = await getSession();
                if (!sessionToken) {
                    await handleLogout();
                    router.push('/');
                }
            }, 3000);

            return () => clearInterval(intervalId);
        }

        // Возвращаем undefined, если условие не выполнено
        return undefined;
    }, [status, session, router]);

    return null;
}

export default AuthWatcher;
