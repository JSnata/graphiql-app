'use client';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { addVariable, clearVariables, removeVariable } from '@/lib/features/variablesSlice';
import VariableInput from '@/components/ui/VariableInput';
import { toast } from 'react-toastify';

export default function Variables() {
    const variables = useAppSelector((state) => state.variables.variables);
    const dispach = useAppDispatch();

    const isEmpty = variables.find((data) => data.key === '' && data.value === '');
    const handleAddVariable = () => {
        if (!isEmpty) {
            dispach(addVariable({ key: '', value: '' }));
        } else {
            toast.warn('Please set previous variable key and value first');
        }
    };

    const handleDelete = (key: string) => {
        dispach(removeVariable(key));
    };

    return (
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="h6">Varibales</Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" endIcon={<AddCircleIcon />} onClick={handleAddVariable}>
                    Add
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={() => dispach(clearVariables())}
                >
                    Clear
                </Button>
            </Stack>

            <Paper
                sx={{
                    height: '200px',
                    overflow: 'auto',
                    width: '100%',
                    paper: 5,
                    my: 2,
                    p: 2,
                }}
                elevation={1}
            >
                <Stack direction="column" spacing={2}>
                    {variables.map((data) => (
                        <VariableInput key={data.key} variable={data} handleDelete={handleDelete} />
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
}
