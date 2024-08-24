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
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GraphQL',
    description: 'GraphQL Task',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <StoreProvider>
                        <ToastProvider>
                            <ThemeProvider theme={theme}>
                                <Header />
                                {children}
                                <Footer />
                            </ThemeProvider>
                        </ToastProvider>
                    </StoreProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
