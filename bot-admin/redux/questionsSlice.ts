import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios.config";
import {showMessage} from "./uiSlice";

export type InitialState = {
  questions: Array<{ [key: string]: any }>;
  status: "idle" | "loading" | "error" | "success" | "refreshing";
};

const initialState: InitialState = {
  questions: [],
  status: "idle",
};

export const fetchQuestions = createAsyncThunk("questionsSlice/fetchQuestions", async () => {
  const response = await axiosInstance.get("/questions/all");
  return response.data;
});

export const deleteQuestion = createAsyncThunk(
  "questionsSlice/deleteQuestion",
  async (id: string,{dispatch}) => {
   const response =  await axiosInstance.delete(`/questions/${id}`);
   if(response.status === 200)
   dispatch(showMessage({message:"Question deleted successfully!"}))
  }
);

const questionsSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = "success";
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(deleteQuestion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter((question) => question._id !== action.meta.arg);
        state.status = "success";
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

// export const {} = questionsSlice.actions;

export default questionsSlice.reducer;
