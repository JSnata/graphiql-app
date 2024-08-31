'use client';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function Home() {
    const { data: session, status } = useSession();
    const t = useTranslations('Auth');
    if (status === 'loading') {
        return <div>Loading...</div>;
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
            <Box>
                {session && (
                    <Stack
                        spacing={2}
                        direction={{ xs: 'column', sm: 'row' }}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Link href="/get">
                            <Button variant="contained">Restful</Button>
                        </Link>
                        <Link href="/graphql">
                            <Button variant="contained">GraphQL</Button>
                        </Link>
                        <Button variant="contained" color="secondary" onClick={() => signOut()}>
                            {t('logout')}
                        </Button>
                    </Stack>
                )}
                {!session && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        {' '}
                        <Typography variant="h4">{`${t('welcome')} Restful/GraphQL Client`}</Typography>
                        <Stack direction="row" spacing={2}>
                            <Link href="/signin">
                                <Button variant="contained">{t('signin')}</Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="contained">{t('signup')}</Button>
                            </Link>
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
