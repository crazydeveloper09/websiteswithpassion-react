import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProjects } from '../../api';
import { Project } from '.././../interfaces';
import { RootState } from '../../store';

export const getAll = createAsyncThunk(
    'projects/getAll',
    async (arg, thunkAPI) => {
        return await fetchProjects();
        
    }
)


interface ProjectState {
    all: Project[],
    isLoading: boolean,
    hasError: boolean
}

const initialState: ProjectState = {
    all: [],
    isLoading: false,
    hasError: false
}

const sliceOptions = {
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state: ProjectState, action: PayloadAction<Project>) => {
            state.all.push(action.payload);
        },
        editProject: (state: ProjectState, action: PayloadAction<Project>) => {
            let foundedProject = state.all.find(project => project._id === action.payload._id);
            foundedProject = action.payload;
        },
        deleteProject: (state: ProjectState, action: PayloadAction<Project>) => {
            state.all = state.all.filter(project => project._id !== action.payload._id);
        },

    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getAll.pending, (state: ProjectState) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getAll.fulfilled, (state: ProjectState, action: PayloadAction<{ projects: Project[]}>) => {
                state.all = action.payload.projects.reverse();
                
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(getAll.rejected, (state: ProjectState) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
};

export const projectsSlice = createSlice(sliceOptions);


export const selectAllProjects = (state: RootState) => {
    console.log(state)
    return state.projects.all
};

export default projectsSlice.reducer;