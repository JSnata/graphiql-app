import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const methods = ['get', 'post', 'put', 'delete', 'head', 'options'];

export default function MethodSelector() {
    const [selectedMethod, setMethod] = useState('get');

    return (
        <Select
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            value={selectedMethod}
            onChange={(e) => setMethod(e.target.value)}
        >
            {methods.map((method) => (
                <MenuItem key={method} value={method}>
                    {method.toUpperCase()}
                </MenuItem>
            ))}
        </Select>
    );
}
