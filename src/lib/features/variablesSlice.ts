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
        addVariable(state, action: PayloadAction<{ [key: string]: string }>) {
            state.variables.push(action.payload);
        },
        removeVariable(state, action: PayloadAction<string>) {
            state.variables = state.variables.filter((data) => data.key !== action.payload);
        },
        clearVariables(state) {
            state.variables = [];
        },
    },
});

export const { addVariable, removeVariable, clearVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
