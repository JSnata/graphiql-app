'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            {session && (
                <div>
                    <Typography variant="h5">Email: {session.user?.email}!</Typography>
                    <Typography variant="h1">GraphQL Task</Typography>
                    <Link href="/restful">
                        <Button variant="contained">Restful</Button>
                    </Link>
                </div>
            )}
            <Button onClick={() => signOut()}>Sign Out</Button>
        </Box>
    );
}
