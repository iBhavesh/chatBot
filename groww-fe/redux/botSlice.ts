import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";
import { RootState } from "./store";

export type Message = {
  fromUser: boolean;
  message: string;
};

interface InitialState {
  messages: Message[];
  questions: { [key: string]: any }[];
  status: "idle" | "loading" | "error" | "success" | "refreshing";
  askedQuestions: string[];
  showBot: boolean;
}

const initialState: InitialState = {
  messages: [],
  questions: [],
  status: "idle",
  askedQuestions: [],
  showBot: false,
};

export const getQuestions = createAsyncThunk(
  "botSlice/getQuestions",
  async (options: NodeJS.Dict<any>, thunkApi) => {
    const state = thunkApi.getState();
    const response = await axios.get("http://localhost:4001/questions", {
      params: {
        ...options,
        userId: (state as any).user.user?._id,
      },
    });
    return response.data;
  }
);

export const selectQuestion = createAsyncThunk(
  "botSlice/selectQuestion",
  async (arg: { id: string; index: number }, thunkApi) => {
    axios.patch(`http://localhost:4001/question/${arg.id}/increase`);
    const state:any = thunkApi.getState();
    const response = await axios.get(
      `http://localhost:4001/question/${arg.id}`,
      {
        params: {
          ...Router.query,
          userId: state.user.user?._id,
        },
      }
    );
    return response.data;
  }
);

const botSlice = createSlice({
  name: "botSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.messages = [];
      state.status = "idle";
    },
    showCustomMessage(state,action) {
      state.messages.push({fromUser:false,message:action.payload});
      state.showBot = true;
    },
    hideBot(state) {
      state.showBot = false;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = "success";
      })
      .addCase(getQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestions.rejected, (state) => {
        state.status = "error";
      })
      .addCase(selectQuestion.pending, (state, action) => {
        state.status = "loading";
        state.messages.push({
          message: state.questions[action.meta.arg.index].question,
          fromUser: true,
        });
        state.questions = [];
      })
      .addCase(selectQuestion.fulfilled, (state, action) => {
        state.status = "success";
        state.messages.push({
          message: action.payload.answer,
          fromUser: false,
        });
      })
      .addCase(selectQuestion.rejected, (state, action) => {
        state.status = "error";
      }),
});

export const { reset,showCustomMessage,hideBot } = botSlice.actions;

export default botSlice.reducer;
