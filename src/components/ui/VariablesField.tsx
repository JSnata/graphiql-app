'use client';

import React from 'react';
import { Box, Paper, Stack } from '@mui/material';
import VariableInput from '@/components/ui/VariableInput';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { ChangedVariable, Variable } from '@/lib/features/variablesSlice';

interface IVariablesProps {
    variables: Variable[];
    saveDispatch: ({ newKey, oldKey, value }: ChangedVariable) => void;
    removeDispatch: (keyValue: string) => void;
    addDispatch: ({ key, value }: { key: string; value: string }) => void;
}

export default function VariablesField(props: IVariablesProps) {
    const { variables, saveDispatch, removeDispatch, addDispatch } = props;
    const t = useTranslations('Request');

    const isEmpty = variables.find((data) => data.key === '' && data.value === '');

    const handleAdd = (e: React.MouseEvent) => {
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

    const handleDelete = (keyValue: string) => removeDispatch(keyValue);

    const handleSave = ({ oldKey, newKey, value, index }: ChangedVariable & { index: number }): boolean => {
        const isExists = variables.find((variable, varIndex) => variable.key === newKey && varIndex !== index);
        if (isExists) {
            toast.error(t('keyExists'));
            return false;
        }
        saveDispatch({ oldKey, newKey, value });
        return true;
    };

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Box onClick={(e) => handleAdd(e)} sx={{ width: '100%', my: 2 }}>
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
