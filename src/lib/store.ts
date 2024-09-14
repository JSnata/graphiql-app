import { configureStore } from '@reduxjs/toolkit';
import variablesReducer from './features/variablesSlice';
import restReducer from './features/restSlice';
import graphqlReducer from './features/graphqlSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            variables: variablesReducer,
            rest: restReducer,
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
