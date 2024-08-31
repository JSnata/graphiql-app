'use client';

import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';

export default function HttpResponse() {
    const t = useTranslations('Request');

    return (
        <Box sx={{ width: '100%' }}>
            <Typography>{t('status')}</Typography>
            {t('body')}
            <CodeMirror editable={false} readOnly theme="light" maxHeight="200px" style={{ fontSize: '16px' }} />
        </Box>
    );
}
