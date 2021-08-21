import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const getProducts = createAsyncThunk(
    'product/getProducts', async (value, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/v1/auth/get_all_products',value)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const productSlice = createSlice({
    name: 'product',
    initialState: { products: [], loading: false, error: null },
    reducers: {

    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload.data.products
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        }
    }
})

export const products = (state) => state.product.products
export const loadingStatus = (state) => state.product.loading

export default productSlice.reducer