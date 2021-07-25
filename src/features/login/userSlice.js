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

const userSlice = new createSlice({
    name: 'user',
    initialState: { name: '', email: '', accessToken: '', loading: false },
    reducers: {
        getUser : (state,action)=>{
            let userInfo = JSON.parse(localStorage.getItem('userInfo')) || '';
            state.name = userInfo ? userInfo.name : userInfo
            state.email = userInfo ? userInfo.email : userInfo
            state.accessToken = userInfo ? userInfo.accessToken : userInfo
        },
        logout :(state,action)=>{
            localStorage.removeItem('userInfo')
            state.name = '';
            state.email = '';
            state.accessToken = '';
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
            localStorage.setItem('userInfo',JSON.stringify({
                name:action.payload.data.name,
                email: action.payload.data.email,
                accessToken : action.payload.data.accessToken
            }))
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.name = '';
            state.email= '';
            state.accessToken='';
        }
    }
})


export const { getUser,logout } = userSlice.actions;
export const loadingStatus = (state) => state.user.loading
export const userInfo = (state)=> state.user 

export default userSlice.reducer