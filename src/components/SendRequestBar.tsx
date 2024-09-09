'use client';

import MethodSelector from '@/components/MethodSelector';
import Endpoint from '@/components/Endpoint';
import { Box, Button } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { setResponseBody, setStatusCode, setStatusText } from '@/lib/features/restSlice';
import { useTranslations } from 'next-intl';
import generateRequestBodyWithVars, { generateHeaders, toVariablesArray } from '@/utils/generateRequestBodyWithVars';
import { toast } from 'react-toastify';
import { saveRequestsToLocalStorage } from '@/utils/saveRequestsToLocalStorage';
import { ILsRequestData } from '@/types/lsData';

export default function SendRequestBar() {
    const pathname = usePathname();
    const t = useTranslations('Request');
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);

    const handleSend = async () => {
        const requestParams = pathname.split('/').filter(Boolean);
        const decodeData = {
            method: requestParams[0].toUpperCase(),
            url: requestParams[1] ? atob(decodeURIComponent(requestParams[1])) : '',
            body: requestParams[2] ? atob(decodeURIComponent(requestParams[2])) : null,
        };

        if (decodeData.url) {
            const requestOptions: RequestInit = { method: decodeData.method };
            const headers = toVariablesArray(searchParams);
            try {
                if (decodeData.body && decodeData.method !== 'GET') {
                    requestOptions.body = generateRequestBodyWithVars(decodeData.body, variablesBody);
                }
                requestOptions.headers = generateHeaders(headers);
            } catch (err) {
                toast.warn(err.message);
            }

            try {
                const response = await fetch(decodeData.url, requestOptions);
                const statusCode = response.status;
                dispatch(setStatusCode(statusCode));
                const contentType = response.headers.get('content-type');

                let data: { [key: string]: string } | string;
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json();
                } else {
                    data = await response.text();
                }
                dispatch(setResponseBody(data as { [key: string]: string }));
                saveRequestsToLocalStorage({
                    type: 'REST',
                    method: decodeData.method,
                    url: decodeData.url,
                    body: decodeData.body,
                    headers,
                } as ILsRequestData);
            } catch (err) {
                dispatch(setStatusText(err.message));
                toast.error(`Error ${err}`);
            }
        }
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MethodSelector />
            <Endpoint />
            <Button sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} variant="contained" onClick={handleSend}>
                {t('send')}
            </Button>
        </Box>
    );
}
