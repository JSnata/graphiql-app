import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface VariablesSlice {
    variables: Array<{ [key: string]: string }>;
}

const initialState: VariablesSlice = {
    variables: [],
};

export const variablesSlice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        addVariableField(state, action: PayloadAction<{ [key: string]: string }>) {
            state.variables.push(action.payload);
        },
        removeVariableField(state, action: PayloadAction<string>) {
            state.variables = state.variables.filter((data) => data.key !== action.payload);
        },
        saveVariable(state, action: PayloadAction<{ key: string; value: string; selectedIndex: number }>) {
            const { key, value, selectedIndex } = action.payload;
            state.variables[selectedIndex].key = key;
            state.variables[selectedIndex].value = value;
        },
    },
});

export const { addVariableField, removeVariableField, saveVariable } = variablesSlice.actions;
export default variablesSlice.reducer;
