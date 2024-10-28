'use client';

import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import React, { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Locale } from '@/localeConf';
import { setUserLocale } from '@/services/locale';

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const [, startTransition] = useTransition();

    async function localeChange(value: string) {
        const localeValue = value as Locale;
        startTransition(() => {
            setUserLocale(localeValue);
        });
    }

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        await localeChange(value);
    };

    return (
        <FormControl
            sx={{
                m: 1,
                minWidth: 150,
                variant: 'standard',
            }}
            size="small"
            color="secondary"
        >
            <InputLabel id="" color="secondary">
                {t('label')}
            </InputLabel>
            <Select
                MenuProps={{ disableScrollLock: true }}
                labelId=""
                id=""
                value={locale}
                label="Locale"
                onChange={handleChange}
                color="secondary"
            >
                <MenuItem value="en">{t('en')}</MenuItem>
                <MenuItem value="ru">{t('ru')}</MenuItem>
            </Select>
        </FormControl>
    );
}
