import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../redux/axios";

export const fetchCatalog = createAsyncThunk('/catalog/fetchCatalog', async () => {
    const { data } = await axios.get('/catalog');
    return data
});

const initialState = {
    arts: {
        items: [],
        status: 'loading',
    }
};

const artsSlice = createSlice({
    name: 'arts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCatalog.pending, (state) => {
            state.arts.items = [];
            state.arts.status = 'loading';
        })
            .addCase(fetchCatalog.fulfilled, (state, action) => {
                state.arts.items = action.payload;
                state.arts.status = 'loaded';
            })
            .addCase(fetchCatalog.rejected, (state) => {
                state.arts.items = [];
                state.arts.status = 'error';
            })
    }
});


export const artsReducer = artsSlice.reducer;