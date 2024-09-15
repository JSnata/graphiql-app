import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GraphQLSchema } from 'graphql/type';
import QueryBar from '@/components/graphqlComponents/QueryBar';
import { renderWithProviders } from '@/tests/testWithStore/renderWithProviders';

vi.mock('@/components/graphqlComponents/CodeMirrorGraphqlEditor', () => ({
    default: ({ handleChange }) => (
        <div>
            Mocked CodeMirror
            <button type="button" onClick={() => handleChange('new query')}>
                Change Query
            </button>
        </div>
    ),
}));

vi.mock('@/utils/base64', () => ({
    encodeBase64: vi.fn((value) => btoa(value)),
}));

vi.mock('next/navigation', () => ({
    usePathname: () => '/GRAPHQL/endpoint',
    useRouter: () => ({
        replace: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams('?param1=value1&param2=value2'),
}));

describe('QueryBar', () => {
    const schema = new GraphQLSchema({
        query: null,
    });

    const mockHandleChangeQuery = vi.fn();
    const mockSetErrorFormat = vi.fn();
    it('renders correctly with initial state', () => {
        renderWithProviders(
            <QueryBar schema={schema} handleChangeQuery={mockHandleChangeQuery} setErrorFormat={mockSetErrorFormat}>
                Documentation Content
            </QueryBar>,
        );

        expect(screen.getByText('Mocked CodeMirror')).toBeInTheDocument();
        expect(screen.queryByText('Documentation Content')).not.toBeInTheDocument();
    });

    it('toggles documentation visibility', async () => {
        await renderWithProviders(
            <QueryBar schema={schema} handleChangeQuery={mockHandleChangeQuery} setErrorFormat={mockSetErrorFormat}>
                Documentation Content
            </QueryBar>,
        );

        fireEvent.click(screen.getByLabelText('open-doc'));

        await waitFor(() => {
            expect(screen.getByText('Documentation Content')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByLabelText('open-doc'));

        await waitFor(() => {
            expect(screen.queryByText('Documentation Content')).not.toBeInTheDocument();
        });
    });

    it('sets error format when params are missing', async () => {
        vi.mock('next/navigation', () => ({
            usePathname: () => '/',
            useRouter: () => ({
                replace: vi.fn(),
            }),
            useSearchParams: () => new URLSearchParams(),
        }));
        await renderWithProviders(
            <QueryBar schema={schema} handleChangeQuery={mockHandleChangeQuery} setErrorFormat={mockSetErrorFormat}>
                Documentation Content
            </QueryBar>,
        );

        fireEvent.click(screen.getByText('Change Query'));

        await waitFor(() => {
            expect(mockSetErrorFormat).toHaveBeenCalledWith('Please enter the endpoint');
        });
    });
});
