import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../../api';
import { User } from '../../../../server/src/models/user';
import { RootState } from '../../store';
import { AxiosError } from 'axios';

export const loadUser = createAsyncThunk(
    'user/loadUser',
    async (arg, thunkAPI) => {
        return await fetchUserInfo();
        
    }
)

interface UserState {
    info: User,
    isLoading: boolean,
    hasError: boolean,
    errMessage?: string,
    currentUser?: User
}

const initialState: UserState = {
    info: ({} as User),
    isLoading: false,
    hasError: false,
}

const sliceOptions = {
    name: 'user',
    initialState,
    reducers: {
        logInUser: (state: UserState, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        logOutUser: (state: UserState, action: PayloadAction) => {
            console.log(state.currentUser)
            state.currentUser = undefined;
            console.log(state.currentUser)
        },
        editUser: (state: UserState, action: PayloadAction<User>) => {
            state.info = action.payload;
        }

    },
    extraReducers: (builder: any) => {
        builder
            .addCase(loadUser.pending, (state: UserState) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadUser.fulfilled, (state: UserState, action: PayloadAction<User>) => {
                state.info = action.payload;
                console.log(action.payload)
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadUser.rejected, (state: UserState, action: PayloadAction<AxiosError>) => {
                state.isLoading = false;
                state.hasError = true;
                state.errMessage = action.payload.message;
            })
    },
};

export const userSlice = createSlice(sliceOptions);


export const selectUserInfo = (state: RootState) => {
    return state.user.info
};

export const selectLoggedInUser = (state: RootState) => {
    return state.user.currentUser;
}

export const selectUserServices = (state: RootState) => {
    return state.user.info.services;
}

export const { logInUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;

