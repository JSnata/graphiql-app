import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import SignUp from '@/app/signup/page';
import SignIn from '../app/signin/page';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({})),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn((auth, callback) => {
        callback(null);
        return vi.fn();
    }),
}));

describe.each([
    {
        Component: SignIn,
        buttonText: 'Login',
        handleSubmitMock: signInWithEmailAndPassword,
        messages: {
            en: {
                Auth: {
                    signin: 'Login',
                    signup: 'Sign Up',
                    email: 'Email',
                    password: 'Password',
                    haveAcc: 'Already have an account?',
                    noHaveAcc: 'Don’t have an account?',
                    toastLoginS: 'Successfully logged in!',
                    toastRegisterS: 'Successfully registered!',
                    toastAuthE: 'Authentication error.',
                    loading: 'Loading...',
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
            },
        },
    },
    {
        Component: SignUp,
        buttonText: 'Sign Up',
        handleSubmitMock: createUserWithEmailAndPassword,
        messages: {
            en: {
                Auth: {
                    signin: 'Login',
                    signup: 'Sign Up',
                    email: 'Email',
                    password: 'Password',
                    haveAcc: 'Already have an account?',
                    noHaveAcc: 'Don’t have an account?',
                    toastLoginS: 'Successfully logged in!',
                    toastRegisterS: 'Successfully registered!',
                    toastAuthE: 'Authentication error.',
                    loading: 'Loading...',
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
            },
        },
    },
])('Auth Form Component', ({ Component, buttonText, handleSubmitMock, messages }) => {
    it(`should render form and handle submission`, async () => {
        const mockPush = vi.fn();
        (useRouter as vi.Mock).mockReturnValue({
            push: mockPush,
        });

        render(
            <NextIntlClientProvider locale="en" messages={messages.en}>
                <Component />
            </NextIntlClientProvider>,
        );

        const emailInput = await screen.findByLabelText('Email');
        const passwordInput = await screen.findByLabelText('Password');
        const submitButton = await screen.findByRole('button', {
            name: `${buttonText}`,
        });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        fireEvent.change(emailInput, {
            target: { value: 'test@gmail.com' },
        });
        fireEvent.change(passwordInput, { target: { value: 'test11!!' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(handleSubmitMock).toHaveBeenCalled());
    });
});
