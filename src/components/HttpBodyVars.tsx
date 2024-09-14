'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import VariablesField from '@/components/ui/VariablesField';
import {
    addVariableBodyField,
    ChangedVariable,
    removeVariableBodyField,
    saveBodyVariable,
} from '@/lib/features/variablesSlice';

export default function HttpBodyVars() {
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const dispatch = useAppDispatch();

    const handleSave = ({ oldKey, newKey, value }: ChangedVariable) => {
        dispatch(saveBodyVariable({ oldKey, newKey, value }));
    };

    const handleRemove = (key: string) => {
        dispatch(removeVariableBodyField(key));
    };

    const handleAdd = ({ key, value }: { key: string; value: string }) => {
        dispatch(addVariableBodyField({ key, value }));
    };

    return (
        <VariablesField
            variables={variablesBody}
            saveDispatch={handleSave}
            removeDispatch={handleRemove}
            addDispatch={handleAdd}
        />
    );
}
