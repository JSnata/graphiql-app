'use client';

import { Box, Stack, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/lib/hook';
import ChipStatusCode from '@/components/ui/ChipStatusCode';
import { json } from '@codemirror/lang-json';

export default function HttpResponse() {
    const t = useTranslations('Request');
    const response = useAppSelector((state) => state.rest.responseBody);
    const statusCode = useAppSelector((state) => state.rest.statusCode);
    const formattedResponse = JSON.stringify(response, null, 2);
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
