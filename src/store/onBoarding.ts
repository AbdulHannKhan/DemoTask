import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiCall from '../api/apiCall';
import API from '../api/apiList';
import {createAsyncCases} from '../api/builderCase';
import {getToken, getToken1} from './getToken';
import crashlytics from '@react-native-firebase/crashlytics';
import {setUser} from "@sentry/react-native";

export const login = createAsyncThunk(
  'auth/login',
  async (data: object, {rejectWithValue}: any) => {
    return await apiCall({
      path: API.LOGIN,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

interface AuthState {
  accessToken: string;
  userCredentials: object;
  userData: object;
  postOnboard: boolean;
  fcmToken: string;
  initialCountry: string;
  initialCountryCode: string;
  startedAlready: any;
  logout?: any;
  accessToken1: string;
  otp: string;
  status: string;
  success: string;
  loading: boolean;
  error: string;
  profileSettings: object;
}

const initialState: AuthState = {
  accessToken: '',
  accessToken1: '',
  userData: {},
  fcmToken: '',
  initialCountry: 'pk',
  initialCountryCode: '+92',
  startedAlready: null,
  userCredentials: {},
  logout: false,
  postOnboard: false,
  status: 'idle',
  otp: '',
  loading: false,
  error: '',
  success: '',
  profileSettings: {},
};

export const authSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setClearData: (state, action) => {
      state.error = '';
      state.success = '';
      state.status = 'idle';
      state.loading = false;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLogout: (state, action) => {
      state.logout = action.payload;
    },
    setAccessToken1: (state, action) => {
      state.accessToken1 = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setPostOnboard: (state, action) => {
      state.postOnboard = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserCredentials: (state, action) => {
      state.userCredentials = action.payload;
    },
    setStartedAlready: (state, action) => {
      state.startedAlready = action.payload;
    },
    setInitialCountryCode: (state, action) => {
      state.initialCountryCode = action.payload;
    },
    setInitialCountry: (state, action) => {
      state.initialCountry = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    logoutUser: (state) => {
      state.userData = {};    
     
    },

  },
  extraReducers: builder => {
    createAsyncCases(builder, login, {
      fulfilled: (state, action) => {
        state.accessToken = action.payload.body.accessToken;
        state.userData = action.payload.body;
        crashlytics().setUserId(action.payload.body?.userDetailId?.toString());
        setUser({ id: action.payload.body?.userDetailId?.toString() });
      },
    });
  
  },
});

export const {
  setAccessToken,
  setAccessToken1,
  setClearData,
  setError,
  setSuccess,
  setStartedAlready,
  setUserData,
  setUserCredentials,
  setLogout,
  setPostOnboard,
  setInitialCountryCode,
  setInitialCountry,
  setFcmToken,
  logoutUser
} = authSlice.actions;

export default authSlice.reducer;
