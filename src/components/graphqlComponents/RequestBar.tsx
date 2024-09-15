'use client';

import { setSdl } from '@/lib/features/requestSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { decodeBase64, encodeBase64 } from '@/utils/base64';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ExploreIcon from '@mui/icons-material/Explore';

interface IRequestBarProps {
    sendRequest: (url: string) => void;
    sendIntrospection: (sdlUrl: string) => void;
}

export default function RequestBar(props: IRequestBarProps) {
    const { sendRequest, sendIntrospection } = props;
    const tGraphql = useTranslations('GraphQL');
    const tRequest = useTranslations('Request');
    const { graphqlRequest } = useParams<{ graphqlRequest?: string[] }>();
    const dispatch = useAppDispatch();
    const sdl = useAppSelector((state) => state.request.sdl);
    const searchParams = useSearchParams();
    const [endpoint, setEndpoint] = useState<string>(
        graphqlRequest ? decodeBase64(decodeURIComponent(graphqlRequest[0] || '') || '') : '',
    );

    const handleChangeEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndpoint(e.target.value);
        window.history.replaceState(null, '', `/GRAPHQL/${encodeBase64(e.target.value)}?${searchParams.toString()}`);
        dispatch(setSdl(`${e.target.value}?sdl`));
    };

    const handleChangeSdlEndpoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSdl(e.target.value));
    };

    const handleSendRequest = () => sendRequest(endpoint);
    const handleExplorer = () => sendIntrospection(sdl);

    return (
        <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ my: 2 }} spacing={2}>
                <TextField
                    fullWidth
                    value={endpoint}
                    onChange={handleChangeEndpoint}
                    label={tRequest('emptyEndpoint')}
                />
                <TextField
                    fullWidth
                    value={sdl || ''}
                    onChange={handleChangeSdlEndpoint}
                    label={tGraphql('enterSDL')}
                />
            </Stack>
            <Stack direction="row" sx={{ my: 2, justifyContent: 'center' }} spacing={2}>
                <Button variant="contained" onClick={handleSendRequest}>
                    {tRequest('send')}
                    <SendIcon sx={{ ml: 1.2 }} />
                </Button>
                <Button variant="contained" onClick={handleExplorer}>
                    {tGraphql('explorer')}
                    <ExploreIcon sx={{ ml: 1.2 }} />
                </Button>
            </Stack>
        </Box>
    );
}
