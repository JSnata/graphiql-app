'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, useState } from 'react';

export default function TabsSection({ elems, labels }: { elems: ReactNode[]; labels: string[] }) {
    const [value, setValue] = useState(0);
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs value={value} onChange={handleChange}>
                    {labels.map((label) => (
                        <Tab key={label} label={label} />
                    ))}
                </Tabs>
            </Box>

            {elems.map((child, index) => index === value && child)}
        </Box>
    );
}
