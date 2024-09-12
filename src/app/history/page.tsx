'use client';

import { Box, Button, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { getSortedRequests } from '@/utils/saveRequestsToLocalStorage';
import Link from 'next/link';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useAppDispatch } from '@/lib/hook';
import { setDataLS } from '@/lib/features/requestSlice';
import { ILsRequestData } from '@/types/lsData';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
    const t = useTranslations('History');
    const requests = getSortedRequests();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = (data: ILsRequestData) => {
        dispatch(setDataLS(data));
        router.push(data.type);
    };

    if (requests && requests.length === 0) {
        return (
            <>
                {' '}
                <Typography variant="h5">{t('title')}</Typography>
                <Typography variant="body1">{t('empty')}</Typography>
                <Typography variant="body1">{t('try')}</Typography>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 2 }}>
                    <Link href="/restful">
                        <Button variant="contained">Restful</Button>
                    </Link>
                    <Link href="/graphql">
                        <Button variant="contained">GraphQL</Button>
                    </Link>
                </Stack>
            </>
        );
    }
    return (
        <>
            <Typography variant="h5">{t('title')}</Typography>
            <Grid2 container sx={{ my: 2 }}>
                {requests.map((request) => {
                    const date = new Date(request.timestamp).toLocaleString();
                    return (
                        <Grid2 xs={12} sm={6} md={4} key={request.timestamp} spacing={2}>
                            <ListItemButton
                                component="button"
                                onClick={() => handleClick(request)}
                                sx={{ width: '100%' }}
                                key={request.timestamp}
                            >
                                <ListItemText
                                    primary={date}
                                    secondary={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                fontWeight={700}
                                                sx={{
                                                    color: 'text.primary',
                                                    display: 'inline',
                                                }}
                                            >
                                                {request.method}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{
                                                    color: 'text.primary',
                                                    display: 'inline',
                                                }}
                                            >
                                                {request.url}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItemButton>
                        </Grid2>
                    );
                })}
            </Grid2>
        </>
    );
}
