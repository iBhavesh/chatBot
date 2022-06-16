import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import questionsSlice from "./questionsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    questions: questionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
