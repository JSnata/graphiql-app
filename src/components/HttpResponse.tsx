'use client';

import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import ChipStatusCode from '@/components/ui/ChipStatusCode';
import { json } from '@codemirror/lang-json';
import { setResponseBody, setStatusCode } from '@/lib/features/requestSlice';

export default function HttpResponse() {
    const t = useTranslations('Request');
    const dispatch = useAppDispatch();
    const responseBody = useAppSelector((state) => state.request.responseBody);
    const statusCode = useAppSelector((state) => state.request.statusCode);
    const formattedResponse = JSON.stringify(responseBody, null, 2);

    useEffect(() => {
        dispatch(setResponseBody({}));
        dispatch(setStatusCode(null));
    }, [dispatch]);

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
                {t('response')}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 2 }}>
                <Typography variant="body1">{t('status')}</Typography>
                <ChipStatusCode statusCode={statusCode} />
            </Stack>
            <Typography variant="body1">{t('responseBody')}</Typography>
            <CodeMirror
                editable={false}
                value={formattedResponse}
                readOnly
                theme="light"
                minHeight="220px"
                maxHeight="800px"
                extensions={[json()]}
            />
        </Box>
    );
}
