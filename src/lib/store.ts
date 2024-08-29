import { configureStore } from '@reduxjs/toolkit';
import testReducer from './features/testSlice';
import variablesReducer from './features/variablesSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            test: testReducer,
            variables: variablesReducer,
        },
        // middleware: (getDefaultMiddleware) => {
        //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
        // },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
