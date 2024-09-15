import { configureStore } from '@reduxjs/toolkit';
import variablesReducer from './features/variablesSlice';
import requestReducer from './features/requestSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            variables: variablesReducer,
            request: requestReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
