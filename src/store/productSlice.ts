import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiCall from '../api/apiCall';
import API from '../api/apiList';
import {createAsyncCases, createAsyncCases1} from '../api/builderCase';
import {getToken} from './getToken';
import {
  compareData,
  compressImages,
  processLocations,
} from '../helper/functions';



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


export const getNotifications = createAsyncThunk(
  'notification/get-notifications',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.GET_NOTIFICATIONS,
      method: 'post',
      token: token,
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);


interface productState {
  bookings: Array<object>;
  selectedDate: any;
  notifications: Array<object>;
  listLoader: boolean;
  notificationDot: boolean;
  bookingData: any;
  homeData: any;
  camPermission: any;
  locationData: any;
  blockedSlots: any;
  status: string;
  success: string;
  loading: boolean;
  error: string;
  apiCall: boolean;
  allImages: Array<object>;
  allHomeImages: Array<object>;
  selectedLocData: any;
  allProducts:Array<object>;
}

const initialState: productState = {
  selectedDate: null,
  selectedLocData: null,
  homeData: null,
  bookings: [],
  listLoader: false,
  locationData: null,
  blockedSlots: null,
  bookingData: null,
  camPermission: 'denied',
  notifications: [],
  notificationDot: false,
  status: 'idle',
  loading: false,
  error: '',
  success: '',
  apiCall: false,
  allImages: [],
  allHomeImages: [],
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
    setLocationsData: (state, action) => {
      state.locationData = action.payload;
    },
    setCamPermission: (state, action) => {
      state.camPermission = action.payload;
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setAllImages: (state, action) => {
      state.allImages = action.payload;
    },
    setSelectedLocData: (state, action) => {
      state.selectedLocData = action.payload;
    },
    setAllHomeImages: (state, action) => {
      state.allHomeImages = action.payload;
    },
    setAllDataClear: (state, action) => {
      state.homeData = null;
      state.bookings = [];
      state.locationData = null;
      state.blockedSlots = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setNotificationDot: (state, action) => {
      state.notificationDot = action.payload;
    },
  },
  extraReducers: builder => {
   
   

    createAsyncCases1(builder, getAllProducts, {
      pending: (state, action) => {
        state.listLoader = true;
        state.loading = false;
      },


      fulfilled: (state, action) => {
        console.log("Actionnnnnnn",action);
        state.allProducts=action.payload
        state.listLoader = false;

      },
      rejected: (state, action) => {
        state.listLoader = false;
      },
    });


  },
});

export const {
  setSelectedDate,
  setLoading,
  setClearData1,
  setError,
  setSuccess,
  setCamPermission,
  setNotificationDot,
  setAllDataClear,
  setBookingData,
  setLocationsData,
  setHomeData,
  setAllImages,
  setAllHomeImages,
  setSelectedLocData,
} = productSlice.actions;

export default productSlice.reducer;
