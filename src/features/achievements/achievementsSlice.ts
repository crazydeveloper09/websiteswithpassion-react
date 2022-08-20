/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Achievement } from "../../interfaces";
import { RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL, USER_ID } from "../..";

export const loadAchievements = createAsyncThunk(
  "achievements/loadAchievements",
  async (arg, thunkAPI) => {
    try {
      const achievements = await axios.get(`${API_URL}/about/${USER_ID}/achievements`);
      return achievements.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
    
  }
);

export const deleteAchievement = createAsyncThunk(
  "achievements/deleteAchievement",
  async (achievementID: string, thunkAPI) => {
    try {
      const achievement = await axios.delete(`${API_URL}/about/${USER_ID}/achievements/${achievementID}`, {
        withCredentials: true,
      });
      return achievement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const editAchievement = createAsyncThunk(
  "achievements/editAchievement",
  async (achievement: Achievement, thunkAPI) => {
    try {
      const editedAchievement = await axios.put(
        `${API_URL}/about/${USER_ID}/achievements/${achievement._id}`,
        { achievement: achievement },
        { withCredentials: true }
      );
      return editedAchievement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addAchievement = createAsyncThunk(
  "Achievements/addAchievement",
  async (achievement: Achievement, thunkAPI) => {
    try {
      const addedAchievement = await axios.post(
        `${API_URL}/about/${USER_ID}/achievements`,
        achievement,
        { withCredentials: true,  
          headers: {
            "Content-Type": "multipart/form-data",
          }, 
        }
      );
      return addedAchievement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

type EditAchievementPicture = {
  file: string,
  achievementID: string,
  userID: string
}

export const editAchievementMainPhoto = createAsyncThunk(
  "achievements/editAchievement",
  async (args: EditAchievementPicture, thunkAPI) => {
    try {
      const achievement = await axios.post(
        `${API_URL}/about/${args.userID}/achievements/${args.achievementID}/edit/picture`,
        args.file,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return achievement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);


interface AchievementsState {
  all: Achievement[];
  isLoading: boolean;
  hasError: boolean;
  errMessage: string;
}

const initialState: AchievementsState = {
  all: [],
  isLoading: false,
  hasError: false,
  errMessage: "",
};

const sliceOptions = {
  name: "achievements",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(
        loadAchievements.fulfilled,
        (state: AchievementsState, action: PayloadAction<Achievement[]>) => {
          state.all = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addAchievement.fulfilled,
        (state: AchievementsState, action: PayloadAction<Achievement>) => {
          state.all.push(action.payload);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        editAchievement.fulfilled,
        (state: AchievementsState, action: PayloadAction<Achievement>) => {
          state.all = state.all.map((achievement) => achievement._id === action.payload._id ? action.payload : achievement)
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        deleteAchievement.fulfilled,
        (state: AchievementsState, action: PayloadAction<Achievement>) => {
          state.all = state.all.filter(
            (achievement) =>
              achievement._id !== (action.payload as Achievement)._id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadAchievements.pending,
          addAchievement.pending,
          editAchievement.pending,
          deleteAchievement.pending
        ),
        (state: AchievementsState) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadAchievements.rejected,
          addAchievement.rejected,
          editAchievement.rejected,
          deleteAchievement.rejected
        ),
        (state: AchievementsState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errMessage = action.payload;
        }
      );
  },
};

export const achievementsSlice = createSlice(sliceOptions);

export const selectAllAchievements = (state: RootState) => {
  return state.achievements.all;
};


export default achievementsSlice.reducer;
