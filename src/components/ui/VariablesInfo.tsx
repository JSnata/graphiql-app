import { IconButton, Tooltip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useTranslations } from 'next-intl';

export default function VariablesInfo() {
    const t = useTranslations('Variables');
    return (
        <Tooltip title={t('text')}>
            <IconButton sx={{ '&:hover': { cursor: 'default' } }} size="small">
                <QuestionMarkIcon />
            </IconButton>
        </Tooltip>
    );
}
