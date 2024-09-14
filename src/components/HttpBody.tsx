'use client';

import { Box, Button, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import makeBeautify from '@/utils/makeBautify';

export default function HttpBody() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Request');
    const params = pathname.split('/').filter(Boolean); // аналог useParams, обновляющийся при использовании history API
    const [code, setCode] = useState(atob(decodeURIComponent(params[2] || '')));
    const [error, setError] = useState('');

    const handleFormat = async () => {
        const result = await makeBeautify(code, 'json');
        setCode(result.code);
        setError(result.error);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <CodeMirror
                value={code}
                onChange={setCode}
                onBlur={() => {
                    if (params[1]) {
                        replace(`/${params[0]}/${params[1]}/${btoa(code)}`);
                    } else {
                        setError(t('emptyEndpoint'));
                    }
                }}
                placeholder="Text/JSON"
                theme="light"
                height="150px"
                // style={{ fontSize: '18px' }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    mt: 2,
                }}
            >
                <Button onClick={handleFormat} variant="contained">
                    {t('beautify')}
                </Button>
                {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            </Box>
        </Box>
    );
}
