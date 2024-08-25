import { TextField } from '@mui/material';

export default function Endpoint() {
    return (
        <TextField
            sx={{ width: '70%', '& .MuiInputBase-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
            label="Endpoint URL"
        />
    );
}
