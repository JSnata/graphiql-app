import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HttpBodyVars from '@/components/HttpBodyVars';
import { removeVariableBodyField, saveBodyVariable } from '@/lib/features/variablesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('@/lib/hook', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

describe('HttpBodyVars Component', () => {
    const mockDispatch = vi.fn();
    beforeEach(() => {
        (useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as vi.Mock).mockReturnValue([{ key: 'var1', value: 'value1' }]);
        mockDispatch.mockClear();
    });

    it('renders VariablesField with variables from Redux store', async () => {
        renderWithProviders(<HttpBodyVars />);

        expect(screen.getByDisplayValue('var1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('value1')).toBeInTheDocument();
    });

    it('dispatches saveBodyVariable when saving an existing variable', async () => {
        renderWithProviders(<HttpBodyVars />);

        const keyInput = screen.getByDisplayValue('var1');
        const valueInput = screen.getByDisplayValue('value1');

        const changeButton = screen.getByLabelText('variable-change');
        fireEvent.click(changeButton);

        fireEvent.change(keyInput, { target: { value: 'updatedKey' } });
        fireEvent.change(valueInput, { target: { value: 'updatedValue' } });

        const saveArea = screen.getByLabelText('variable-save');
        fireEvent.click(saveArea);

        expect(mockDispatch).toHaveBeenCalledWith(
            saveBodyVariable({ oldKey: 'var1', newKey: 'updatedKey', value: 'updatedValue' }),
        );
    });

    it('dispatches removeVariableBodyField when removing a variable', async () => {
        renderWithProviders(<HttpBodyVars />);

        const removeButton = screen.getByLabelText('variable-delete');
        fireEvent.click(removeButton);
        expect(mockDispatch).toHaveBeenCalledWith(removeVariableBodyField('var1'));
    });
});
