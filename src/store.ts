
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import projectsReducer from './features/projects/projectsSlice';
import ordersReducer from "./features/orders/ordersSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import serviceReducer from "./features/services/serviceSlice";
import technologyReducer from "./features/technologies/technologySlice";
import achievementsSlice from "./features/achievements/achievementsSlice";
import announcementsSlice from "./features/announcements/announcementsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectsReducer,
        orders: ordersReducer,
        categories: categoriesReducer,
        services: serviceReducer,
        technologies: technologyReducer,
        achievements: achievementsSlice,
        announcements: announcementsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch