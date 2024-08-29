import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h4" component="h1">
                404 Not Found
            </Typography>
            <Typography variant="body1">Could not find requested resource</Typography>
            <Link href="/">
                <Button variant="contained">Return Home</Button>
            </Link>
        </Box>
    );
}
