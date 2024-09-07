'use client';

// import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { addVariableHeaderField, removeVariableHeaderField, saveHeaderVariable } from '@/lib/features/variablesSlice';
import VariablesField from '@/components/ui/VariablesField';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function HttpHeaders() {
    const { replace } = useRouter();
    const pathname = usePathname();
    // return (
    //     <Box
    //         sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             gap: '20px',
    //         }}
    //     >
    //         <Button sx={{ textTransform: 'capitalize' }} variant="contained">
    //             Add header
    //         </Button>
    //         <Box>
    //             <TextField
    //                 sx={{ '& .MuiInputBase-root': { borderTopRightRadius: 0, WebkitBorderBottomRightRadius: 0 } }}
    //                 label="Key"
    //             />
    //             <TextField
    //                 sx={{ '& .MuiInputBase-root': { borderTopLeftRadius: 0, WebkitBorderBottomLeftRadius: 0 } }}
    //                 label="Value"
    //             />
    //         </Box>
    //     </Box>
    // );

    const variablesHeader = useAppSelector((state) => state.variables.variablesHeader);
    const dispatch = useAppDispatch();

    const encodeHeadersToBase64 = useCallback((headers: { [key: string]: string }[]) => {
        return headers
            .filter((header) => header.key && header.value)
            .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
            .join('&');
    }, []);

    const updateUrlWithHeaders = useCallback(() => {
        const encodedHeaders = encodeHeadersToBase64(variablesHeader);
        const updatedUrl = `${pathname}?${encodedHeaders}`;
        replace(updatedUrl);
    }, [encodeHeadersToBase64, variablesHeader, pathname, replace]);
    const handleSave = (keyField: string, valueField: string, index: number) => {
        dispatch(saveHeaderVariable({ key: keyField, value: valueField, selectedIndex: index }));
        updateUrlWithHeaders();
    };
    const handleRemove = (keyValue: string) => {
        dispatch(removeVariableHeaderField(keyValue));
        updateUrlWithHeaders();
    };
    const handleAdd = ({ key, value }: { key: string; value: string }) => {
        dispatch(addVariableHeaderField({ key, value }));
        updateUrlWithHeaders();
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
