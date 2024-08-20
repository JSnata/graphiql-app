import { configureStore } from "@reduxjs/toolkit";
import  testSlice from "./features/testSlice";




export const makeStore = () => {
  return configureStore({
    reducer: {
      test: testSlice
    },
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
    // },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']