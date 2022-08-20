/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";
import { RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL } from "../..";
import { LoginValues } from "./Login/Login";

export const loadUser = createAsyncThunk(
    "user/loadUser",
    async (arg, thunkAPI) => {
      try {
        const user = await axios.get(`${API_URL}/about`);
        return user.data;
      } catch(err: any) {
        if(!err.response) {
          throw err;
        }
        return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
      }
    }
);

export const logInUser = createAsyncThunk("user/logInUser", async (loginValues: LoginValues, thunkAPI) => {
  try {
    const loggedInUser = await axios.post(`${API_URL}/login`, loginValues, { withCredentials: true });
    return loggedInUser.data;
  } catch(err: any) {
    if(!err.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
  }
})

export const logOutUser = createAsyncThunk("user/logOutUser", async (arg, thunkAPI) => {
  try {
    const logOutAction = await axios.post(`${API_URL}/logout`);
    return;
  } catch(err: any) {
    if(!err.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
  }
})

export const editUser = createAsyncThunk(
    "user/editUser",
    async (user: User, thunkAPI) => {
      try {
        const editedUser = await axios.put(
          `${API_URL}/about/${user._id}`,
          { user: user },
          { withCredentials: true }
          );
          return editedUser.data;
      } catch(err: any) {
        if(!err.response) {
          throw err;
        }
        return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
      }
    }
);

interface UserState {
    info: User;
    isLoading: boolean;
    hasError: boolean;
    errMessage?: string;
    currentUser?: User;
}

const initialState: UserState = {
    info: {} as User,
    isLoading: false,
    hasError: false,
};

const sliceOptions = {
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
        .addCase(
            loadUser.fulfilled,
            (state: UserState, action: PayloadAction<User>) => {
              state.info = action.payload;
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addCase(
            logInUser.fulfilled,
            (state: UserState, action: PayloadAction<User>) => {
              state.currentUser = action.payload;
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addCase(
            editUser.fulfilled,
            (state: UserState, action: PayloadAction<User>) => {
              state.info = action.payload;
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addCase(
            logOutUser.fulfilled,
            (state: UserState, action: PayloadAction<User>) => {
              state.currentUser = undefined;
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addMatcher(
            isAnyOf(
              loadUser.pending,
              logInUser.pending,
              editUser.pending,
              logOutUser.pending
            ),
            (state: UserState) => {
              state.isLoading = true;
              state.hasError = false;
            }
          )
          .addMatcher(
            isAnyOf(
              loadUser.rejected,
              logInUser.rejected,
              editUser.rejected,
              logOutUser.rejected
            ),
            (state: UserState, action: PayloadAction<string>) => {
              state.isLoading = false;
              state.hasError = true;
              state.errMessage = action.payload;
            }
          );
      },
};

export const userSlice = createSlice(sliceOptions);

export const selectUserInfo = (state: RootState) => {
    return state.user.info;
};

export const selectLoggedInUser = (state: RootState) => {
    return state.user.currentUser;
};

export default userSlice.reducer;
