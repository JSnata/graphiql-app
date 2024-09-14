import { configureStore } from '@reduxjs/toolkit';
import variablesReducer from './features/variablesSlice';
import requestReducer from './features/requestSlice';
import graphqlReducer from './features/graphqlSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            variables: variablesReducer,
            request: requestReducer,
            graphql: graphqlReducer,
        },
        // middleware: (getDefaultMiddleware) => {
        //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
        // },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
