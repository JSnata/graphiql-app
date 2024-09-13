import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import AuthWatcher, { useAuth } from '../components/AuthWatcher';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('@/components/AuthWatcher', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({})),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn((auth, callback) => {
        callback(null);
        return vi.fn();
    }),
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

describe('AuthWatcher Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children after loading completes with no user', async () => {
        (useAuth as vi.Mock).mockReturnValue({
            user: null,
            loading: false,
        });

        renderWithProviders(
            <AuthWatcher>
                <div>No user Content</div>
            </AuthWatcher>,
        );

        await waitFor(() => {
            expect(screen.getByText('No user Content')).toBeInTheDocument();
        });
    });

    it('renders children when user is authenticated', async () => {
        (useAuth as vi.Mock).mockReturnValue({
            user: { uid: '123', email: 'test@example.com' },
            loading: false,
        });

        renderWithProviders(
            <AuthWatcher>
                <div>User Content</div>
            </AuthWatcher>,
        );

        await waitFor(() => {
            expect(screen.getByText('User Content')).toBeInTheDocument();
        });
    });
});
