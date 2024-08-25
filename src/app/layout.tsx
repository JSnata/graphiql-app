import { Inter } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import ToastProvider from '@/providers/ToastProvider';
import StoreProvider from '@/providers/StoreProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Box } from '@mui/material';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GraphQL',
    description: 'GraphQL Task',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <AppRouterCacheProvider>
                        <StoreProvider>
                            <ToastProvider>
                                <ThemeProvider theme={theme}>
                                    <Header />
                                    <Box component={'main'} sx={{ minHeight: 'calc(100vh - 132px)' }}>
                                        {children}
                                    </Box>
                                    <Footer />
                                </ThemeProvider>
                            </ToastProvider>
                        </StoreProvider>
                    </AppRouterCacheProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
