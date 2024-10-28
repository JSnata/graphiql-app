import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReactGraphqlEditor from '@/components/graphqlComponents/ReactGraphqlEditor';

vi.mock('@graphiql/toolkit', () => ({
    createGraphiQLFetcher: vi.fn(() => vi.fn()),
}));

describe('ReactGraphqlEditor', () => {
    it('renders DocExplorer inside GraphiQLProvider', () => {
        const url = 'https://example.com/graphql';

        render(<ReactGraphqlEditor url={url} />);

        expect(screen.getByText(/Docs/i)).toBeInTheDocument();
    });
});
