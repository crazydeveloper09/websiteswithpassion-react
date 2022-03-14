import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders } from "../../api";
import { Order } from '../../interfaces';
import { RootState } from "../../store";
import { AxiosError } from "axios";

export const loadOrders = createAsyncThunk(
    'orders/loadOrders',
    async (arg, thunkAPI) => {
        return await fetchOrders();
    }
)


interface OrdersState {
    all: Order[],
    isLoading: boolean,
    hasError: boolean,
    errMesage: string
}

const initialState: OrdersState = {
    all: [],
    isLoading: false,
    hasError: false,
    errMesage: ''
}

const sliceOptions = {
    name: 'orders',
    initialState,
    reducers: {
        deleteOrder: (state: OrdersState, action: PayloadAction<Order | AxiosError>) => {
           if((action.payload as AxiosError).message){
               state.hasError = true;
               state.errMesage = (action.payload as AxiosError).message;
               return;
           }
           state.all = state.all.filter(order => order._id !== (action.payload as Order)._id);
        },
        editOrder: (state: OrdersState, action: PayloadAction<Order>) => {
            let foundedOrder = state.all.find(order => order._id === action.payload._id);
            foundedOrder = action.payload
        },
        addOrder: (state: OrdersState, action: PayloadAction<Order>) => {
            state.all.push(action.payload);
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(loadOrders.pending, (state: OrdersState) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadOrders.fulfilled, (state: OrdersState, action: PayloadAction<Order[]>) => {
                state.all = action.payload;
                
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadOrders.rejected, (state: OrdersState) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
}

export const ordersSlice = createSlice(sliceOptions);

export const selectAllOrders = (state: RootState) => {
    return state.orders.all;
}


export const { deleteOrder, editOrder, addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;