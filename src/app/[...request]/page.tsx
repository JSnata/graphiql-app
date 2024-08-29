import { Box, Stack } from '@mui/material';
import Endpoint from '@/components/Endpoint';
import HttpHeaders from '@/components/HttpHeaders';
import MethodSelector from '@/components/MethodSelector';
import HttpBody from '@/components/HttpBody';
import HttpResponse from '@/components/HttpResponse';
import TabsSection from '@/components/TabsSection';

export default function Restful() {
    return (
        <Stack
            spacing={3}
            component="section"
            alignItems="center"
            sx={{ margin: '0 auto', padding: '20px', maxWidth: '1240px' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <MethodSelector />
                <Endpoint />
            </Box>

            <TabsSection
                labels={['Headers', 'Variables']}
                elems={[<HttpHeaders key="headers" />, <div key="variables">Variables here</div>]}
            />
            <HttpBody />
            <HttpResponse />
        </Stack>
    );
}
