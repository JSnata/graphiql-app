import { Box, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';

export default function HttpResponse() {
    return (
        <Box sx={{ width: '100%' }}>
            <Typography>Status: {''}</Typography>
            Body:
            <CodeMirror editable={false} readOnly theme="light" maxHeight="200px" style={{ fontSize: '16px' }} />
        </Box>
    );
}
