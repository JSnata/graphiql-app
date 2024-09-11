'use client';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/AuthWatcher';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import InfoCard from '../components/ui/InfoCard';

export default function Home() {
    const t = useTranslations('Auth');
    const tAbout = useTranslations('About');
    const { user, loading } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    if (loading) {
        return <div>{t('loading')}</div>;
    }

    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
            }}
        >
            <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>{`${t('welcome')} Restful/GraphQL Client`}</Typography>
                <Typography variant="body1">{`${tAbout('project')}`}</Typography>
            </Box>
            <Box>
                {user ? (
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
                        <Link href="/history">
                            <Button variant="contained">{t('history')}</Button>
                        </Link>
                        <Button variant="contained" color="secondary" onClick={handleSignOut}>
                            {t('logout')}
                        </Button>
                    </Stack>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
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
            <Box sx={{ mb: 4 }}>
                <Divider sx={{ mb: 4 }} />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <InfoCard
                        name={`${tAbout('ilya')}`}
                        github="LinderJK"
                        githubLink="https://github.com/LinderJK"
                        location={`${tAbout('moscow')}`}
                    />
                    <InfoCard
                        name={`${tAbout('natallia')}`}
                        github="JSNata"
                        githubLink="https://github.com/jsnata"
                        location={`${tAbout('poland')}`}
                    />
                    <InfoCard
                        name="Denis Shmuratkin"
                        github="DialecticalLaw"
                        githubLink="https://github.com/DialecticalLAw"
                        location={`${tAbout('syktyvkar')}`}
                    />
                </Stack>
            </Box>
        </Box>
    );
}
