import React from 'react';
import { screen, within } from '@testing-library/react';
import { useAuth } from '@/components/AuthWatcher';
import { describe, expect, it, vi } from 'vitest';
import Home from '../app/page';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('@/components/AuthWatcher', () => ({
    useAuth: vi.fn(),
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({})),
    signOut: vi.fn(),
}));

describe('Home Component', () => {
    it('renders loading state', async () => {
        (useAuth as vi.Mock).mockReturnValue({
            user: null,
            loading: true,
        });
        await renderWithProviders(<Home />, { locale: 'en' });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders when user is authenticated', () => {
        (useAuth as vi.Mock).mockReturnValue({
            user: { uid: '123', email: 'test@test.com' },
            loading: false,
        });
        renderWithProviders(<Home />);
        expect(screen.getByText('Restful')).toBeInTheDocument();
        expect(screen.getByText('GraphQL')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('renders when user not auth', () => {
        (useAuth as vi.Mock).mockReturnValue({
            user: null,
            loading: false,
        });

        renderWithProviders(<Home />);

        const container = screen.getByTestId('auth-actions-container');
        expect(container).toBeInTheDocument();

        const signinButton = within(container).getByRole('button', { name: /Sign in/i });
        const signupButton = within(container).getByRole('button', { name: /Signup/i });

        expect(signinButton).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
    });
});
