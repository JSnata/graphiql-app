import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Restful from '../app/[...request]/page';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('@uiw/react-codemirror', async () => {
    const original = await vi.importActual('@uiw/react-codemirror');
    return {
        ...original,
        default: () => <div>Mocked CodeMirror</div>,
    };
});

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({})),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn((auth, callback) => {
        callback(null);
        return vi.fn();
    }),
}));

vi.mock('next/navigation', async () => {
    const original = await vi.importActual('next/navigation');
    return {
        ...original,
        useRouter: () => ({
            replace: vi.fn(),
            push: vi.fn(),
            pathname: '/restful',
        }),
        useParams: () => ({
            request: ['GET', 'endpoint', 'body'],
        }),
        usePathname: () => '/restful',
        useSearchParams: () => new URLSearchParams('?param1=value1&param2=value2'),
    };
});

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

describe('Restful Component Test', async () => {
    it('renders the Restful component and its child components correctly', async () => {
        await renderWithProviders(<Restful />, { locale: 'en' });

        expect(screen.getByText('Restful Client')).toBeInTheDocument();
        expect(screen.getByText(/Send/i)).toBeInTheDocument();
        expect(screen.getByText(/Beautify/i)).toBeInTheDocument();
        expect(screen.getByText(/Headers/i)).toBeInTheDocument();
        expect(screen.getByText(/Variables/i)).toBeInTheDocument();
    });

    it('beautifies the code in HttpBody when Beautify is clicked', async () => {
        await renderWithProviders(<Restful />);

        const beautifyButton = screen.getByText('Beautify');
        expect(beautifyButton).toBeInTheDocument();

        fireEvent.click(beautifyButton);

        await waitFor(() => {
            expect(screen.queryByText('Error')).not.toBeInTheDocument();
        });
    });
});
