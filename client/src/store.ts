
import { configureStore } from "@reduxjs/toolkit";
import getUserReducer from "./features/user/userSlice";
import projectsReducer from './features/projects/projectsSlice';
import getOrdersReducer from "./features/orders/ordersSlice";

export const store = configureStore({
    reducer: {
        user: getUserReducer,
        projects: projectsReducer,
        orders: getOrdersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch