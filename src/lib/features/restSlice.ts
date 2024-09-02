import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RestSlice {
    method: string;
    responseBody: { [key: string]: string };
    statusCode: number;
}

const initialState: RestSlice = {
    method: '',
    responseBody: {},
    statusCode: null,
};

export const restSlice = createSlice({
    name: 'rest',
    initialState,
    reducers: {
        setResponseBody(state, action: PayloadAction<{ [key: string]: string }>) {
            state.responseBody = action.payload;
        },
        setStatusCode(state, action: PayloadAction<number>) {
            state.statusCode = action.payload;
        },
    },
});

export const { setResponseBody, setStatusCode } = restSlice.actions;
export default restSlice.reducer;
