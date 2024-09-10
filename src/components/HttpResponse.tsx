'use client';

import { Box, Stack, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import ChipStatusCode from '@/components/ui/ChipStatusCode';
import { useEffect } from 'react';
import { setResponseBody } from '@/lib/features/requestSlice';

export default function HttpResponse() {
    const t = useTranslations('Request');
    const response = useAppSelector((state) => state.request.responseBody);
    const statusCode = useAppSelector((state) => state.request.statusCode);
    const dispatch = useAppDispatch();
    const formattedResponse = JSON.stringify(response, null, 2);

    useEffect(() => {
        dispatch(setResponseBody({}));
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
            />
        </Box>
    );
}
