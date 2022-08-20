/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../..";
import { Category } from "../../interfaces";
import { RootState } from "../../store";

export const loadCategories = createAsyncThunk(
    'categories/loadCategories',
    async (arg, thunkAPI) => {
      try {
        const categories = await axios.get(
          `${API_URL}/projects/category`
        );
        return categories.data; 
      } catch(err: any) {
        if(!err.response) {
          throw err;
        }
        return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
      }
    }
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (categoryID: string, thunkAPI) => {
      try {
        const category = await axios.delete(
          `${API_URL}/projects/category/${categoryID}`,
          {
            withCredentials: true,
          }
        );
        return category.data;
      } catch(err: any) {
        if(!err.response) {
          throw err;
        }
        return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
      }
    }
  );
  
  export const editCategory = createAsyncThunk(
    "categories/editCategory",
    async (category: Category, thunkAPI) => {
      try {
        const editedCategory = await axios.put(
          `${API_URL}/projects/category/${category._id}`,
          { category: category },
          { withCredentials: true }
        );
        return editedCategory.data;
      } catch(err: any) {
        if(!err.response) {
          throw err;
        }
        return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
      }
    }
  );
  
  export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category: Category, thunkAPI) => {
      try {
        const addedCategory = await axios.post(
          `${API_URL}/projects/category`,
          category,
          {
            withCredentials: true,
          }
        );
        return addedCategory.data;
      } catch(err: any) {
        if(!err.response) {
          throw err;
        }
        return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`)
      }
      
    }
  );

interface CategoryState {
    all: Category[],
    hasError: boolean,
    isLoading: boolean,
    errMessage?: string,
}

const initialState: CategoryState = {
    all: [],
    hasError: false,
    isLoading: false
}

const sliceOptions = {
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
        .addCase(
            loadCategories.fulfilled,
            (state: CategoryState, action: PayloadAction<Category[]>) => {
              state.all = action.payload;
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addCase(
            addCategory.fulfilled,
            (state: CategoryState, action: PayloadAction<Category>) => {
              state.all.push(action.payload);
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addCase(
            editCategory.fulfilled,
            (state: CategoryState, action: PayloadAction<Category>) => {
              let foundedCategory = state.all.find(
                (category) =>
                  category._id !== (action.payload as Category)._id
              );
              foundedCategory = action.payload;
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addCase(
            deleteCategory.fulfilled,
            (state: CategoryState, action: PayloadAction<Category>) => {
              state.all = state.all.filter(
                (category) =>
                  category._id !== (action.payload as Category)._id
              );
              state.isLoading = false;
              state.hasError = false;
            }
          )
          .addMatcher(
            isAnyOf(
              loadCategories.pending,
              addCategory.pending,
              editCategory.pending,
              deleteCategory.pending
            ),
            (state: CategoryState) => {
              state.isLoading = true;
              state.hasError = false;
            }
          )
          .addMatcher(
            isAnyOf(
              loadCategories.rejected,
              addCategory.rejected,
              editCategory.rejected,
              deleteCategory.rejected
            ),
            (state: CategoryState, action: PayloadAction<string>) => {
              state.isLoading = false;
              state.hasError = true;
              state.errMessage = action.payload;
            }
          );
      },
};

export const categoriesSlice = createSlice(sliceOptions);


export const selectAllCategories = (state: RootState) => {
    return state.categories.all
};

export default categoriesSlice.reducer;