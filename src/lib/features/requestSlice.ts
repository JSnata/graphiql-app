import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ILsRequestData } from '@/types/lsData';

export interface RequestSlice {
    responseBody: { [key: string]: string } | string;
    statusCode: number;
    statusText: string;
    dataLS?: ILsRequestData;
}

const initialState: RequestSlice = {
    responseBody: {},
    statusCode: null,
    statusText: '',
    dataLS: null,
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
        setStatusText(state, action: PayloadAction<string>) {
            state.statusText = action.payload;
        },
        setDataLS(state, action: PayloadAction<ILsRequestData>) {
            state.dataLS = action.payload;
        },
    },
});

export const { setResponseBody, setStatusCode, setStatusText, setDataLS } = requestSlice.actions;
export default requestSlice.reducer;
