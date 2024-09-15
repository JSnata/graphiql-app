import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from './testWithStore/renderWithProviders';
import NotFound from '../app/not-found';

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

describe('NotFound Component', () => {
    it('renders the 404 Not Found title and description correctly', async () => {
        renderWithProviders(<NotFound />, { locale: 'en' });

        expect(screen.getByText('404 Not Found')).toBeInTheDocument();
        expect(screen.getByText('Could not find requested resource')).toBeInTheDocument();
    });

    it('renders the "Try again" button with a link to the homepage', async () => {
        renderWithProviders(<NotFound />, { locale: 'en' });

        const button = screen.getByRole('button', { name: 'Try again' });
        const link = screen.getByRole('link', { name: 'Try again' });
        expect(button).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});
