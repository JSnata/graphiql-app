import React from 'react';
import { screen } from '@testing-library/react';
import InfoCard from '@/components/ui/InfoCard';
import { vi } from 'vitest';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

describe('InfoCard Component', () => {
    const mockProps = {
        name: 'Natallia Kulikouskaya',
        github: 'JSnata',
        githubLink: 'https://github.com/JSNata',
        location: 'Wrocław, Poland',
    };

    it('renders all data correctly', () => {
        renderWithProviders(
            <InfoCard
                name={mockProps.name}
                github={mockProps.github}
                githubLink={mockProps.githubLink}
                location={mockProps.location}
            />,
        );
        expect(screen.getByText('Natallia Kulikouskaya')).toBeInTheDocument();
        expect(screen.getByText('Location: Wrocław, Poland')).toBeInTheDocument();
        const githubLink = screen.getByText('JSnata');
        expect(githubLink).toBeInTheDocument();
        expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/JSNata');
    });
});
