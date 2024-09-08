'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { addVariableHeaderField, removeVariableHeaderField, saveHeaderVariable } from '@/lib/features/variablesSlice';
import VariablesField from '@/components/ui/VariablesField';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HttpHeaders() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const variablesHeader = useAppSelector((state) => state.variables.variablesHeader);
    const dispatch = useAppDispatch();

    const encodeHeadersToURI = (headers: { [key: string]: string }[]) => {
        return headers
            .filter((header) => header.key && header.value)
            .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
            .join('&');
    };

    useEffect(() => {
        const encodedHeaders = encodeHeadersToURI(variablesHeader);
        const updatedUrl = `${pathname}?${encodedHeaders}`;
        replace(updatedUrl);
    }, [pathname, replace, variablesHeader]);

    const handleSave = (keyField: string, valueField: string, index: number) => {
        dispatch(
            saveHeaderVariable({
                key: keyField,
                value: valueField,
                selectedIndex: index,
            }),
        );
    };

    const handleRemove = (keyValue: string) => {
        dispatch(removeVariableHeaderField(keyValue));
    };

    const handleAdd = ({ key, value }: { key: string; value: string }) => {
        dispatch(addVariableHeaderField({ key, value }));
    };

    return (
        <VariablesField
            variables={variablesHeader}
            saveDispatch={handleSave}
            removeDispatch={handleRemove}
            addDispatch={handleAdd}
        />
    );
}
