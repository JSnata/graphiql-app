'use client';

import { decodeBase64, encodeBase64 } from '@/utils/base64';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface IRequestBarProps {
    sendRequest: (url: string) => void;
    sendIntrospection: (sdlUrl: string) => void;
}

export default function RequestBar(props: IRequestBarProps) {
    const { sendRequest, sendIntrospection } = props;
    const t = useTranslations('GraphQL');
    const { graphqlRequest } = useParams<{ graphqlRequest?: string[] }>();
    const searchParams = useSearchParams();
    const [endpoint, setEndpoint] = useState<string>(
        graphqlRequest ? decodeBase64(decodeURIComponent(graphqlRequest[0] || '') || '') : '',
    );
    const [sdlEndpoint, setSdlEndpoint] = useState<string>('');

    const handleChangeEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndpoint(e.target.value);
        window.history.replaceState(null, '', `/GRAPHQL/${encodeBase64(e.target.value)}?${searchParams.toString()}`);
        setSdlEndpoint(`${e.target.value}?sdl`);
    };

    const handleChangeSdlEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSdlEndpoint(e.target.value);
    };

    const handleSendRequest = () => sendRequest(endpoint);
    const handleExplorer = () => sendIntrospection(sdlEndpoint);

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
