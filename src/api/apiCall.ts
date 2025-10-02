import axios from 'axios';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {BASE_URL} from './apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useAppSelector} from '../store/hooks';

interface props {
  path?: string;
  isForm?: boolean;
  method?: string;
  url?: string;
  body?: object;
  token?: string;
  rejectWithValue?: any;
  dispatch?: any;
}

const apiCall = async ({
  path,
  method,
  isForm,
  url = '',
  body = {},
  token = '',
  rejectWithValue,
}: props) => {
  let lang = await AsyncStorage.getItem('language');
  let urlString = BASE_URL + path;
  let headers: any = {
    ...(isForm
      ? {'Content-Type': 'multipart/form-data'}
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
  };
  let options: any = {
    method,
  };

  if (token) headers['authorization'] = `Bearer ${token}`;
  options.headers = headers;
  if (body) options.data = body;
  if (url) urlString = url;
  options.url = urlString;

  return axios(options)
    .then(res => {
      const message = res?.data?.headers?.message;
      if (res?.data?.headers?.error === 200) {
        return res?.data;
      } else if (res?.data?.headers?.error === 401) {
        console.log(res?.data, options, url, urlString, body, 'error401');
        return rejectWithValue(message);
      } else {
        console.log(res?.data, options, url, urlString, body, 'error4x');
        if (message) {
          return rejectWithValue(message);
        } else if (res?.data) {
          return res?.data;
        }
      }
    })
    .catch(e => {
      NetInfo.fetch().then(state => {
        state.isConnected === false && Alert.alert('No Internet Connection.');
      });
      if (e?.response?.status === 401) {
        Alert.alert('User is not authenticated.');
      }
      return rejectWithValue(e?.message);
    });
};

export default apiCall;
