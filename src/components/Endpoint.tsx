import { TextField } from '@mui/material';
import { useParams } from 'next/navigation';

export default function Endpoint() {
    const { request } = useParams<{ request: string[] }>();

    return (
        <TextField
            onChange={(e) => window.history.replaceState(null, '', `/${request[0]}/${btoa(e.target.value)}`)}
            sx={{ width: '70%', '& .MuiInputBase-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
            label="Endpoint URL"
            defaultValue={request[1] ? atob(decodeURIComponent(request[1])) : ''}
        />
    );
}
