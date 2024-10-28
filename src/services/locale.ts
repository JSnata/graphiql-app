'use server';

import { cookies } from 'next/headers';
import { defaultLocale } from '@/localeConf';

const COOKIE_NAME = 'GRAPHQL_LOCALE';

export async function getUserLocale() {
    return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: string) {
    cookies().set(COOKIE_NAME, locale);
}
