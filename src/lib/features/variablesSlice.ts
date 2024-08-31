import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface VariablesSlice {
    variablesBody: Array<{ [key: string]: string }>;
    variablesHeader: Array<{ [key: string]: string }>;
}

const initialState: VariablesSlice = {
    variablesBody: [],
    variablesHeader: [
        {
            key: 'Content-Type',
            value: '',
        },
        {
            key: 'Authorization',
            value: '',
        },
        {
            key: 'Cookie',
            value: '',
        },
        {
            key: 'User-Agent',
            value: '',
        },
        {
            key: 'Referer',
            value: '',
        },
        {
            key: 'Origin',
            value: '',
        },
        {
            key: 'Host',
            value: '',
        },
    ],
};

export const variableSlice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        addVariableBodyField(state, action: PayloadAction<{ [key: string]: string }>) {
            state.variablesBody.push(action.payload);
        },
        removeVariableBodyField(state, action: PayloadAction<string>) {
            state.variablesBody = state.variablesBody.filter((data) => data.key !== action.payload);
        },
        saveBodyVariable(state, action: PayloadAction<{ key: string; value: string; selectedIndex: number }>) {
            const { key, value, selectedIndex } = action.payload;
            state.variablesBody[selectedIndex].key = key;
            state.variablesBody[selectedIndex].value = value;
        },
        addVariableHeaderField(state, action: PayloadAction<{ [key: string]: string }>) {
            state.variablesHeader.push(action.payload);
        },
        removeVariableHeaderField(state, action: PayloadAction<string>) {
            state.variablesHeader = state.variablesHeader.filter((data) => data.key !== action.payload);
        },
        saveHeaderVariable(state, action: PayloadAction<{ key: string; value: string; selectedIndex: number }>) {
            const { key, value, selectedIndex } = action.payload;
            state.variablesHeader[selectedIndex].key = key;
            state.variablesHeader[selectedIndex].value = value;
        },
    },
});

export const {
    addVariableBodyField,
    removeVariableBodyField,
    saveBodyVariable,
    addVariableHeaderField,
    removeVariableHeaderField,
    saveHeaderVariable,
} = variableSlice.actions;
export default variableSlice.reducer;
