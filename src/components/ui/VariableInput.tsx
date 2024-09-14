'use client';

import { IconButton, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslations } from 'next-intl';

interface IVariableInputProps {
    variable: { [key: string]: string };
    index: number;
    deleteFn: (keyValue: string) => void;
    saveFn: (keyField: string, valueField: string, index: number) => void;
}

export default function VariableInput(props: IVariableInputProps) {
    const { variable, index, deleteFn, saveFn } = props;
    const [keyField, setKeyField] = useState(variable.key);
    const [valueField, setValueField] = useState(variable.value);
    const [editMode, setEditMode] = useState(false);
    const t = useTranslations('GraphQL');

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyField(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueField(e.target.value);
    };

    const handleSave = async () => {
        try {
            await saveFn(keyField, valueField, index);
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = () => {
        deleteFn(variable.key);
    };

    return (
        <Stack direction="row" spacing={1} component="form">
            <TextField
                size="small"
                disabled={!editMode}
                fullWidth
                id="variable-key"
                label={t('key')}
                value={keyField}
                onChange={handleKeyChange}
            />
            <TextField
                size="small"
                fullWidth
                disabled={!editMode}
                id="variable-value"
                label={t('value')}
                value={valueField}
                onChange={handleValueChange}
            />

            {editMode ? (
                <IconButton aria-label="variable-delete" size="small" onClick={handleSave} color="success">
                    <SaveIcon fontSize="inherit" />
                </IconButton>
            ) : (
                <IconButton aria-label="variable-change" size="small" onClick={() => setEditMode(true)} color="primary">
                    <EditIcon fontSize="inherit" />
                </IconButton>
            )}
            <IconButton aria-label="variable-delete" size="small" onClick={handleDelete} color="error">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
