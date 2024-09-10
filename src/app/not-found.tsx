import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
    const t = useTranslations('ErrorPages');
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
                {t('notFoundTitle')}
            </Typography>
            <Typography variant="body1">{t('notFoundDescription')}</Typography>
            <Link href="/">
                <Button variant="contained">{t('tryButton')}</Button>
            </Link>
        </Box>
    );
}
