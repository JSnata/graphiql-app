import { describe, it, expect, vi, Mock } from 'vitest';
import { defaultLocale } from '@/localeConf';
import { cookies } from 'next/headers';
import { getUserLocale, setUserLocale } from '@/services/locale';

vi.mock('next/headers', () => ({
    cookies: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn(),
    })),
}));

describe('getUserLocale', () => {
    it('should return the locale from cookies if set', async () => {
        const mockCookies = {
            get: vi.fn(() => ({ value: 'en' })),
        };

        (cookies as Mock).mockReturnValue(mockCookies);

        const locale = await getUserLocale();
        expect(locale).toBe('en');
    });

    it('should return the default locale if cookie is not set', async () => {
        const mockCookies = {
            get: vi.fn(() => undefined),
        };

        (cookies as Mock).mockReturnValue(mockCookies);

        const locale = await getUserLocale();
        expect(locale).toBe(defaultLocale);
    });
});

describe('setUserLocale', () => {
    it('should set the locale in cookies', async () => {
        const mockCookies = {
            set: vi.fn(),
        };

        (cookies as Mock).mockReturnValue(mockCookies);

        await setUserLocale('ru');

        expect(mockCookies.set).toHaveBeenCalledWith('GRAPHQL_LOCALE', 'ru');
    });
});
