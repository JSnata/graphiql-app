'use client';

import { MenuItem, Select } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

const methods = [
    { method: 'get', color: '#007f31' },
    { method: 'post', color: '#ad7a03' },
    { method: 'put', color: '#0053b8' },
    { method: 'patch', color: '#623497' },
    { method: 'delete', color: '#8e1a10' },
    { method: 'head', color: '#007f31' },
    { method: 'options', color: '#a61468' },
];

const findColor = (selectedMethod: string) => methods.find(({ method }) => selectedMethod === method)?.color;

export default function MethodSelector() {
    const { replace } = useRouter();
    const { request } = useParams<{ request: string[] }>();

    return (
        <Select
            sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                color: findColor(request[0]),
                fontWeight: 'bold',
            }}
            value={request[0]}
            onChange={(e) => replace(`/${e.target.value}`)}
        >
            {methods.map(({ color, method }) => (
                <MenuItem sx={{ color, fontWeight: 'bold' }} key={method} value={method}>
                    {method.toUpperCase()}
                </MenuItem>
            ))}
        </Select>
    );
}
