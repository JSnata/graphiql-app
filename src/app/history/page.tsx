'use client';

import { Box, Button, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { getSortedRequests } from '@/utils/saveRequestsToLocalStorage';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/hook';
import { ILsRequestData } from '@/types/lsData';
import { useRouter } from 'next/navigation';
import { encodeBase64 } from '@/utils/base64';
import { setVariables } from '@/lib/features/variablesSlice';

export default function HistoryPage() {
    const t = useTranslations('History');
    const requests = getSortedRequests();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = (data: ILsRequestData) => {
        dispatch(setVariables(data.variables));
        const params = new URLSearchParams();
        data.headers.forEach(({ key, value }) => params.set(encodeURIComponent(key), encodeURIComponent(value)));
        router.push(
            `${data.method.toLowerCase()}/${encodeBase64(data.url)}/${encodeBase64(data.body)}?${params.toString()}`,
        );
    };

    if (requests && requests.length === 0) {
        return (
            <Box textAlign="center" pt={3}>
                <Typography variant="h4">{t('title')}</Typography>
                <Typography variant="body1">{t('empty')}</Typography>
                <Typography variant="body1">{t('try')}</Typography>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 2 }}>
                    <Link href="/get">
                        <Button variant="contained">Restful</Button>
                    </Link>
                    <Link href="/graphql">
                        <Button variant="contained">GraphQL</Button>
                    </Link>
                </Stack>
            </Box>
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
