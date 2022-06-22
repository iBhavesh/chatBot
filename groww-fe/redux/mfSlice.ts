import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {backendInstance} from "../axios.config";
import { RootState } from "./store";

export type MF = {
  _id: string;
  schemeName:string;
  nav:number;
  return3Y:number;
  fundSize:number;
  min_sip_investment:number;
  max_sip_investment:number;
  logoUrl:string;
};

interface InitialState {
  mfs: MF[];
  status: "idle" | "loading" | "error" | "success" | "refreshing";
}

const initialState: InitialState = {
  mfs: [],
  status: "idle",
};

export const fetchMFS = createAsyncThunk(
  "mfSlice/fetchMFS",
  async () => {
    const response = await backendInstance.get("/mf");
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "mfSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.mfs = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMFS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMFS.fulfilled, (state, action) => {
        state.status = "success";
        state.mfs = action.payload;
      }),
});

export const { reset } = stockSlice.actions;

export default stockSlice.reducer;
