import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

export default function MethodSelector() {
    const [method, setMethod] = useState('get');

    return (
        <Select
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
        >
            <MenuItem value="get">GET</MenuItem>
            <MenuItem value="post">POST</MenuItem>
            <MenuItem value="put">PUT</MenuItem>
            <MenuItem value="delete">DELETE</MenuItem>
            <MenuItem value="head">HEAD</MenuItem>
            <MenuItem value="options">OPTIONS</MenuItem>
        </Select>
    );
}
