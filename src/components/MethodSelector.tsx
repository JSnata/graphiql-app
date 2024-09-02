'use client';

import isMethod from '@/helpers/isMethod';
import { setMethod } from '@/lib/features/restSlice';
import { useAppDispatch } from '@/lib/hook';
import { MenuItem, Select } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const methods = [
    { name: 'get', color: '#007f31' },
    { name: 'post', color: '#ad7a03' },
    { name: 'put', color: '#0053b8' },
    { name: 'patch', color: '#623497' },
    { name: 'delete', color: '#8e1a10' },
    { name: 'head', color: '#007f31' },
    { name: 'options', color: '#a61468' },
];

const findColor = (selectedMethod: string) => methods.find(({ name }) => selectedMethod === name)?.color;

export default function MethodSelector() {
    const { replace } = useRouter();
    const { request } = useParams<{ request: string[] }>();
    const method = request[0];
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isMethod(request[0])) replace('/get');
    }, [replace, request]);

    return (
        <Select
            sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                color: findColor(method),
                fontWeight: 'bold',
            }}
            value={isMethod(method) ? method : 'get'}
            onChange={(e) => {
                replace(`/${e.target.value}/${request.slice(1).join('/')}`);
                // воможно можно удалить. я беру из url метод
                dispatch(setMethod(e.target.value));
            }}
        >
            {methods.map(({ color, name }) => (
                <MenuItem sx={{ color, fontWeight: 'bold' }} key={name} value={name}>
                    {name.toUpperCase()}
                </MenuItem>
            ))}
        </Select>
    );
}
