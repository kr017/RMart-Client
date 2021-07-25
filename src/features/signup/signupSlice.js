import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

 export const signupUser = createAsyncThunk(
    'user/signup', async (value, { rejectWithValue }) => {
        try {
           const res = await axios.post('http://localhost:5000/v1/auth/signup',value)
           return res.data
        } catch (error) {
           return rejectWithValue(error.response.data)
        }
    }
)

const signupSlice = createSlice({
    name : 'signup',
    initialState : {loading: false, error: null},
    reducers : {

    },
    extraReducers : {
        [signupUser.pending] : (state,action)=>{
           state.loading = true;
        },
        [signupUser.fulfilled] : (state,action)=>{
            state.loading = false;
            state.error = null;
        },
        [signupUser.rejected] : (state,action)=>{
            state.loading = false;
            state.error = action.payload.message
        }
    }
})

export const loadingStatus = (state) => state.signup.loading

export default signupSlice.reducer