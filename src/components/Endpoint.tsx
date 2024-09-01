'use client';

import { TextField } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Endpoint() {
    const { request } = useParams<{ request: string[] }>();
    const t = useTranslations('Request');
    return (
        <TextField
            onChange={(e) =>
                window.history.replaceState(
                    null,
                    '',
                    `/${request[0]}${e.target.value ? `/${btoa(e.target.value)}` : ''}/${request[2] || ''}`,
                )
            }
            sx={{ width: '70%', '& .MuiInputBase-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
            label={t('emptyEndpoint')}
            defaultValue={request[1] ? atob(decodeURIComponent(request[1])) : ''}
        />
    );
}
