import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home ()
{
    const vartest: any = 'test';
    return (
        <Box sx={ { margin: '0 auto', textAlign: 'center' } }>
            <Typography variant="h1">GraphQL Task</Typography>
            <Link href="/restful"><Button variant="contained">Restful</Button></Link>
        </Box>
    );
}
