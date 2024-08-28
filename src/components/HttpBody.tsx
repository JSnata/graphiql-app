'use client';

import { Box, Button, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { format } from 'prettier';
import * as parser from 'prettier/plugins/babel';
import * as estree from 'prettier/plugins/estree';

export default function HttpBody() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const params = pathname.split('/').filter(Boolean); // аналог useParams, обновляющийся при использовании history API
    const [code, setCode] = useState(atob(decodeURIComponent(params[2] || '')));
    const [error, setError] = useState('');

    const makeBeautify = async () => {
        if (!code) return;
        try {
            if (code.trim().startsWith('{') && code.trim().endsWith('}')) {
                setCode(await format(code, { parser: 'json', plugins: [parser, estree] }));
            }
            setError('');
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
        }
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
                        setError('Please enter the endpoint');
                    }
                }}
                placeholder="String or JSON"
                theme="light"
                height="150px"
                style={{ fontSize: '18px' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <Button onClick={makeBeautify}>Beautify</Button>
                {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            </Box>
        </Box>
    );
}
