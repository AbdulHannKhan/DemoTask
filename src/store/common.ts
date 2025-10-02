import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const initialState = {
  isBuyer: false,
  active: 'incomplete',
  loading: false,
  error: '',
  successMsg: '',
  authType: true,
  incomplete: {},
  appContent: {
    faqs: [],
    about_content: {},
    terms_content: {},
    privacy_content: {},
  },
  // const [active, setActive] = useState(isBuyer ? 'accepted' : 'incomplete');
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    saveUserType: (state, action) => {
      state.isBuyer = action.payload;
    },
    setActive: (state, {payload}) => {
      state.active = payload;
    },
    changeAuthType: (state, {payload}) => {
      state.authType = payload;
    },
    setLoading: (state, {payload}) => {
      state.loading = payload;
    },
    setError: (state, {payload}) => {
      state.error = payload;
    },
    setSuccessMsg: (state, {payload}) => {
      state.successMsg = payload;
    },
    showMessage: (_, {payload}) => {
      Alert.alert('', payload);
    },
    setIncomplete: (state, {payload}) => {
      state.incomplete = payload;
    },
    saveContent: (state, {payload}) => {
      state.appContent = payload;
    },
  },
});

export const {
  saveUserType,
  setActive,
  setLoading,
  setError,
  setSuccessMsg,
  changeAuthType,
  showMessage,
  setIncomplete,
  saveContent,
} = commonSlice.actions;

export default commonSlice.reducer;
