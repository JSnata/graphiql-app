import { Stack, Typography } from '@mui/material';
import HttpBody from '@/components/HttpBody';
import HttpResponse from '@/components/HttpResponse';
import TabsSection from '@/components/TabsSection';
import HttpBodyVars from '@/components/HttpBodyVars';
import HttpHeaders from '@/components/HttpHeaders';
import SendRequestBar from '@/components/SendRequestBar';

export default function Restful() {
    return (
        <Stack spacing={3} component="section" alignItems="center" sx={{ m: 2, width: '100%' }}>
            <Typography variant="h4">Restful Client</Typography>
            <SendRequestBar />

            <TabsSection
                labels={['Headers', 'Variables Body']}
                elems={[<HttpHeaders key="headersVars" />, <HttpBodyVars key="bodyVars" />]}
            />
            <HttpBody />
            <HttpResponse type="REST" />
        </Stack>
    );
}
