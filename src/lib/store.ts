import { configureStore } from '@reduxjs/toolkit';
import testReducer from './features/testSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            test: testReducer,
        },
        // middleware: (getDefaultMiddleware) => {
        //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
        // },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
