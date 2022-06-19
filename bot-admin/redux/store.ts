import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import questionsSlice from "./questionsSlice";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    questions: questionsSlice,
    ui:uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
