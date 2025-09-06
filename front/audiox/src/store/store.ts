import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "./items/itemsSlice";

export const store = configureStore({
  reducer: {
    [itemsSlice.name]: itemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
