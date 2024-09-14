import { Variable } from '@/lib/features/variablesSlice';
import { ReadonlyURLSearchParams } from 'next/navigation';

export default function generateRequestBodyWithVars(body: string, variables: Variable[]) {
    const regex = /{{(.*?)}}/g;
    const replaceVariables = (str: string) => {
        return str.replace(regex, (match, variableName) => {
            const variable = variables.find((v) => v.key === variableName);
            if (!variable) {
                throw new Error(`Not find Variable {{${variableName}}}`);
            }
            return `"${variable.value}"`;
        });
    };
    return replaceVariables(body);
}

export function generateHeaders(headers: Variable[]) {
    const headersObject = new Headers();

    headers.forEach((header) => {
        if (header.key && header.value && header.value.trim().length > 0) {
            headersObject.set(header.key, header.value);
        }
    });

    return headersObject;
}

export function toVariablesArray(searchParams: ReadonlyURLSearchParams): Variable[] {
    const result = [];

    searchParams.forEach((value, key) => {
        result.push({ key: decodeURIComponent(key), value: decodeURIComponent(value) });
    });

    return result;
}
