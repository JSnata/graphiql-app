'use client';

import { Box, Paper, Stack } from '@mui/material';
import VariableInput from '@/components/ui/VariableInput';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface IVariablesProps {
    variables: Array<{ [key: string]: string }>;
    saveDispatch: (keyField: string, valueField: string, index: number) => void;
    removeDispatch: (keyValue: string) => void;
    addDispatch: ({ key, value }: { key: string; value: string }) => void;
}

export default function VariablesField(props: IVariablesProps) {
    const { variables, saveDispatch, removeDispatch, addDispatch } = props;
    const t = useTranslations('Request');

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

    const handleDelete = (keyValue: string) => removeDispatch(keyValue);

    const handleSave = (keyField: string, valueField: string, index: number) => {
        const indexExist = variables.findIndex((data) => data.key === keyField);
        if (indexExist === index) {
            saveDispatch(keyField, valueField, index);
        } else if (indexExist !== -1) {
            toast.error(t('keyExists'));
        } else {
            saveDispatch(keyField, valueField, index);
        }
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
