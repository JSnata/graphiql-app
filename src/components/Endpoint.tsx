'use client';

import React from 'react';
import { TextField } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { decodeBase64, encodeBase64 } from '@/utils/base64';

export default function Endpoint() {
    const { request } = useParams<{ request: string[] }>();
    const t = useTranslations('Request');
    const searchParams = useSearchParams();

    return (
        <TextField
            onChange={(e) =>
                window.history.replaceState(
                    null,
                    '',
                    `/${request[0]}${e.target.value ? `/${encodeBase64(e.target.value)}` : ''}/${request[2] || ''}?${searchParams.toString()}`,
                )
            }
            sx={{
                width: '70%',
                '& .MuiInputBase-root': {
                    borderRadius: 0,
                },
            }}
            label={t('emptyEndpoint')}
            defaultValue={request[1] ? decodeBase64(decodeURIComponent(request[1])) : ''}
        />
    );
}
