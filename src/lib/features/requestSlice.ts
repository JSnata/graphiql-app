import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface RequestSlice {
    responseBody: { [key: string]: string } | string;
    statusCode: number;
    query: string;
    sdl: string;
}

const initialState: RequestSlice = {
    responseBody: {},
    statusCode: null,
    query: '',
    sdl: '',
};

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setResponseBody(state, action: PayloadAction<{ [key: string]: string } | string>) {
            state.responseBody = action.payload;
        },
        setStatusCode(state, action: PayloadAction<number>) {
            state.statusCode = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setSdl(state, action: PayloadAction<string>) {
            state.sdl = action.payload;
        },
    },
});

export const { setResponseBody, setStatusCode, setQuery, setSdl } = requestSlice.actions;
export default requestSlice.reducer;
