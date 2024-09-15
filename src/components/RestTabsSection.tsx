'use client';

import { useTranslations } from 'next-intl';
import TabsSection from './TabsSection';
import HttpHeaders from './HttpHeaders';
import HttpBodyVars from './HttpBodyVars';

export default function RestTabsSection() {
    const t = useTranslations('Request');
    return (
        <TabsSection
            labels={[`${t('headers')}`, `${t('variablesBody')}`]}
            elems={[<HttpHeaders key="headersVars" />, <HttpBodyVars key="bodyVars" />]}
        />
    );
}
