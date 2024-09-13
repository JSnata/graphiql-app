import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function InfoCard({ name, github, location, githubLink }) {
    const t = useTranslations('About');
    return (
        <Box
            sx={{
                maxWidth: 300,
                p: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                textAlign: 'left',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.03)',
                    borderColor: '#000',
                },
            }}
        >
            <Typography component="div">{name}</Typography>
            <Typography sx={{ mt: 1 }} variant="body2">
                {`${t('github')}`}:{' '}
                <Link href={githubLink} target="_blank" rel="noopener">
                    {github}
                </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
                {`${t('location')}`}: {location}
            </Typography>
        </Box>
    );
}
