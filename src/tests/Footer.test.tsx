import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '@/components/shared/Footer';
import { vi } from 'vitest';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('next/link', () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

vi.mock('next/image', () => ({
    default: ({ alt }: { alt: string }) => <div>{alt}</div>,
}));

describe('Footer Component', () => {
    it('renders GitHub links correctly', () => {
        renderWithProviders(<Footer />);

        expect(screen.getByText('LinderJK')).toHaveAttribute('href', 'https://github.com/linderjk');
        expect(screen.getByText('JSNata')).toHaveAttribute('href', 'https://github.com/jsnata');
        expect(screen.getByText('DialecticalLaw')).toHaveAttribute('href', 'https://github.com/dialecticallaw');
    });

    it('displays the current year', () => {
        renderWithProviders(<Footer />);

        const year = new Date().getFullYear();
        expect(screen.getByText(year.toString())).toBeInTheDocument();
    });

    it('renders the RSSchool logo correctly', () => {
        renderWithProviders(<Footer />);
        const logo = screen.getByText('logoRss');
        expect(logo).toBeInTheDocument();
    });
});
