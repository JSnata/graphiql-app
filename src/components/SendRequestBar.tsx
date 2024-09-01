'use client';

import MethodSelector from '@/components/MethodSelector';
import Endpoint from '@/components/Endpoint';
import { Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/lib/hook';
import { setResponseBody, setStatusCode } from '@/lib/features/restSlice';

export default function SendRequestBar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const handleSend = async () => {
        // console.log(pathname);
        const requestParams = pathname.split('/').filter(Boolean);
        // console.log(requestParams);
        if (requestParams[1]) {
            const decode = atob(requestParams[1]);
            // console.log(decode);
            const response = await fetch(
                decode,
                { method: requestParams[0] },
                // { headers: { 'Content-Type': 'application/json' } },
                // { body: decode },
            );
            // console.log(response);
            dispatch(setStatusCode(response.status));
            dispatch(setResponseBody(await response.json()));
        }
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MethodSelector />
            <Endpoint />
            <Button variant="contained" onClick={handleSend}>
                Send
            </Button>
        </Box>
    );
}
