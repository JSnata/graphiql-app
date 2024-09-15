import React from 'react';
import { Stack, Typography } from '@mui/material';
import HttpBody from '@/components/HttpBody';
import HttpResponse from '@/components/HttpResponse';
import SendRequestBar from '@/components/SendRequestBar';
import RestTabsSection from '@/components/RestTabsSection';

export default function Restful() {
    return (
        <Stack spacing={3} component="section" alignItems="center" sx={{ m: 2, width: '100%' }}>
            <Typography variant="h4">Restful Client</Typography>
            <SendRequestBar />
            <RestTabsSection />
            <HttpBody />
            <HttpResponse />
        </Stack>
    );
}
