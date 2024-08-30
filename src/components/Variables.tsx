'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { addVariableField } from '@/lib/features/variablesSlice';
import VariableInput from '@/components/ui/VariableInput';

export default function Variables() {
    const variables = useAppSelector((state) => state.variables.variables);
    const dispatch = useAppDispatch();

    const isEmpty = variables.find((data) => data.key === '' && data.value === '');
    const handleAddVariable = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const targetElement = e.target as HTMLElement;
        if (
            targetElement.closest('button[aria-label="variable-delete"]') ||
            targetElement.closest('.MuiIconButton-root')
        ) {
            return;
        }

        if (!isEmpty) {
            dispatch(addVariableField({ key: '', value: '' }));
        }
    };

    return (
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="h6">Varibales</Typography>
            <Box onClick={(e) => handleAddVariable(e)} sx={{ width: '100%', my: 2 }}>
                <Paper
                    sx={{
                        height: '200px',
                        overflow: 'auto',
                        width: '100%',
                        p: 2,
                    }}
                    elevation={1}
                >
                    <Stack direction="column" spacing={2}>
                        {variables.map((data, index) => (
                            <VariableInput key={data.key} variable={data} index={index} />
                        ))}
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}
