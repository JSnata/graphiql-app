'use client';

import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
                Something went wrong!
            </Typography>
            <Typography variant="body1" gutterBottom>
                An unexpected error occurred. Please try again later.
            </Typography>
            <Button variant="contained" color="primary" onClick={reset} sx={{ marginTop: 2 }}>
                Try again
            </Button>
        </Box>
    );
}
