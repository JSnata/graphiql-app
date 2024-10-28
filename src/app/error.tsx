'use client';

import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const t = useTranslations('ErrorPages');

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                {t('errorTitle')}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {t('errorDescription')}
            </Typography>
            <Button variant="contained" color="primary" onClick={reset} sx={{ marginTop: 2 }}>
                {t('tryButton')}
            </Button>
        </Box>
    );
}
