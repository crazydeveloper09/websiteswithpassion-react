/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Project, ProjectForm } from ".././../interfaces";
import { RootState } from "../../store";
import axios from "axios";
import { API_URL } from "../..";
import { ReviewForm } from "./AddProjectReview";

export const loadProjects = createAsyncThunk(
  "projects/loadProjects",
  async (arg, thunkAPI) => {
    try {
      const projects = await axios.get(`${API_URL}/projects`);
      return projects.data.projects.reverse();
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      console.log(err.response)
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectID: string, thunkAPI) => {
    try {
      const project = await axios.delete(`${API_URL}/projects/${projectID}`, {
        withCredentials: true,
      });
      return project.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const editProject = createAsyncThunk(
  "projects/editProject",
  async (project: ProjectForm, thunkAPI) => {
    try {
      const editedProject = await axios.put(
        `${API_URL}/projects/${project._id}`,
        { project: project },
        { withCredentials: true }
      );
      return editedProject.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project: ProjectForm, thunkAPI) => {
    try {
      const addedProject = await axios.post(`${API_URL}/projects`, project, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return addedProject.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addReview = createAsyncThunk(
  "projects/addReview",
  async (review: ReviewForm, thunkAPI) => {
    try {
      const addedReview = await axios.post(`${API_URL}/projects/${review.project._id}/reviews`, review, {
        withCredentials: true,
      });
      return addedReview.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

type EditProjectPicture = {
  file: string,
  projectID: string
}

export const editProjectMainPhoto = createAsyncThunk(
  "projects/editProject",
  async (args: EditProjectPicture, thunkAPI) => {
    const project = await axios.post(
      `${API_URL}/projects/${args.projectID}/edit/picture`,
      args.file,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return project.data;
  }
);

export const addPictureToGallery = createAsyncThunk(
  "projects/editProject",
  async (args: EditProjectPicture, thunkAPI) => {
    const project = await axios.post(
      `${API_URL}/projects/${args.projectID}/add/picture`,
      args.file,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return project.data;
  }
);

interface ProjectState {
  all: Project[];
  isLoading: boolean;
  hasError: boolean;
  errMessage?: string;
}

const initialState: ProjectState = {
  all: [],
  isLoading: false,
  hasError: false,
};

const sliceOptions = {
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(
        loadProjects.fulfilled,
        (state: ProjectState, action: PayloadAction<Project[]>) => {
          state.all = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addProject.fulfilled,
        (state: ProjectState, action: PayloadAction<Project>) => {
          state.all.push(action.payload);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        editProject.fulfilled,
        (state: ProjectState, action: PayloadAction<Project>) => {
          state.all = state.all.map((project) => project._id === action.payload._id ? action.payload : project)
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addReview.fulfilled,
        (state: ProjectState, action: PayloadAction<ReviewForm>) => {
          let foundedProject = state.all.find(
            (project) =>
              project._id !== action.payload._id
          );
          foundedProject = (action.payload) as unknown as Project;
          foundedProject.reviews.push(action.payload as unknown as Comment);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        deleteProject.fulfilled,
        (state: ProjectState, action: PayloadAction<Project>) => {
          state.all = state.all.filter(
            (Project) =>
              Project._id !== (action.payload as Project)._id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadProjects.pending,
          addProject.pending,
          editProject.pending,
          deleteProject.pending,
          addReview.pending
        ),
        (state: ProjectState) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadProjects.rejected,
          addProject.rejected,
          editProject.rejected,
          deleteProject.rejected,
          addReview.rejected
        ),
        (state: ProjectState, action: PayloadAction<string>) => {
          console.log(action)
          state.isLoading = false;
          state.hasError = true;
          state.errMessage = action.payload;
        }
      );
  },
};

export const projectsSlice = createSlice(sliceOptions);

export const selectAllProjects = (state: RootState) => {
  return state.projects.all;
};

export default projectsSlice.reducer;
