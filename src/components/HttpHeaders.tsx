'use client';

// import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { addVariableHeaderField, removeVariableHeaderField, saveHeaderVariable } from '@/lib/features/variablesSlice';
import VariablesField from '@/components/ui/VariablesField';

export default function HttpHeaders() {
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
    const handleSave = (keyField: string, valueField: string, index: number) => {
        dispatch(saveHeaderVariable({ key: keyField, value: valueField, selectedIndex: index }));
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
