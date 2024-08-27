'use client';

import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HttpBody() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const params = pathname.split('/').filter(Boolean); // аналог useParams, обновляющийся при использовании history API
    const [code, setCode] = useState(atob(decodeURIComponent(params[2] || '')));

    return (
        <Box sx={{ width: '100%' }}>
            <CodeMirror
                value={code}
                onChange={setCode}
                onBlur={() => {
                    if (params[1]) replace(`/${params[0]}/${params[1]}/${btoa(code)}`);
                }}
                placeholder="Enter the request body here"
                theme="light"
                height="150px"
                style={{ fontSize: '18px' }}
            />
            {!params[1] && <Typography sx={{ color: 'red' }}>Please enter the endpoint</Typography>}
        </Box>
    );
}
