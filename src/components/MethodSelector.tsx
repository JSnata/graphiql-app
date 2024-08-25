import { MenuItem, Select } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

const methods = ['get', 'post', 'put', 'delete', 'head', 'options'];

export default function MethodSelector() {
    const { replace } = useRouter();
    const { request } = useParams<{ request: string[] }>();

    return (
        <Select
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            value={request[0]}
            onChange={(e) => replace(`/${e.target.value}`)}
        >
            {methods.map((method) => (
                <MenuItem key={method} value={method}>
                    {method.toUpperCase()}
                </MenuItem>
            ))}
        </Select>
    );
}
