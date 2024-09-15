import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VariableInput from '@/components/ui/VariableInput';
import { renderWithProviders } from '@/tests/testWithStore/renderWithProviders';

describe('VariableInput Component', () => {
    const mockDeleteFn = vi.fn();
    const mockSaveFn = vi.fn(() => true);

    const variable = { key: 'var1', value: 'value1' };

    it('renders the variable inputs and action buttons', async () => {
        await renderWithProviders(
            <VariableInput variable={variable} index={0} deleteFn={mockDeleteFn} saveFn={mockSaveFn} />,
            { locale: 'en' },
        );
        expect(screen.getByLabelText('Key')).toHaveValue('var1');
        expect(screen.getByLabelText('Value')).toHaveValue('value1');
        expect(screen.getByLabelText('variable-change')).toBeInTheDocument();
        expect(screen.getByLabelText('variable-delete')).toBeInTheDocument();
    });

    it('enables editing when the Edit button is clicked', async () => {
        await renderWithProviders(
            <VariableInput variable={variable} index={0} deleteFn={mockDeleteFn} saveFn={mockSaveFn} />,
            { locale: 'en' },
        );

        const keyInput = screen.getByLabelText('Key');
        const valueInput = screen.getByLabelText('Value');
        expect(keyInput).toBeDisabled();
        expect(valueInput).toBeDisabled();

        fireEvent.click(screen.getByLabelText('variable-change'));

        expect(keyInput).toBeEnabled();
        expect(valueInput).toBeEnabled();
    });

    it('saves the updated variable when the Save button is clicked', async () => {
        await renderWithProviders(
            <VariableInput variable={variable} index={0} deleteFn={mockDeleteFn} saveFn={mockSaveFn} />,
            { locale: 'en' },
        );

        fireEvent.click(screen.getByLabelText('variable-change'));
        fireEvent.change(screen.getByLabelText('Key'), { target: { value: 'updatedKey' } });
        fireEvent.change(screen.getByLabelText('Value'), { target: { value: 'updatedValue' } });

        fireEvent.click(screen.getByLabelText('variable-save'));

        expect(mockSaveFn).toHaveBeenCalledWith({
            newKey: 'updatedKey',
            oldKey: 'var1',
            value: 'updatedValue',
            index: 0,
        });

        expect(screen.getByLabelText('Key')).toBeDisabled();
        expect(screen.getByLabelText('Value')).toBeDisabled();
    });

    it('triggers deleteFn when the Delete button is clicked', async () => {
        await renderWithProviders(
            <VariableInput variable={variable} index={0} deleteFn={mockDeleteFn} saveFn={mockSaveFn} />,
            { locale: 'en' },
        );

        fireEvent.click(screen.getByLabelText('variable-delete'));
        expect(mockDeleteFn).toHaveBeenCalledWith('var1');
    });
});
