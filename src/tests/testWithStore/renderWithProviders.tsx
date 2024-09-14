import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ToastProvider from '@/providers/ToastProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { makeStore, type AppStore } from '../../lib/store';
import theme from '../../app/theme';

const messages = {
    en: {
        LocaleSwitcher: {
            label: 'Language',
            ru: 'Russian',
            en: 'English',
        },
        ErrorPages: {
            errorTitle: 'Something went wrong!',
            errorDescription: 'An unexpected error occurred. Please try again later.',
            tryButton: 'Try again',
            notFoundTitle: '404 Not Found',
            notFoundDescription: 'Could not find requested resource',
            returnButton: 'Return Home',
        },
        About: {
            project:
                'This project is developed as a final task of the RS School React course. It demonstrates the use of RESTful and GraphQL API.',
            location: 'Location',
            github: 'Github',
            natallia: 'Natallia Kulikouskaya',
            ilya: 'Ilya Slepchenkov',
            denis: 'Denis Shmuratkin',
            moscow: 'Moscow, Russia',
            syktyvkar: 'Syktyvkar, Russia',
            poland: 'Wrocław, Poland',
        },
        Auth: {
            welcome: 'Welcome to',
            userWelcome: 'Hi,',
            signin: 'Sign in',
            logout: 'Logout',
            signup: 'Sign up',
            email: 'Email',
            loading: 'loading',
            password: 'Password',
            noHaveAcc: 'Do not have an account?',
            haveAcc: 'Already have an account?',
            toastLoginS: 'Logged in successfully!',
            toastRegisterS: 'Signed up successfully!',
            toastAuthE: 'Error:',
            history: 'History',
        },
        Validation: {
            required: 'Required',
            invalidEmail: 'Invalid email',
            passwordMin: 'Password must be at least 8 characters long',
            passwordNumber: 'Password should contain at least one number',
            passwordLetter: 'Password should contain at least one letter',
            passwordUnicode: 'Password should contain valid Unicode characters',
            passwordSpecialChar: 'Password should contain at least one special character',
        },
        Request: {
            emptyEndpoint: 'Please enter the endpoint',
            keyExists: 'Key already exists',
            bodyError: 'Oops... Error:',
            status: 'Status: ',
            body: 'Body: ',
            response: 'Response: ',
            responseBody: 'Response body: ',
            beautify: 'Beautify',
            send: 'Send',
        },
        History: {
            title: 'Request history',
            empty: 'You have not made any requests yet',
            try: 'Here is empty. Try these variants:',
        },
    },
};

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    store?: AppStore;
    locale?: string;
    messages?: Record<string, string>;
}

export async function renderWithProviders(
    ui: ReactElement,
    { store = makeStore(), locale = 'en', ...renderOptions }: ExtendedRenderOptions = {},
) {
    function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
        return (
            <ReduxProvider store={store}>
                <NextIntlClientProvider messages={messages.en} locale={locale}>
                    <AppRouterCacheProvider>
                        <ToastProvider>
                            <ThemeProvider theme={theme}>
                                <CssBaseline />
                                {children}
                            </ThemeProvider>
                        </ToastProvider>
                    </AppRouterCacheProvider>
                </NextIntlClientProvider>
            </ReduxProvider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
