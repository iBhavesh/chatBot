import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios.config";

export type InitialState = {
  message:string;
  show:boolean;
  type:"success" | "error";
};

const initialState: InitialState = {
  message:"",
  show:false,
  type:"success"
};

const questionsSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    showMessage(state,action) {
        state.message = action.payload.message;
        state.type = action.payload.type;
        state.show = true;
    },
    resetMessage(state) {
      state.message = "";
      state.show = false;
    }
  },
});

export const {showMessage,resetMessage} = questionsSlice.actions;

export default questionsSlice.reducer;
