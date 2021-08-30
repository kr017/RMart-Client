import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const addUserAddress = createAsyncThunk(
    'address/addUserAddress', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/api/add_address', value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserAddressList = createAsyncThunk(
    'address/getUserAddressList', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:5000/v1/api/get_user_addresses')
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateUserAddress = createAsyncThunk(
    'address/updateUserAddress', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.put('http://localhost:5000/v1/api/update_user_address',value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        error: null,
        loading: false
    },
    reducers: {

    },
    extraReducers: {
        [addUserAddress.pending]: (state, action) => {
            state.error = null
        },
        [addUserAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.addresses = [...state.addresses, action.payload.data];
        },
        [addUserAddress.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [getUserAddressList.pending]: (state, action) => {
            state.error = null
        },
        [getUserAddressList.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.addresses = action.payload.data;
        },
        [getUserAddressList.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [updateUserAddress.pending]: (state, action) => {
            state.error = null
        },
        [updateUserAddress.fulfilled]: (state, action) => {
            let data = action.payload.data;
            state.loading = false;
            state.error = null;
            state.addresses = state.addresses.map(adr => {
                if (adr._id === data._id) {
                    adr.line1 = data.street1;
                    adr.ine2 = data.street2;
                    adr.postal_code = data.pincode;
                    adr.city = data.city;
                    adr.state = data.state;
                    adr.country = data.country;
                }
                return adr
            })
        },
        [updateUserAddress.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        }

    }
})



export default addressSlice.reducer