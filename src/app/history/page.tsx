'use client';

import { Box, Button, CircularProgress, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/hook';
import { ILsRequestData } from '@/types/lsData';
import { useRouter } from 'next/navigation';
import { encodeBase64 } from '@/utils/base64';
import { setVariables } from '@/lib/features/variablesSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HistoryIcon from '@mui/icons-material/History';
import { useEffect, useState } from 'react';
import { setQuery, setSdl } from '@/lib/features/requestSlice';
import PrivateRoute from '../router/PrivateRoute';

export default function HistoryPage() {
    const t = useTranslations('History');
    const [requests, setRequests] = useState<ILsRequestData[]>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const LSRequests: ILsRequestData[] = JSON.parse(localStorage.getItem('requests')) || [];
        const sortedRequests = LSRequests.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setRequests(sortedRequests);
    }, []);

    const handleClick = (data: ILsRequestData) => {
        dispatch(setVariables(data.variables));
        if (data.method === 'GRAPHQL') {
            dispatch(setQuery(data.body));
            dispatch(setSdl(data.sdl));
        }
        const params = new URLSearchParams();
        data.headers.forEach(({ key, value }) => params.set(encodeURIComponent(key), encodeURIComponent(value)));
        router.push(`${data.method}/${encodeBase64(data.url)}/${encodeBase64(data.body)}?${params.toString()}`);
    };

    if (!requests) {
        return (
            <PrivateRoute>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        m: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
            </PrivateRoute>
        );
    }

    if (requests.length === 0) {
        return (
            <PrivateRoute>
                <Box textAlign="center" pt={3}>
                    <Typography variant="h4">{t('title')}</Typography>
                    <Typography variant="body1">{t('empty')}</Typography>
                    <Typography variant="body1">{t('try')}</Typography>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 2 }}>
                        <Link href="/GET">
                            <Button variant="contained">Restful</Button>
                        </Link>
                        <Link href="/graphql">
                            <Button variant="contained">GraphQL</Button>
                        </Link>
                    </Stack>
                </Box>
            </PrivateRoute>
        );
    }
    return (
        <PrivateRoute>
            <Box position="relative">
                <Box sx={{ py: 5 }}>
                    <Typography textAlign="center" variant="h4">
                        {t('title')}
                    </Typography>
                    <List>
                        {requests.map((request) => {
                            const date = new Date(request.timestamp).toLocaleString();
                            return (
                                <Box key={request.timestamp}>
                                    <ListItemButton
                                        divider
                                        component="button"
                                        onClick={() => handleClick(request)}
                                        sx={{ width: '100%' }}
                                    >
                                        <ArrowForwardIosIcon sx={{ marginRight: 3 }} />
                                        <ListItemText
                                            primary={date}
                                            secondary={
                                                <Typography fontWeight="bold">
                                                    {request.method}
                                                    <Typography component="span" fontWeight="normal">
                                                        {' '}
                                                        {request.url}
                                                    </Typography>
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </Box>
                            );
                        })}
                    </List>
                </Box>
                <HistoryIcon
                    sx={{
                        width: '45%',
                        height: '75%',
                        zIndex: -1,
                        transform: 'translate(35%)',
                        opacity: 0.1,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        margin: 'auto',
                    }}
                />
            </Box>
        </PrivateRoute>
    );
}
