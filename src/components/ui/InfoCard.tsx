import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function InfoCard({ name, github, location, githubLink }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                maxWidth: 300,
                p: 2,
                border: '1px solid #dddddd',
                borderRadius: 2,
                textAlign: 'left',
                transition: '0.2s',
                '&:hover': {
                    transform: 'scale(1.03)',
                    cursor: 'default',
                    boxShadow: '0 5px 15px 0.5px #7c7c7c',
                },
            }}
        >
            <Typography textAlign="center" component="div">
                {name}
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <GitHubIcon />
                <Link
                    style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                    href={githubLink}
                    target="_blank"
                    rel="noopener"
                >
                    {github}
                </Link>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon />
                {location}
            </Box>
        </Box>
    );
}
