'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (status === 'unauthenticated') {
    //         router.push('/signin');
    //     }
    // }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            {session && (
                <div>
                    <Typography variant="h5">Email: {session.user?.email}!</Typography>
                    <Typography variant="h1">GraphQL Task</Typography>
                    <Link href="/get">
                        <Button variant="contained">Restful</Button>
                    </Link>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </div>
            )}
            {!session && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Link href="/signin">
                        <Button variant="contained">SignIn</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="contained">SignUp</Button>
                    </Link>
                </Box>
            )}
        </Box>
    );
}
