'use client';

import VariablesField from '@/components/ui/VariablesField';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangedVariable } from '@/lib/features/variablesSlice';
import { toVariablesArray } from '@/utils/generateRequestBodyWithVars';

export default function HttpHeaders() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateUrl = (params: string) => replace(`${pathname}?${params}`);

    const handleSave = ({ oldKey, newKey, value }: ChangedVariable) => {
        const params = new URLSearchParams(searchParams.toString());
        if (params.has(oldKey)) {
            const updatedParams = Object.fromEntries(
                Array.from(params.entries()).map(([key, val]) => {
                    if (key === oldKey) {
                        return [encodeURIComponent(newKey), encodeURIComponent(value)];
                    }
                    return [key, val];
                }),
            );
            const newParams = new URLSearchParams(updatedParams);
            updateUrl(newParams.toString());
        } else {
            params.set(encodeURIComponent(newKey), encodeURIComponent(value));
            updateUrl(params.toString());
        }
    };

    const handleRemove = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        updateUrl(params.toString());
    };

    const handleAdd = ({ key, value }: { key: string; value: string }) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(encodeURIComponent(key), encodeURIComponent(value));
        updateUrl(params.toString());
    };

    return (
        <VariablesField
            variables={toVariablesArray(searchParams)}
            saveDispatch={handleSave}
            removeDispatch={handleRemove}
            addDispatch={handleAdd}
        />
    );
}
