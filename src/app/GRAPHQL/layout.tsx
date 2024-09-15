import { Box } from '@mui/material';

export default function GraphqlLayout({ children }: { children: React.ReactNode }) {
    return <Box sx={{ textAlign: 'center', mt: 2 }}>{children}</Box>;
}
