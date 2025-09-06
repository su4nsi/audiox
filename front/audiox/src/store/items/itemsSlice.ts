// src/store/items/itemsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllItems } from "../../services/api";

interface Item {
  id: number;
  name: string;
}

interface ItemsState {
  pokemons: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  pokemons: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk<
  Item[],
  void,
  { rejectValue: string }
>("items/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await getAllItems();
    if (response.success && Array.isArray(response.data)) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.error ?? "Error fetching items");
    }
  } catch (err: unknown) {
    if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearItems(state) {
      state.pokemons = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pokemons = action.payload ?? [];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string" ? action.payload : "Error";
      });
  },
});

export const { clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
