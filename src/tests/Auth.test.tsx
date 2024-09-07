import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import SessionProvider from '@/providers/SessionProvider';
import { NextIntlClientProvider } from 'next-intl';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SignUp from '@/app/signup/page';
import SignIn from '../app/signin/page';

vi.mock('next-auth/react', async () => {
    const originalModule = await vi.importActual('next-auth/react');
    return {
        ...originalModule,
        useSession: vi.fn(),
        signIn: vi.fn(),
    };
});

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('firebase/auth', () => {
    return {
        getAuth: vi.fn(() => ({})),
        createUserWithEmailAndPassword: vi.fn(),
    };
});

describe.each([
    {
        Component: SignIn,
        buttonText: 'Login',
        handleSubmitMock: signIn,
        messages: {
            Auth: { signin: 'Login', haveAcc: 'Don’t have an account?' },
        },
    },
    {
        Component: SignUp,
        buttonText: 'Sign Up',
        handleSubmitMock: createUserWithEmailAndPassword,
        messages: {
            Auth: { signup: 'Sign Up', haveAcc: 'Already have an account?' },
        },
    },
])('Auth Form Component', ({ Component, buttonText, handleSubmitMock, messages }) => {
    it(`should render form and handle submission`, async () => {
        const mockSession: Session = {
            expires: '1',
            user: { email: 'a', name: 'b' },
        };

        (useSession as vi.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });

        const mockPush = vi.fn();
        (useRouter as vi.Mock).mockReturnValue({
            push: mockPush,
        });

        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <SessionProvider session={mockSession}>
                    <Component />
                </SessionProvider>
            </NextIntlClientProvider>,
        );

        const emailInput = await screen.findByLabelText('Auth.email');
        const passwordInput = await screen.findByLabelText('Auth.password');
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
