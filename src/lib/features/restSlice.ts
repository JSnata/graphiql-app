import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RestSlice {
    method: string;
    requestBody: { [key: string]: string };
    responseBody: { [key: string]: string };
    statusCode: number;
}

const initialState: RestSlice = {
    method: 'get',
    requestBody: {},
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
        setMethod(state, action: PayloadAction<string>) {
            state.method = action.payload;
        },
        setRequestBody(state, action: PayloadAction<{ [key: string]: string }>) {
            state.requestBody = action.payload;
        },
    },
});

export const { setResponseBody, setStatusCode, setMethod } = restSlice.actions;
export default restSlice.reducer;
