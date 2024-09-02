'use client';

import MethodSelector from '@/components/MethodSelector';
import Endpoint from '@/components/Endpoint';
import { Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/lib/hook';
import { setResponseBody, setStatusCode } from '@/lib/features/restSlice';
import { useTranslations } from 'next-intl';

export default function SendRequestBar() {
    const pathname = usePathname();
    const t = useTranslations('Request');
    const dispatch = useAppDispatch();
    const handleSend = async () => {
        const requestParams = pathname.split('/').filter(Boolean);
        const decodeData = {
            method: requestParams[0],
            url: requestParams[1] ? atob(requestParams[1]) : '',
            body: requestParams[2] ? atob(requestParams[2]) : null,
        };

        if (decodeData.url) {
            const requestOptions: RequestInit = { method: decodeData.method };
            if (decodeData.body) {
                requestOptions.body = decodeData.body;
                requestOptions.headers = {
                    'Content-Type': 'application/json',
                };
            }
            const response = await fetch(
                decode,
                { method: requestParams[0] },
                // { headers: { 'Content-Type': 'application/json' } },
                // { body: decode },
            );
            const data = await response.json();
            // console.log(data);
            // console.log(response);
            dispatch(setStatusCode(response.status));
            dispatch(setResponseBody(data));
        }
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MethodSelector />
            <Endpoint />
            <Button variant="contained" onClick={handleSend}>
                {t('send')}
            </Button>
        </Box>
    );
}
