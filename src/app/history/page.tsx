'use client';

import { Box, Button, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { getSortedRequests } from '@/utils/saveRequestsToLocalStorage';
import Link from 'next/link';

export default function HistoryPage() {
    const t = useTranslations('History');
    const requests = getSortedRequests();
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
            <List>
                {requests.map((request) => {
                    const date = new Date(request.timestamp).toLocaleString();
                    return (
                        <ListItemButton component="a" href={request.type} key={request.timestamp}>
                            <ListItemText
                                primary={date}
                                secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            fontWeight={700}
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            {request.method}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            {request.url}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </>
    );
}
