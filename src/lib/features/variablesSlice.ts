import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Variable {
    key: string;
    value: string;
}

export interface ChangedVariable {
    oldKey: string;
    newKey: string;
    value: string;
}

export interface VariablesSlice {
    variablesBody: Variable[];
}

const initialState: VariablesSlice = {
    variablesBody: [],
};

export const variableSlice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        addVariableBodyField(state, action: PayloadAction<Variable>) {
            state.variablesBody.push(action.payload);
        },
        removeVariableBodyField(state, action: PayloadAction<string>) {
            state.variablesBody = state.variablesBody.filter((data) => data.key !== action.payload);
        },
        saveBodyVariable(state, action: PayloadAction<ChangedVariable>) {
            const { oldKey, newKey, value } = action.payload;
            const targetVariable = state.variablesBody.find((variable) => variable.key === oldKey);
            targetVariable.key = newKey;
            targetVariable.value = value;
        },
    },
});

export const { addVariableBodyField, removeVariableBodyField, saveBodyVariable } = variableSlice.actions;
export default variableSlice.reducer;
