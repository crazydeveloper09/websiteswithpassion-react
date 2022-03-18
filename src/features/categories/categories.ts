import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api";
import { Category } from "../../interfaces";
import { RootState } from "../../store";

export const loadCategories = createAsyncThunk(
    'categories/loadCategories',
    async (arg, thunkAPI) => {
        return await fetchCategories();
    }
)

interface CategoryState {
    all: Category[],
    hasError: boolean,
    isLoading: boolean
}

const initialState: CategoryState = {
    all: [],
    hasError: false,
    isLoading: false
}

const sliceOptions = {
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state: CategoryState, action: PayloadAction<Category>) => {
            state.all.push(action.payload);
        },
        editCategory: (state: CategoryState, action: PayloadAction<Category>) => {
            let foundedCategory = state.all.find(Category => Category._id === action.payload._id);
            foundedCategory = action.payload;
            console.log(foundedCategory)
        },
        deleteCategory: (state: CategoryState, action: PayloadAction<Category>) => {
            state.all = state.all.filter(Category => Category._id !== action.payload._id);
        },

    },
    extraReducers: (builder: any) => {
        builder
            .addCase(loadCategories.pending, (state: CategoryState) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadCategories.fulfilled, (state: CategoryState, action: PayloadAction<Category[]>) => {
                state.all = action.payload;
                console.log(action.payload)
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadCategories.rejected, (state: CategoryState) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
};

export const categoriesSlice = createSlice(sliceOptions);


export const selectAllCategories = (state: RootState) => {
    return state.categories.all
};

export default categoriesSlice.reducer;