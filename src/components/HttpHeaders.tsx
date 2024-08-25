import { Box, Button, TextField } from '@mui/material';

export default function HttpHeaders() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            <Button variant="contained">Add header</Button>
            <Box>
                <TextField
                    sx={{ '& .MuiInputBase-root': { borderTopRightRadius: 0, WebkitBorderBottomRightRadius: 0 } }}
                    label="Key"
                />
                <TextField
                    sx={{ '& .MuiInputBase-root': { borderTopLeftRadius: 0, WebkitBorderBottomLeftRadius: 0 } }}
                    label="Value"
                />
            </Box>
        </Box>
    );
}
