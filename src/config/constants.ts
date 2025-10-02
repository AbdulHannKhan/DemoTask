import Clipboard from '@react-native-community/clipboard';
import RNFS from 'react-native-fs';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {EnvironmentEnum} from '../helper/enums';
import {Dimensions, Platform, ToastAndroid} from 'react-native';

import Toast from 'react-native-toast-message';
import {setCamPermission} from '../store/productSlice';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;

export const versionCode = 'v1.0.0';
export const environment = EnvironmentEnum.Production;
export const companyDetailID = 1;

export const navigate = ({navigation, back, to, data}: any) => {
  if (back) {
    navigation.goBack();
  } else if (data) {
    navigation.navigate(to, data);
  } else {
    navigation.navigate(to);
  }
};

export const maxDecInputVal = 922337203685477.5807;
export const nonNegDecValRegex = /^\d+(\.\d{0,2})?$/;

export const formatWithCommas = (num: string) => {
  // Remove any existing commas and format the number with commas
  const parts = num?.split('.');
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts?.join('.')?.toString();
};

export const onChangeNumber = (
  value: string,
  setValue: (arg: string) => void,
  setError: (arg: string) => void,
  type: string,
  t: (arg: string) => string,
) => {
  const sanitizedInput = value?.replace(/[^0-9.]/g, '');

  if (nonNegDecValRegex.test(sanitizedInput) || sanitizedInput === '') {
    if (Number(sanitizedInput) > maxDecInputVal) {
      setError(t('DECIMAL_LIMIT_EXCEED'));
    } else {
      let formattedValue = sanitizedInput;
      if (type == 'price') {
        formattedValue = formatWithCommas(sanitizedInput);
      }
      setValue(formattedValue);
      setError('');
    }
  }
};

export const commaSeparateRegex = (text: any) => {
  if (!text) {
    return;
  }

  // Allow digits and a single dot (for decimal values)
  let val = text.replace(/[^0-9.]/g, '');

  // Split the integer and decimal parts
  let [integerPart, decimalPart] = val?.split('.');

  // Add commas to the integer part
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  ``;

  // Return the formatted number with the decimal part (if present)
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};

export const convertToNumberForm = (text: any) => {
  if (!text) {
    return text;
  }
  let value = text?.replace(/[^0-9.]/g, '');
  return Number(value);
};

export const checkCameraPermission = async (dispatch: any) => {
  try {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );

    const res = await handlePermissionResult(result, dispatch);

    // Ensure permission result is fully resolved
    console.log(res, 'result', result);
    return res; // Explicitly return a promise
  } catch (error) {
    console.error('Permission error:', error);
    return false; // Handle the error case appropriately
  }
};

const handlePermissionResult = async (result: any, dispatch: any) => {
  // const {t} = useTranslation();
  let check;
  switch (result) {
    case RESULTS.UNAVAILABLE:
      Toast.show({
        type: 'error',
        text1: 'Camera not available.',
      });
      check = false;
      break;
    case RESULTS.DENIED:
      dispatch(setCamPermission(result));

      const requestP = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );

      check = await handlePermissionResult(requestP, dispatch);
      break;
    case RESULTS.GRANTED:
      dispatch(setCamPermission(result));
      check = true;

      break;
    case RESULTS.BLOCKED:
      Toast.show({
        type: 'error',
        text1: 'Camera permission blocked.',
        text2: 'Enable Camera for settings.',
      });
      check = false;
      break;
    default:
      Toast.show({
        type: 'error',
        text1: 'Camera not available.',
        text2: 'Enable Camera for settings.',
      });
      check = false;
      break;
  }
  return check;
};

export const generateEAN13Barcode = (length = 12, setFieldValue) => {
  // Generate a 12-digit random number
  let barcodeValue = Math.floor(
    100000000000 + Math.random() * 900000000000,
  ).toString();

  // Calculate the checksum using the EAN-13 algorithm
  let sum = 0;

  for (let i = 0; i < barcodeValue.length; i++) {
    let digit = parseInt(barcodeValue[i], 10);

    // Odd-positioned digits are multiplied by 1, even-positioned by 3
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  let remainder = sum % 10;
  let checkDigit = remainder === 0 ? 0 : 10 - remainder;

  // Append the check digit to the barcode value
  let fullBarcodeValue = barcodeValue + checkDigit.toString();

  setFieldValue('productBarcode', fullBarcodeValue.toString());
};

export const convertToBase64 = async (image: string) => {
  let base64;
  if (image?.startsWith('http')) {
  } else {
    await RNFS.readFile(image, 'base64')
      .then(res => {
        const extension = image?.split('.').pop().toLowerCase();

        const mimeType = extension == 'png' ? 'image/png' : 'image/jpeg';

        base64 = `data:${mimeType};base64,${res}`;
        return base64;
      })
      .catch(err => {});
  }
  return base64;
};

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  ToastAndroid.show('Copied', ToastAndroid.SHORT);
};
