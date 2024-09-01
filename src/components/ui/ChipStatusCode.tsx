import { Chip } from '@mui/material';

export default function ChipStatusCode({ statusCode }: { statusCode: number }) {
    if (statusCode >= 200 && statusCode < 300) {
        return <Chip label={statusCode} color="success" />;
    }
    if (statusCode >= 300 && statusCode < 400) {
        return <Chip label={statusCode} color="warning" />;
    }
    if (statusCode >= 400 && statusCode < 500) {
        return <Chip label={statusCode} color="error" />;
    }
    return null;
}
