'use client';

import { IconButton, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IVariableInputProps {
    variable: { [key: string]: string };
    handleDelete: (key: string) => void;
}

export default function VariableInput(props: IVariableInputProps) {
    const { variable, handleDelete } = props;
    // const [key, value] = useState(Object.entries(variable));
    // console.log(variable, key, value);
    return (
        <Stack
            direction="row"
            spacing={1}
            // sx={{
            //     alignItems: 'center',
            //     display: 'flex',
            //     justifyContent: 'space-between',
            //     width: '100%',
            // }}
        >
            <TextField
                size="small"
                fullWidth
                id="variable-key"
                label="Key"
                // onChange={(e) => (key[0] = e.target.value)}
            />
            <TextField size="small" fullWidth id="variable-value" label="Value" />
            <IconButton aria-label="variable-delete" size="small" onClick={() => handleDelete(variable.key)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
