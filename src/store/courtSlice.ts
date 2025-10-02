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

export const getHomeData = createAsyncThunk(
  'auth/get-home-data',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();

    return await apiCall({
      path: API.GET_HOME_DATA,
      method: 'post',
      token: token,
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

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





export const getBlockedTimes = createAsyncThunk(
  'booking/get-blocked-times',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.GET_BLOCKED_TIMES,
      method: 'post',
      token: token,
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const getLocationsData = createAsyncThunk(
  'booking/getLocationsData',
  async (data: object, {rejectWithValue}: any) => {
    try {
      const token = getToken();
      const response = await apiCall({
        path: API.GET_LOCATIONS,
        method: 'post',
        token: token,
        body: data,
      });

      // Process locations *before* returning data
      const processedLocationss = await processLocations(response?.body?.items);

      return {
        ...response,
        body: {...response.body, items: processedLocationss},
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getLocationsDataNew = createAsyncThunk(
  'booking/getLocationsDataNew',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.GET_LOCATIONS_NEW,
      method: 'post',
      token: token,
      body: data,
    });
  },
);

export const getImage = createAsyncThunk(
  'booking/getImage',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.GET_IMAGE,
      method: 'post',
      token: token,
      body: data,
    });
  },
);

export const addBooking = createAsyncThunk(
  'booking/add-booking',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.ADD_BOOKING,
      method: 'post',
      token: token,
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const validateCoupon = createAsyncThunk(
  'booking/validateCoupon',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.VALIDATE_COUPON,
      method: 'post',
      token: token,
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const getBookings = createAsyncThunk(
  'booking/getBookings',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.GET_BOOKING,
      method: 'post',
      token: token,
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
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.UPDATE_PROFILE,
      method: 'post',
      token: token,
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);
// Thunk to handle image compression outside the reducer
// export const compressCourtImages = createAsyncThunk(
//   'courts/compressCourtImages',
//   async locations => {
//     return await Promise.all(
//       locations.map(async location => ({
//         ...location,
//         courts: await Promise.all(
//           location.courts.map(async court => {
//             let courtImages = court.courtImages.map((img) => {
//               let newImage = await compressImages
//             });

//             await compressImages(
//               court.courtImages.map(img => img.companyImage),
//               0.5,
//             );

//             courtImages = court.courtImages.map((data, index) => ({
//               ...data,
//               companyImage: courtImages[index], // Ensure correct mapping
//             }));

//             return {
//               ...court,
//               courtImages: courtImages,
//             };
//           }),
//         ),
//       })),
//     );
//   },
// );
interface courtState {
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

const initialState: courtState = {
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

export const courtSlice = createSlice({
  name: 'court',
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


   
   
   
    createAsyncCases(builder, getBookings, {
      pending: (state, action) => {
        state.listLoader = true;
        state.loading = false;
      },

      fulfilled: (state, action) => {
        state.listLoader = false;
        state.bookings = action.payload.body?.items;
      },
      rejected: (state, action) => {
        state.listLoader = false;
      },
    });

    createAsyncCases(builder, getNotifications, {
      pending: (state, action) => {
        state.listLoader = true;
        state.loading = false;
      },

      fulfilled: (state, action) => {
        state.listLoader = false;
        state.notifications = action.payload.body?.items;
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
} = courtSlice.actions;

export default courtSlice.reducer;
