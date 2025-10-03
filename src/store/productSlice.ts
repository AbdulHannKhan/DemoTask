import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiCall from '../api/apiCall';
import API from '../api/apiList';
import {createAsyncCases, createAsyncCases1} from '../api/builderCase';


export const getAllProducts = createAsyncThunk(
  'products',
  async (data: object, {rejectWithValue}: any) => {

    return await apiCall({
      path: API.GET_PRODUCTS,
      method: 'get',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);



interface productState {
  listLoader: boolean;
  status: string;
  success: string;
  loading: boolean;
  error: string;
  apiCall: boolean;
  allProducts:Array<object>;
}

const initialState: productState = {
  listLoader: false,
  status: 'idle',
  loading: false,
  error: '',
  success: '',
  apiCall: false,
  allProducts:[]
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setClearData1: (state, action) => {
      state.error = '';
      state.success = '';
      state.status = 'idle';
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    
  },
  extraReducers: builder => {
   
   

    createAsyncCases1(builder, getAllProducts, {
      pending: (state, action) => {
        state.listLoader = true;
        state.loading = false;
      },


      fulfilled: (state, action) => {
        console.log("Success",action);
        state.allProducts=action.payload
        state.listLoader = false;

      },
      rejected: (state, action) => {
        state.listLoader = false;
        console.log("Error",action);
        
      },
    });


  },
});

export const {
  setLoading,
  setClearData1,
  setError,
  setSuccess,
} = productSlice.actions;

export default productSlice.reducer;
