import { Box } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';

export default function HttpBody() {
    return (
        <Box sx={{ width: '50%' }}>
            <CodeMirror
                placeholder="Enter the request body here"
                theme="light"
                height="150px"
                style={{ fontSize: '18px' }}
            />
        </Box>
    );
}
