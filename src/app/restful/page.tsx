'use client';

import { Box, Stack } from '@mui/material';
import Endpoint from '@/components/Endpoint';
import HttpHeaders from '@/components/HttpHeaders';
import MethodSelector from '@/components/MethodSelector';
import HttpBody from '@/components/HttpBody';

export default function Restful() {
    return (
        <Stack spacing={3} component="section" alignItems="center" sx={{ margin: '0 auto', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <MethodSelector />
                <Endpoint />
            </Box>

            <HttpHeaders />
            <HttpBody />
        </Stack>
    );
}
