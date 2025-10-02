import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiCall from '../api/apiCall';
import API from '../api/apiList';
import {createAsyncCases} from '../api/builderCase';
import {getToken, getToken1} from './getToken';
import crashlytics from '@react-native-firebase/crashlytics';
import {setUser} from "@sentry/react-native";

export const generateOtp = createAsyncThunk(
  'auth/generateOtp',
  async (data: object, {rejectWithValue}: any) => {
    return await apiCall({
      path: API.GENERATE_OTP_SIGNUP,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

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

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data: object, {rejectWithValue, getState}: any) => {
    const token = getToken1();
    return await apiCall({
      path: API.OTP_VERIFY,
      token: token,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const getProfile = createAsyncThunk(
  'profile/get-profile',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.GET_PROFILE,
      token: token,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken1();
    return await apiCall({
      path: API.SIGNUP,
      token: token,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const generateOtpForget = createAsyncThunk(
  'auth/generateOtpForget',
  async (data: object, {rejectWithValue}: any) => {
    return await apiCall({
      path: API.GENERATE_OTP_FORGET,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const resetPass = createAsyncThunk(
  'auth/resetPass',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken1();
    return await apiCall({
      path: API.FORGOT_PASSWORD,
      token: token,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();
    return await apiCall({
      path: API.LOGOUT,
      token: token,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const deleteUserAccount = createAsyncThunk(
  'profile/deleteUserAccount',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();

    return await apiCall({
      path: API.DELETE_ACCOUNT,
      token: token,
      method: 'post',
      body: data,
      rejectWithValue: rejectWithValue,
    });
  },
);

export const submitSurvey = createAsyncThunk(
  'auth/submitSurvey',
  async (data: object, {rejectWithValue}: any) => {
    const token = getToken();

    return await apiCall({
      path: API.SUBMIT_SURVEY,
      token: token,
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

    createAsyncCases(builder, register, {
      fulfilled: async (state, action) => {
        state.status = true;
        state.loading = true;
        state.success = 'Account Registered Successfully';
      },
    });
    createAsyncCases(builder, generateOtp, {
      fulfilled: (state, action) => {
        state.accessToken1 = action.payload.body.accessToken;
      },
    });
    createAsyncCases(builder, verifyOTP, {
      fulfilled: (state, action) => {
        state.accessToken1 = action.payload.body.accessToken;
        state.loading = true;
      },
    });

    createAsyncCases(builder, generateOtpForget, {
      fulfilled: (state, action) => {
        state.accessToken1 = action.payload.body.accessToken;
      },
    });
    createAsyncCases(builder, logOut, {
      fulfilled: (state, action) => {
        state.accessToken = '';
        state.userCredentials = {};
        state.userData = {};
      },
    });
    createAsyncCases(builder, resetPass, {});

    createAsyncCases(builder, submitSurvey, {
      pending: (state, action) => {
        state.loading = false;
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
} = authSlice.actions;

export default authSlice.reducer;
