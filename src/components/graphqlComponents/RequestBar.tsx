'use client';

import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface IRequestBarProps {
    sendRequest: (url: string) => void;
    sendIntrospection: (sdlUrl: string) => void;
}

export default function RequestBar(props: IRequestBarProps) {
    const { sendRequest, sendIntrospection } = props;
    const t = useTranslations('GraphQL');
    const [endpoint, setEndpoint] = useState<string>('');
    const [sdlEndpoint, setSdlEndpoint] = useState<string>('');

    useEffect(() => {
        if (endpoint) {
            const encodedEndpoint = btoa(endpoint);
            const newUrl = `/GRAPHQL/${encodedEndpoint}`;
            window.history.replaceState(null, '', newUrl);
        }
    }, [endpoint]);

    const handleChangeEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndpoint(e.target.value);
        setSdlEndpoint(`${e.target.value}?sdl`);
    };

    const handleChangeSdlEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSdlEndpoint(e.target.value);
    };

    const handleSendRequest = () => {
        sendRequest(endpoint);
    };

    const handleExplorer = () => {
        sendIntrospection(sdlEndpoint);
    };

    return (
        <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ my: 2 }} spacing={2}>
                <TextField fullWidth value={endpoint} onChange={handleChangeEndpoint} label={t('enterEndpoint')} />
                <TextField fullWidth value={sdlEndpoint} onChange={handleChangeSdlEndpoint} label={t('enterSDL')} />
            </Stack>
            <Stack direction="row" sx={{ my: 2, justifyContent: 'center' }} spacing={2}>
                <Button variant="contained" onClick={handleSendRequest}>
                    {t('send')}
                </Button>
                <Button variant="contained" onClick={handleExplorer}>
                    {t('explorer')}
                </Button>
            </Stack>
        </Box>
    );
}
