import { describe, expect, test } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Restful from '@/app/[...request]/page';
import { renderWithProviders } from './testWithStore/renderWithProviders';

describe('TEST ', () => {
    test('Preloaded state to render', () => {
        renderWithProviders(<Restful />, {
            preloadedState: {
                test: {
                    value: 5,
                },
            },
        });
        const value = screen.getByText(5);
        expect(value).toBeInTheDocument();
    });

    test('Button', async () => {
        renderWithProviders(<Restful />);
        const button = screen.getByText('+1');
        expect(button).toBeInTheDocument();
    });
    test('Click', async () => {
        renderWithProviders(<Restful />, {
            preloadedState: {
                test: {
                    value: 5,
                },
            },
        });
        const button = screen.getByText('+1');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        await waitFor(() => {
            const value = screen.getByText(6);
            expect(value).toBeInTheDocument();
        });
    });
});