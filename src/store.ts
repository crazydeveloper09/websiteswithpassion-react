
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import projectsReducer from './features/projects/projectsSlice';
import ordersReducer from "./features/orders/ordersSlice";
import categoriesReducer from "./features/categories/categories";

export const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectsReducer,
        orders: ordersReducer,
        categories: categoriesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch