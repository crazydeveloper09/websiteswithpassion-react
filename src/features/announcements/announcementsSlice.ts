/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Announcement } from ".././../interfaces";
import { RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL } from "../..";

export const loadAnnouncements = createAsyncThunk(
  "announcements/loadAnnouncements",
  async (arg, thunkAPI) => {
    try {
      const announcements = await axios.get(`${API_URL}/announcements`);
    return announcements.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (announcementID: string, thunkAPI) => {
    try {
      const announcement = await axios.delete(
        `${API_URL}/announcements/${announcementID}`,
        {
          withCredentials: true,
        }
      );
      return announcement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const editAnnouncement = createAsyncThunk(
  "announcements/editAnnouncement",
  async (announcement: Announcement, thunkAPI) => {
    try {
      const editedAnnouncement = await axios.put(
        `${API_URL}/announcements/${announcement._id}`,
        { announcement: announcement },
        { withCredentials: true }
      );
      return editedAnnouncement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addAnnouncement = createAsyncThunk(
  "announcements/addAnnouncement",
  async (announcement: Announcement, thunkAPI) => {
    try {
      const addedAnnouncement = await axios.post(
        `${API_URL}/announcements`,
        announcement,
        {
          withCredentials: true,
        }
      );
      return addedAnnouncement.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

interface AnnouncementState {
  all: Announcement[];
  isLoading: boolean;
  hasError: boolean;
  errMessage?: string;
}

const initialState: AnnouncementState = {
  all: [],
  isLoading: false,
  hasError: false,
};

const sliceOptions = {
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(
        loadAnnouncements.fulfilled,
        (state: AnnouncementState, action: PayloadAction<Announcement[]>) => {
          state.all = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addAnnouncement.fulfilled,
        (state: AnnouncementState, action: PayloadAction<Announcement>) => {
          state.all.push(action.payload);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        editAnnouncement.fulfilled,
        (state: AnnouncementState, action: PayloadAction<Announcement>) => {
          let foundedAnnouncement = state.all.find(
            (announcement) =>
              announcement._id !== (action.payload as Announcement)._id
          );
          foundedAnnouncement = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        deleteAnnouncement.fulfilled,
        (state: AnnouncementState, action: PayloadAction<Announcement>) => {
          state.all = state.all.filter(
            (announcement) =>
              announcement._id !== (action.payload as Announcement)._id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadAnnouncements.pending,
          addAnnouncement.pending,
          editAnnouncement.pending,
          deleteAnnouncement.pending
        ),
        (state: AnnouncementState) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadAnnouncements.rejected,
          addAnnouncement.rejected,
          editAnnouncement.rejected,
          deleteAnnouncement.rejected
        ),
        (state: AnnouncementState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errMessage = action.payload;
        }
      );
  },
};

export const announcementsSlice = createSlice(sliceOptions);

export const selectLastAnnouncement = (state: RootState) => {
  return state.announcements.all[state.announcements.all.length - 1];
};

export const selectAllAnnouncements = (state: RootState) => {
  return state.announcements.all;
};

export default announcementsSlice.reducer;
