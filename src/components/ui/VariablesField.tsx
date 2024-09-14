'use client';

import { Box, Paper, Stack } from '@mui/material';
import VariableInput from '@/components/ui/VariableInput';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

interface IVariablesProps {
    variables: Array<{ [key: string]: string }>;
    saveDispatch: (keyField: string, valueField: string, index: number) => void;
    removeDispatch: (keyValue: string) => void;
    addDispatch: ({ key, value }: { key: string; value: string }) => void;
}

export default function VariablesField(props: IVariablesProps) {
    const { variables, saveDispatch, removeDispatch, addDispatch } = props;

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
            addDispatch({ key: '', value: '' });
        }
    };

    const handleDelete = useCallback(
        (keyValue: string) => {
            removeDispatch(keyValue);
        },
        [removeDispatch],
    );

    const handleSave = useCallback(
        async (keyField: string, valueField: string, index: number) => {
            return new Promise((resolve, reject) => {
                const indexExist = variables.findIndex((data) => data.key === keyField);
                if (indexExist === index) {
                    saveDispatch(keyField, valueField, index);
                    resolve(true);
                } else if (indexExist !== -1) {
                    toast.error('Key already exists');
                    reject();
                } else {
                    saveDispatch(keyField, valueField, index);
                    resolve(true);
                }
            });
        },
        [variables, saveDispatch],
    );

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
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
                            <VariableInput
                                key={data.key}
                                variable={data}
                                index={index}
                                saveFn={handleSave}
                                deleteFn={handleDelete}
                            />
                        ))}
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}
