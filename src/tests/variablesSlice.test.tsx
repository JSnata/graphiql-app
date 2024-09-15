import {
    variableSlice,
    addVariableBodyField,
    removeVariableBodyField,
    saveBodyVariable,
} from '@/lib/features/variablesSlice';

describe('variableSlice Reducers', () => {
    const initialState = {
        variablesBody: [],
    };

    it('should handle addVariableBodyField action', () => {
        const action = addVariableBodyField({ key: 'testKey', value: 'testValue' });
        const state = variableSlice.reducer(initialState, action);

        expect(state.variablesBody).toEqual([{ key: 'testKey', value: 'testValue' }]);
    });

    it('should handle removeVariableBodyField action', () => {
        const populatedState = {
            variablesBody: [{ key: 'testKey', value: 'testValue' }],
        };
        const action = removeVariableBodyField('testKey');
        const state = variableSlice.reducer(populatedState, action);

        expect(state.variablesBody).toEqual([]);
    });

    it('should handle saveBodyVariable action', () => {
        const populatedState = {
            variablesBody: [{ key: 'testKey', value: 'testValue' }],
        };
        const action = saveBodyVariable({ oldKey: 'testKey', newKey: 'newKey', value: 'newValue' });
        const state = variableSlice.reducer(populatedState, action);

        expect(state.variablesBody).toEqual([{ key: 'newKey', value: 'newValue' }]);
    });
});
