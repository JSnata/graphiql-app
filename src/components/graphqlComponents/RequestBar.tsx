'use client';

import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface IRequestBarProps {
    sendRequestFunc: (url: string, sdlUrl: string) => void;
}

export default function RequestBar(props: IRequestBarProps) {
    const { sendRequestFunc } = props;
    // const params = useParams();
    // const router = useRouter();
    // console.log(params, 'params');
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
        sendRequestFunc(endpoint, sdlEndpoint);
    };

    return (
        <Box sx={{ width: '100%', my: 2 }}>
            <Stack direction="row" spacing={2}>
                <TextField fullWidth value={endpoint} onChange={handleChangeEndpoint} label={t('endpoint')} />
                <TextField fullWidth value={sdlEndpoint} onChange={handleChangeSdlEndpoint} label={t('sdlEndpoint')} />
                <Button variant="contained" onClick={handleSendRequest}>
                    Send
                </Button>
            </Stack>
        </Box>
    );
}
