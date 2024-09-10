import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const statusDescriptions: { [key: number]: string } = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
};

export default function ChipStatusCode({ statusCode }: { statusCode: number }) {
    const label = `${statusCode} ${statusDescriptions[statusCode] || ''}`;
    if (statusCode >= 100 && statusCode < 200) {
        return <Chip label={label} color="info" icon={<InfoIcon />} />;
    }
    if (statusCode >= 200 && statusCode < 300) {
        return <Chip label={label} color="success" icon={<CheckCircleIcon />} />;
    }
    if (statusCode >= 300 && statusCode < 400) {
        return <Chip label={label} color="warning" icon={<WarningIcon />} />;
    }
    if (statusCode >= 400 && statusCode < 500) {
        return <Chip label={label} color="error" icon={<ErrorIcon />} />;
    }
    if (statusCode >= 500) {
        return <Chip label={label} color="error" icon={<ErrorIcon />} variant="outlined" />;
    }
    return <Chip label="Unknown Status" color="default" />;
}
