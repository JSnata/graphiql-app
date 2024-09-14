import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface GraphqlSlice {
    responseBody: { [key: string]: string };
    statusCode: number;
    statusText: string;
}

const initialState: GraphqlSlice = {
    responseBody: {},
    statusCode: null,
    statusText: '',
};

export const graphqlSlice = createSlice({
    name: 'graphql',
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

export const { setResponseBody, setStatusCode, setStatusText } = graphqlSlice.actions;
export default graphqlSlice.reducer;
