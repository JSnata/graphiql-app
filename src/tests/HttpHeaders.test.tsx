import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, Mock } from 'vitest';
import HttpHeaders from '@/components/HttpHeaders';
import { useRouter } from 'next/navigation';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
    usePathname: () => '/test',
    useSearchParams: () => new URLSearchParams('?param1=value1&param2=value2'),
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

describe('HttpHeaders Component', () => {
    const mockReplace = vi.fn();

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue({
            replace: mockReplace,
        });
        mockReplace.mockClear();
    });

    it('renders VariablesField with the correct variables', async () => {
        await renderWithProviders(<HttpHeaders />);

        expect(screen.getByDisplayValue('param1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('value1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('param2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('value2')).toBeInTheDocument();
    });

    it('handles saving a variable', async () => {
        await renderWithProviders(<HttpHeaders />);

        const keyInput = screen.getByDisplayValue('param1');
        const valueInput = screen.getByDisplayValue('value1');
        fireEvent.change(keyInput, { target: { value: 'newParam' } });
        fireEvent.change(valueInput, { target: { value: 'newValue' } });

        const changeButtons = screen.getAllByLabelText('variable-change');
        const firstChangeButton = changeButtons[0];

        fireEvent.click(firstChangeButton);

        const saveButton = screen.getByLabelText('variable-save');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith('/test?param1=value1&param2=value2&newParam=newValue');
        });
    });

    it('handles removing a variable', async () => {
        await renderWithProviders(<HttpHeaders />);

        const deleteButtons = screen.getAllByLabelText('variable-delete');
        const firstDeleteButton = deleteButtons[0];
        fireEvent.click(firstDeleteButton);

        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith('/test?param2=value2');
        });
    });
});
