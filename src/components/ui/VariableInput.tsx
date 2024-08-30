'use client';

import { IconButton, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { removeVariableField, saveVariable } from '@/lib/features/variablesSlice';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

interface IVariableInputProps {
    variable: { [key: string]: string };
    index: number;
}

export default function VariableInput(props: IVariableInputProps) {
    const { variable, index } = props;
    const allVariables = useAppSelector((state) => state.variables.variables);
    const dispatch = useAppDispatch();
    const [keyField, setKeyField] = useState(variable.key);
    const [valueField, setValueField] = useState(variable.value);
    const [editMode, setEditMode] = useState(false);

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyField(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueField(e.target.value);
    };

    const handleSave = () => {
        if (keyField === '' && valueField === '') return;
        const isExist = allVariables.find((data) => data.key === keyField);
        if (isExist) {
            toast.error('Key already exists');
            return;
        }
        dispatch(saveVariable({ key: keyField, value: valueField, selectedIndex: index }));
        setEditMode(false);
    };

    const handleDelete = (keyValue: string) => {
        dispatch(removeVariableField(keyValue));
    };

    return (
        <Stack direction="row" spacing={1} component="form">
            <TextField
                size="small"
                disabled={!editMode}
                fullWidth
                id="variable-key"
                label="Key"
                value={keyField}
                onChange={handleKeyChange}
            />
            <TextField
                size="small"
                fullWidth
                disabled={!editMode}
                id="variable-value"
                label="Value"
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
            <IconButton
                aria-label="variable-delete"
                size="small"
                onClick={() => handleDelete(variable.key)}
                color="error"
            >
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
