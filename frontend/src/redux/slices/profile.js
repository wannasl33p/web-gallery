import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../redux/axios";

export const fetchProfileInfo = createAsyncThunk('/profile/fetchProfileInfo', async () => {
    const { data } = await axios.get('/profile');
    return data
});

const initialState = {
    profile: {
        items: [],
        status: 'loading',
    }
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfileInfo.pending, (state) => {
            state.profile.items = [];
            state.profile.status = 'loading';
        })
            .addCase(fetchProfileInfo.fulfilled, (state, action) => {
                state.profile.items = action.payload;
                state.profile.status = 'loaded';
            })
            .addCase(fetchProfileInfo.rejected, (state) => {
                state.profile.items = [];
                state.profile.status = 'error';
            })
    }
});


export const profileReducer = profileSlice.reducer;