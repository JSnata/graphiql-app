'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hook';
import VariablesField from '@/components/ui/VariablesField';
import { addVariableBodyField, removeVariableBodyField, saveBodyVariable } from '@/lib/features/variablesSlice';

export default function HttpBodyVars() {
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const dispatch = useAppDispatch();

    const handleSave = (keyField: string, valueField: string, index: number) => {
        dispatch(saveBodyVariable({ key: keyField, value: valueField, selectedIndex: index }));
    };

    const handleRemove = (keyValue: string) => {
        dispatch(removeVariableBodyField(keyValue));
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
