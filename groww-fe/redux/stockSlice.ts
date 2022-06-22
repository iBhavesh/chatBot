import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {backendInstance} from "../axios.config";
import { RootState } from "./store";

export type Stock = {
  _id: string;
  displayName: string;
  low: number;
  high: number;
  ltp: number;
  dayChange: number;
  dayChangePerc: number;
  logoUrl: string;
  marketCap: number;
  pbRatio: number;
  industryPe: number;
  roe: number;
  epsTtm: number;
  bookValue: number;
  yearHighPrice: number;
  yearLowPrice: number;
};

interface InitialState {
  stocks: Stock[];
  status: "idle" | "loading" | "error" | "success" | "refreshing";
}

const initialState: InitialState = {
  stocks: [],
  status: "idle",
};

export const fetchStocks = createAsyncThunk(
  "stockSlice/fetchStocks",
  async () => {
    const response = await backendInstance.get("/stocks");
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "stockSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.stocks = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = "success";
        state.stocks = action.payload;
      }),
});

export const { reset } = stockSlice.actions;

export const getAllStock = (state: RootState) => state.stock.stocks;

export const getSingleStock = createSelector(
  getAllStock,
  (state: RootState, id: string) => id,
  (state, id) => state.find((stock) => stock._id === id)
);

export default stockSlice.reducer;
