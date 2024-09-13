'use client';

import { Box, Button, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { getSortedRequests } from '@/utils/saveRequestsToLocalStorage';
import Link from 'next/link';
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
        router.push('/get');
    };

    if (requests && requests.length === 0) {
        return (
            <>
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
            <Box
                sx={{
                    width: '35%',
                    height: '65%',
                    zIndex: -1,
                    transform: 'translate(30%)',
                    opacity: 0.1,
                    backgroundImage: 'url("./history.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    margin: 'auto',
                }}
            />
        </Box>
    );
}
