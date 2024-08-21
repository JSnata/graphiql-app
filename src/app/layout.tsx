import { Inter } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import ToastProvider from '@/providers/ToastProvider';
import StoreProvider from '@/providers/StoreProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/providers/SessionProvider';
import theme from './theme';
import { authOptions } from './api/auth/[...nextauth]/route';

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
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <AppRouterCacheProvider>
                        <StoreProvider>
                            <ToastProvider>
                                <ThemeProvider theme={theme}>{children}</ThemeProvider>
                            </ToastProvider>
                        </StoreProvider>
                    </AppRouterCacheProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
