/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "../../interfaces";
import { RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL, USER_ID } from "../..";

export const loadServices = createAsyncThunk(
  "services/loadServices",
  async (arg, thunkAPI) => {
    try {
      const services = await axios.get(`${API_URL}/about/${USER_ID}/services`);
      return services.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (serviceID: string, thunkAPI) => {
    try {
      const service = await axios.delete(`${API_URL}/about/${USER_ID}/services/${serviceID}`, {
        withCredentials: true,
      });
      return service.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const editService = createAsyncThunk(
  "services/editService",
  async (service: Service, thunkAPI) => {
    try {
      const editedService = await axios.put(
        `${API_URL}/about/${USER_ID}/services/${service._id}`,
        { service: service },
        { withCredentials: true }
      );
      return editedService.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addService = createAsyncThunk(
  "services/addService",
  async (service: Service, thunkAPI) => {
    try {
      const addedService = await axios.post(
        `${API_URL}/about/${USER_ID}/services`,
        service,
        { withCredentials: true }
      );
      return addedService.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);


interface ServicesState {
  all: Service[];
  isLoading: boolean;
  hasError: boolean;
  errMessage: string;
}

const initialState: ServicesState = {
  all: [],
  isLoading: false,
  hasError: false,
  errMessage: "",
};

const sliceOptions = {
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(
        loadServices.fulfilled,
        (state: ServicesState, action: PayloadAction<Service[]>) => {
          state.all = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addService.fulfilled,
        (state: ServicesState, action: PayloadAction<Service>) => {
          state.all.push(action.payload);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        editService.fulfilled,
        (state: ServicesState, action: PayloadAction<Service>) => {
          state.all = state.all.map((service) => service._id === action.payload._id ? action.payload : service)
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        deleteService.fulfilled,
        (state: ServicesState, action: PayloadAction<Service>) => {
          state.all = state.all.filter(
            (service) =>
              service._id !== (action.payload as Service)._id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadServices.pending,
          addService.pending,
          editService.pending,
          deleteService.pending
        ),
        (state: ServicesState) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadServices.rejected,
          addService.rejected,
          editService.rejected,
          deleteService.rejected
        ),
        (state: ServicesState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errMessage = action.payload;
        }
      );
  },
};

export const servicesSlice = createSlice(sliceOptions);

export const selectAllServices = (state: RootState) => {
  return state.services.all;
};


export default servicesSlice.reducer;
