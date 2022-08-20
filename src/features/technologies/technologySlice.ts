/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Technology } from "../../interfaces";
import { RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL, USER_ID } from "../..";

export const loadTechnologies = createAsyncThunk(
  "technologies/loadTechnologies",
  async (arg, thunkAPI) => {
    try {
      const technologies = await axios.get(
        `${API_URL}/about/${USER_ID}/technologies`
      );
      return technologies.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    } 
  }
);

export const deleteTechnology = createAsyncThunk(
  "technologies/deleteTechnology",
  async (technologyID: string, thunkAPI) => {
    try {
      const technology = await axios.delete(
        `${API_URL}/about/${USER_ID}/technologies/${technologyID}`,
        {
          withCredentials: true,
        }
      );
      return technology.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const editTechnology = createAsyncThunk(
  "technologies/editTechnology",
  async (technology: Technology, thunkAPI) => {
    try {
      const editedTechnology = await axios.put(
        `${API_URL}/about/${USER_ID}/technologies/${technology._id}`,
        { technology: technology },
        { withCredentials: true }
      );
      console.log(editedTechnology.data);
      return {...technology, user: USER_ID};
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addTechnology = createAsyncThunk(
  "technologies/addTechnology",
  async (technology: Technology, thunkAPI) => {
    try {
      const addedTechnology = await axios.post(
        `${API_URL}/about/${USER_ID}/technologies`,
        technology,
        { withCredentials: true }
      );
      return addedTechnology.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

interface TechnologiesState {
  all: Technology[];
  isLoading: boolean;
  hasError: boolean;
  errMessage: string;
}

const initialState: TechnologiesState = {
  all: [],
  isLoading: false,
  hasError: false,
  errMessage: "",
};

const sliceOptions = {
  name: "technologies",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(
        loadTechnologies.fulfilled,
        (state: TechnologiesState, action: PayloadAction<Technology[]>) => {
          state.all = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addTechnology.fulfilled,
        (state: TechnologiesState, action: PayloadAction<Technology>) => {
          state.all.push(action.payload);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        editTechnology.fulfilled,
        (state: TechnologiesState, action: PayloadAction<Technology>) => {
          state.all = state.all.map((technology) => technology._id === action.payload._id ? action.payload : technology)
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        deleteTechnology.fulfilled,
        (state: TechnologiesState, action: PayloadAction<Technology>) => {
          state.all = state.all.filter(
            (technology) =>
              technology._id !== (action.payload as Technology)._id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadTechnologies.pending,
          addTechnology.pending,
          editTechnology.pending,
          deleteTechnology.pending
        ),
        (state: TechnologiesState) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadTechnologies.rejected,
          addTechnology.rejected,
          editTechnology.rejected,
          deleteTechnology.rejected
        ),
        (state: TechnologiesState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errMessage = action.payload;
        }
      );
  },
};

export const technologiesSlice = createSlice(sliceOptions);

export const selectAllTechnologies = (state: RootState) => {
  return state.technologies.all;
};

export default technologiesSlice.reducer;
