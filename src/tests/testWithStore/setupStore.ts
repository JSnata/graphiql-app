import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { testSlice } from '../../lib/features/testSlice';

const rootReducer = combineReducers({
    test: testSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        // middleware: (getDefaultMiddleware) => {
        //     return getDefaultMiddleware().concat();
        // },
    });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
