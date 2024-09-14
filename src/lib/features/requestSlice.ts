import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RequestSlice {
    responseBody: { [key: string]: string };
    statusCode: number;
    statusText: string;
}

const initialState: RequestSlice = {
    responseBody: {},
    statusCode: null,
    statusText: '',
};

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setResponseBody(state, action: PayloadAction<{ [key: string]: string }>) {
            state.responseBody = action.payload;
        },
        setStatusCode(state, action: PayloadAction<number>) {
            state.statusCode = action.payload;
        },
        setStatusText(state, action: PayloadAction<string>) {
            state.statusText = action.payload;
        },
    },
});

export const { setResponseBody, setStatusCode, setStatusText } = requestSlice.actions;
export default requestSlice.reducer;
