import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { backendInstance } from "../axios.config";

type User = {
  _id: number;
  name: string;
  email: string;
};

type UserInitialState = {
  accessToken?: string;
  refreshToken?: string;
  user: User | null;
  error?: any;
  status: "idle" | "loading" | "error" | "success";
};

const initialState: UserInitialState = {
  status: "idle",
  user: null,
};

export const fetchUserInfo = createAsyncThunk(
  "userSlice/fetchUserInfo",
  async () => {
    const response = await backendInstance.get("/user");
    return response.data;
  }
);

export const login = createAsyncThunk(
  "userSlice/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await backendInstance.post("/auth/login", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.payload;
      if (action.payload.accessToken) {
        const decoded = jwtDecode(action.payload.accessToken);
        state.user = decoded as User;
      }
    },
    logout(state) {
      delete state.accessToken;
      delete state.refreshToken;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.status = "success";
        state.error = null;
        const decoded = jwtDecode(action.payload.accessToken);
        state.user = decoded as User;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";

        if (action.payload.type && action.payload.type === "validation") {
          state.error = action.payload.errors;
        } else {
          state.error = action.payload;
        }
      })
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = "success";
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      }),
});

export const { setAccessToken, logout } = userSlice.actions;

export default userSlice.reducer;
