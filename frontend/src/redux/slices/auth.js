import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../redux/axios";


export const fetchUserData = createAsyncThunk('/login/fetchUserData', async (params) => {
    const { data } = await axios.post('/login', params);
    return data
})
export const fetchUserLogin = createAsyncThunk('/login/fetchUserLogin', async () => {
    const { data } = await axios.get('/login/try');
    return data
})
export const fetchUserRegister = createAsyncThunk('/login/fetchUserRegister', async (params) => {
    const { data } = await axios.post('/register', params);
    return data
})

const initialState = {
    data: null,
    status: 'loading',

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            });
        builder.addCase(fetchUserLogin.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchUserLogin.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            })
        builder.addCase(fetchUserRegister.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        })
            .addCase(fetchUserRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchUserRegister.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            })
    }

})

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;


export const { logout } = authSlice.actions;