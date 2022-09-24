/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../interfaces";
import { RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL } from "../..";
import { SendO } from './SendOffer';

export const loadOrders = createAsyncThunk(
  "orders/loadOrders",
  async (arg, thunkAPI) => {
    try {
      const orders = await axios.get(
        `${API_URL}/website-orders`
      );
      return orders.data; 
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderID: string, thunkAPI) => {
    try {
      const order = await axios.delete(`${API_URL}/website-orders/${orderID}`, {
        withCredentials: true,
      });
      return order.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
    
  }
);

export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async (order: Order, thunkAPI) => {
    try {
      const editedOrder = await axios.put(
        `${API_URL}/website-orders/${order._id}`,
        { order: order },
        { withCredentials: true }
      );
      return editedOrder.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/editOrder",
  async (order: Order, thunkAPI) => {
    try {
      const addedOrder = await axios.post(
        `${API_URL}/website-orders`,
        order,
        { withCredentials: true }
      );
      return addedOrder.data; 
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const sendOffer = createAsyncThunk(
  "orders/editOrder",
  async (message: SendO, thunkAPI) => {
    try {
      const addedOrder = await axios.post(
        `${API_URL}/website-orders/send`,
        message,
        { withCredentials: true }
      );
      return addedOrder.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

export const checkStatus = createAsyncThunk(
  "orders/checkStatus",
  async (email: string, thunkAPI) => {
    try {
      const foundOrders = await axios.get(
        `${API_URL}/website-orders/check-status?email=${email}`
      );
      return foundOrders.data;
    } catch(err: any) {
      if(!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
    }
  }
);

interface OrdersState {
  all: Order[];
  isLoading: boolean;
  hasError: boolean;
  errMessage: string;
  checkedOrders?: Order[]; 
}

const initialState: OrdersState = {
  all: [],
  isLoading: false,
  hasError: false,
  errMessage: "",
};

const sliceOptions = {
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(
        loadOrders.fulfilled,
        (state: OrdersState, action: PayloadAction<Order[]>) => {
          state.all = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        addOrder.fulfilled,
        (state: OrdersState, action: PayloadAction<Order>) => {
          state.all.push(action.payload);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        deleteOrder.fulfilled,
        (state: OrdersState, action: PayloadAction<Order>) => {
          state.all = state.all.filter(
            (order) =>
              order._id !== (action.payload as Order)._id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(
        checkStatus.fulfilled,
        (state: OrdersState, action: PayloadAction<Order[]>) => {
          state.checkedOrders = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(editOrder.fulfilled, sendOffer.fulfilled),
        (state: OrdersState, action: PayloadAction<Order>) => {
          let foundedOrder = state.all.find(
            (order) =>
              order._id !== (action.payload as Order)._id
          );
          foundedOrder = action.payload;
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadOrders.pending,
          addOrder.pending,
          editOrder.pending,
          deleteOrder.pending,
          sendOffer.pending,
          checkStatus.pending
        ),
        (state: OrdersState) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loadOrders.rejected,
          addOrder.rejected,
          editOrder.rejected,
          deleteOrder.rejected,
          sendOffer.rejected,
          checkStatus.rejected
        ),
        (state: OrdersState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errMessage = action.payload;
        }
      );
  },
};

export const ordersSlice = createSlice(sliceOptions);

export const selectAllOrders = (state: RootState) => {
  return state.orders.all;
};

export const selectCheckedOrders = (state: RootState) => {
  return state.orders.checkedOrders;
};


export default ordersSlice.reducer;
