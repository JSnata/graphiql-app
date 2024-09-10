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
import { getServerSession } from 'next-auth';
import SessionProvider from '@/providers/SessionProvider';
import { Container, CssBaseline } from '@mui/material';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import React from 'react';
import AuthWatcher from '@/components/AuthWatcher';
import theme from './theme';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Rest/GraphQL Client',
    description: 'Rest/GraphQL Client for testing all REST and GraphQL APIs',
    icons: {
        icon: '/favicon.png',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();
    const session = await getServerSession(authOptions);
    return (
        <>
            <CssBaseline />
            <html lang={locale}>
                <body className={inter.className}>
                    <SessionProvider session={session}>
                        <NextIntlClientProvider messages={messages}>
                            <AppRouterCacheProvider>
                                <StoreProvider>
                                    <ToastProvider>
                                        <ThemeProvider theme={theme}>
                                            <AuthWatcher />
                                            <Header />
                                            <Container
                                                component="main"
                                                sx={{
                                                    minHeight: 'calc(100vh - 132px)',
                                                    display: 'flex',
                                                    height: '100%',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                {children}
                                            </Container>
                                            <Footer />
                                        </ThemeProvider>
                                    </ToastProvider>
                                </StoreProvider>
                            </AppRouterCacheProvider>
                        </NextIntlClientProvider>
                    </SessionProvider>
                </body>
            </html>
        </>
    );
}
