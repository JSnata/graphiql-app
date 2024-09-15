import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { buildSchema } from 'graphql';
import { renderWithProviders } from '@/tests/testWithStore/renderWithProviders';
import CodeMirrorGraphqlEditor from '@/components/graphqlComponents/CodeMirrorGraphqlEditor';

vi.mock('@/lib/hook', () => ({
    useAppSelector: vi.fn(),
}));

vi.mock('@uiw/react-codemirror', async () => {
    const original = await vi.importActual('@uiw/react-codemirror');
    return {
        ...original,
        default: () => <div data-testid="codemirror-editor">Mocked CodeMirror</div>,
    };
});

describe('CodeMirrorGraphqlEditor', () => {
    const schema = buildSchema(`
        type Query {
            hello: String
        }
    `);

    const mockHandleChange = vi.fn();

    it('renders correctly with initial query', async () => {
        await renderWithProviders(<CodeMirrorGraphqlEditor schema={schema} handleChange={mockHandleChange} />);

        expect(screen.getByText('Mocked CodeMirror')).toBeInTheDocument();
    });
});
