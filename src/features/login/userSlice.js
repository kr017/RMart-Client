import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const loginUser = createAsyncThunk(
    'user/login', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/auth/login', value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'user/updateProfile', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.put('http://localhost:5000/v1/api/update_profile', value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const userSlice = new createSlice({
    name: 'user',
    initialState: { name: '', email: '', accessToken: '',mobile:'', loading: false },
    reducers: {
        getUser : (state,action)=>{
            let userInfo = JSON.parse(localStorage.getItem('userInfo')) || '';
            state.name = userInfo ? userInfo.name : userInfo
            state.email = userInfo ? userInfo.email : userInfo
            state.accessToken = userInfo ? userInfo.accessToken : userInfo
            state.mobile = userInfo ? userInfo.mobile : userInfo
        },
        logout :(state,action)=>{
            localStorage.removeItem('userInfo')
            state.name = '';
            state.email = '';
            state.accessToken = '';
            state.mobile='';
        }
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.name = action.payload.data.name;
            state.email= action.payload.data.email;
            state.accessToken= action.payload.data.accessToken;
            state.mobile= action.payload.data.mobile
            localStorage.setItem('userInfo',JSON.stringify({
                name:action.payload.data.name,
                email: action.payload.data.email,
                accessToken : action.payload.data.accessToken,
                mobile: action.payload.data.mobile
            }))
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.name = '';
            state.email= '';
            state.accessToken='';
            state.mobile='';
        },
        [updateProfile.pending]: (state, action) => {
            state.loading = true
        },
        [updateProfile.fulfilled]: (state, action) => {
            let userData = JSON.parse(localStorage.getItem('userInfo')) || '';
            state.loading = false;
            state.name = action.payload.data.name;
            state.email= action.payload.data.email;
            state.accessToken= userData.accessToken;
            state.mobile= action.payload.data.mobile
            localStorage.setItem('userInfo',JSON.stringify({
                name:action.payload.data.name,
                email: action.payload.data.email,
                accessToken : userData.accessToken,
                mobile: action.payload.data.mobile
            }))
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})


export const { getUser,logout } = userSlice.actions;
export const loadingStatus = (state) => state.user.loading
export const userInfo = (state)=> state.user 

export default userSlice.reducer