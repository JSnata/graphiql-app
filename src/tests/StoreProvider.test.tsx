import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StoreProvider from '../providers/StoreProvider';

vi.mock('@/lib/store', () => ({
    makeStore: vi.fn(() => ({
        dispatch: vi.fn(),
        getState: vi.fn(() => ({})),
        subscribe: vi.fn(),
        replaceReducer: vi.fn(),
    })),
}));

describe('StoreProvider Component', () => {
    it('renders children passed to it', () => {
        render(
            <StoreProvider>
                <div>Test Child</div>
            </StoreProvider>,
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});
