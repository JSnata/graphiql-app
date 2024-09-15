import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RequestBar from '@/components/graphqlComponents/RequestBar';
import { renderWithProviders } from '@/tests/testWithStore/renderWithProviders';

vi.mock('@/utils/base64', () => ({
    encodeBase64: vi.fn((value: string) => btoa(value)),
    decodeBase64: vi.fn((value: string) => atob(value)),
}));

vi.mock('next/navigation', () => ({
    useParams: () => ({ graphqlRequest: ['GRAPHQL', 'endpoint', 'body'] }),
    useSearchParams: () => new URLSearchParams('?param1=value1'),
}));

describe('RequestBar', () => {
    const mockSendRequest = vi.fn();
    const mockSendIntrospection = vi.fn();

    it('renders correctly', async () => {
        await renderWithProviders(
            <RequestBar sendRequest={mockSendRequest} sendIntrospection={mockSendIntrospection} />,
            { locale: 'en' },
        );
        expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /explorer/i })).toBeInTheDocument();
    });
});
