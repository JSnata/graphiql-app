'use client';

import { IconButton, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { ChangedVariable, Variable } from '@/lib/features/variablesSlice';

interface IVariableInputProps {
    variable: Variable;
    index: number;
    deleteFn: (keyValue: string) => void;
    saveFn: ({ newKey, oldKey, value }: ChangedVariable & { index: number }) => boolean;
}

export default function VariableInput(props: IVariableInputProps) {
    const { variable, deleteFn, saveFn, index } = props;
    const [currentKey, setCurrentKey] = useState(variable.key);
    const [oldKey, setOldKey] = useState(variable.key);
    const [value, setValue] = useState(variable.value);
    const [editMode, setEditMode] = useState(false);

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentKey(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSave = () => {
        const isSuccess = saveFn({ newKey: currentKey, oldKey, value, index });
        if (isSuccess) setEditMode(false);
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
                label="Key"
                value={currentKey}
                onChange={handleKeyChange}
            />
            <TextField
                size="small"
                fullWidth
                disabled={!editMode}
                id="variable-value"
                label="Value"
                value={value}
                onChange={handleValueChange}
            />

            {editMode ? (
                <IconButton aria-label="variable-save" size="medium" onClick={handleSave} color="success">
                    <SaveIcon fontSize="inherit" />
                </IconButton>
            ) : (
                <IconButton
                    aria-label="variable-change"
                    size="medium"
                    onClick={() => {
                        setOldKey(currentKey);
                        setEditMode(true);
                    }}
                    color="primary"
                >
                    <EditIcon fontSize="inherit" />
                </IconButton>
            )}
            <IconButton aria-label="variable-delete" size="medium" onClick={handleDelete} color="error">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
