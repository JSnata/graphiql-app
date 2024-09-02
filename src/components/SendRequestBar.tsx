'use client';

import MethodSelector from '@/components/MethodSelector';
import Endpoint from '@/components/Endpoint';
import { Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { setResponseBody, setStatusCode } from '@/lib/features/restSlice';
import { useTranslations } from 'next-intl';
import generateRequestBodyWithVars, { generateHeaders } from '@/utils/generateRequestBodyWithVars';
import { toast } from 'react-toastify';

export default function SendRequestBar() {
    const pathname = usePathname();
    const t = useTranslations('Request');
    const dispatch = useAppDispatch();
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const headers = useAppSelector((state) => state.variables.variablesHeader);

    const handleSend = async () => {
        const requestParams = pathname.split('/').filter(Boolean);
        const decodeData = {
            method: requestParams[0].toUpperCase(),
            url: requestParams[1] ? atob(decodeURIComponent(requestParams[1])) : '',
            body: requestParams[2] ? atob(decodeURIComponent(requestParams[2])) : null,
        };

        if (decodeData.url) {
            const requestOptions: RequestInit = { method: decodeData.method };
            try {
                if (decodeData.body && decodeData.method !== 'GET') {
                    requestOptions.body = generateRequestBodyWithVars(decodeData.body, variablesBody);
                    requestOptions.headers = generateHeaders(headers);
                }
            } catch (err) {
                toast.warn(err.message);
            }

            try {
                const response = await fetch(decodeData.url, requestOptions);
                const data = await response.json();
                dispatch(setStatusCode(response.status));
                dispatch(setResponseBody(data));
            } catch (err) {
                console.error(err);
                toast.error(`Error ${err}`);
            }
            // console.log(requestOptions);

            // console.log(data);
            // console.log(response);
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
