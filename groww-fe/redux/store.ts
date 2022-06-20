import { configureStore } from "@reduxjs/toolkit";
import botSlice from "./botSlice";
import mfSlice from "./mfSlice";
import stock from "./stockSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    stock: stock,
    bot: botSlice,
    user: userSlice,
    mf: mfSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
