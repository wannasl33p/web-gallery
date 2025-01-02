import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../redux/axios";

export const fetchModerationInfo = createAsyncThunk('/moderation/fetchModerationInfo', async () => {
    const { data } = await axios.get('/moderation');
    return data
});

const initialState = {
    moderation: {
        items: [],
        status: 'loading',
    }
};

const moderationSlice = createSlice({
    name: 'moderation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchModerationInfo.pending, (state) => {
            state.moderation.items = [];
            state.moderation.status = 'loading';
        })
            .addCase(fetchModerationInfo.fulfilled, (state, action) => {
                state.moderation.items = action.payload;
                state.moderation.status = 'loaded';
            })
            .addCase(fetchModerationInfo.rejected, (state) => {
                state.moderation.items = [];
                state.moderation.status = 'error';
            })
    }
});


export const moderationReducer = moderationSlice.reducer;