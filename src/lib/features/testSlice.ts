import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TestSlice {
    value: number;
}

const initialState: TestSlice = {
    value: 1,
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setNewNumber(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
});

export const { setNewNumber } = testSlice.actions;
export default testSlice.reducer;

