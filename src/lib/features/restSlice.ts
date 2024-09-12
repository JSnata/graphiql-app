import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ILsRequestData } from '@/types/lsData';

export interface RestSlice {
    method: string;
    requestBody: { [key: string]: string };
    responseBody: { [key: string]: string };
    statusCode: number;
    statusText: string;
    dataLS?: ILsRequestData;
}

const initialState: RestSlice = {
    method: 'get',
    requestBody: {},
    responseBody: {},
    statusCode: null,
    statusText: '',
    dataLS: null,
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
        setStatusText(state, action: PayloadAction<string>) {
            state.statusText = action.payload;
        },
        setMethod(state, action: PayloadAction<string>) {
            state.method = action.payload;
        },
        setRequestBody(state, action: PayloadAction<{ [key: string]: string }>) {
            state.requestBody = action.payload;
        },
        setDataLS(state, action: PayloadAction<ILsRequestData>) {
            state.dataLS = action.payload;
        },
        clearDataLS(state) {
            state.dataLS = null;
        },
    },
});

export const { setResponseBody, setStatusCode, setMethod, setStatusText, setDataLS, clearDataLS } = restSlice.actions;
export default restSlice.reducer;