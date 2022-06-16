import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios.config";

export type InitialState = {
  categories: Array<{ [key: string]: any }>;
  status: "idle" | "loading" | "error" | "success" | "refreshing";
};

const initialState: InitialState = {
  categories: [],
  status: "idle",
};

export const fetchCategories = createAsyncThunk("categoriesSlice/fetchCategories", async () => {
  const response = await axiosInstance.get("/category/names");
  return response.data;
});

export const addCategory = createAsyncThunk("categoriesSlice/addCategory", async (data: any) => {
  const response = await axiosInstance.post("/category", data);
  return response.data;
});

export const deleteCategory = createAsyncThunk(
  "categoriesSlice/deleteCategory",
  async (id: string) => {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push({ _id: action.payload._id, path: action.payload.path });
        state.status = "success";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.status = "error";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category._id !== action.meta.arg);
        state.status = "success";
      });
  },
});

export const getAllCategories = (state: { categories: InitialState }) =>
  state.categories.categories;

export const getLeafNodes = createSelector([getAllCategories], (categories) =>
  categories.filter((category) => category.isLeafNode)
);

// export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
