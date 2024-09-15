import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Header from '@/components/shared/Header';
import { auth } from '@/lib/firebase/config';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

vi.mock('firebase/auth', () => {
    const mockAuth = {
        onAuthStateChanged: vi.fn((callback) => {
            callback(null);
            return vi.fn();
        }),
        signOut: vi.fn(),
    };
    return {
        getAuth: vi.fn(() => mockAuth),
        auth: mockAuth,
        signOut: mockAuth.signOut,
        onAuthStateChanged: mockAuth.onAuthStateChanged,
    };
});

describe('Header Component', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it('renders correctly with no user (logged out)', async () => {
        await renderWithProviders(<Header />, { locale: 'en' });

        const signInButton = screen.getByRole('button', { name: /Sign in/i });
        expect(signInButton).toBeInTheDocument();

        const signUpButton = screen.getByRole('button', { name: /Signup/i });
        expect(signUpButton).toBeInTheDocument();
        expect(screen.queryByText(/Hi/i)).not.toBeInTheDocument();
    });

    it('renders correctly with a logged-in user', async () => {
        (auth.onAuthStateChanged as Mock).mockImplementationOnce((callback) => {
            callback({ email: 'testuser@gmail.com' });
            return vi.fn();
        });

        await renderWithProviders(<Header />, { locale: 'en' });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Hi, testuser/i })).toBeInTheDocument();
        });
    });

    it('handles logout click', async () => {
        (auth.onAuthStateChanged as Mock).mockImplementationOnce((callback) => {
            callback({ email: 'testuser@gmail.com' });
            return vi.fn();
        });

        await renderWithProviders(<Header />, { locale: 'en' });

        const logoutButton = screen.getByRole('button', { name: /Logout/i });
        fireEvent.click(logoutButton);

        await waitFor(() => {
            expect(signOut).toHaveBeenCalled();
        });
    });

    it('handles menu click in mobile view', async () => {
        global.innerWidth = 600;
        global.dispatchEvent(new Event('resize'));

        await renderWithProviders(<Header />, { locale: 'en' });

        const menuButton = screen.getByTestId('MenuIcon').closest('button');
        fireEvent.click(menuButton);

        const mobileSignInButton = screen.getByRole('menuitem', { name: /Sign In/i });

        await waitFor(() => {
            expect(mobileSignInButton).toBeInTheDocument();
        });
    });
});
