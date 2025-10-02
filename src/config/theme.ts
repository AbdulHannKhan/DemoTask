import i18next from 'i18next';
import {Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const colors = {
  primary: '#3A86DD',
  primaryBg: 'rgba(58, 134, 221, 0.1)',
  bg: '#F9F9F9',
  secondary: '#F8F5FF',
  secondary2: '#E1D6F9',
  accent: '#03dac4',
  border: '#DCDEE6',
  background: '#f6f6f6',
  surface: '#ffffff',
  error: '#b00020',
  text: '#5E6066',
  greyText: '#545766',
  darkText: '#292B33',
  onSurface: '#000000',
  success: '#008042',
  successBack: '#E6FFF3',
  green: '#18B368',
  placeholder: '#a1a1a1',
  inputBack: '#F6F7F9',
  backdrop: '#3E414C',
  red: '#E62E2E',
  danger: '#CC0000',
  lightBlue: '#E8EEFF',
  warning: '#EF6C00',
  darkGrey: '#6B6F80',
  greylight: '#9EA2B3',
  inputText: '#838799',
  disable: '#EDEEF2',
  btnBack: '#ECE5FC',
  grey2: '#425466',
  inputBgDanger: '#FFE6E6',
  lightGreen: '#3DCC87',
  lightTextClr: '#BBBFCC',
};

const fonts = {
  regular: 'NotoSans-Regular',
  medium: 'NotoSans-Medium',
  light: 'NotoSans-Light',
  thin: 'NotoSans-Thin',
  bold: 'NotoSans-Bold',
  extraBold: 'NotoSans-ExtraBold',
  semiBold: 'NotoSans-SemiBold',
};
const langDir = i18next.dir();

const fontSizes = {
  xlarge: moderateScale(24),
  large: moderateScale(20),
  big: moderateScale(18),
  medium: moderateScale(16),
  regular: moderateScale(14),
  small: moderateScale(12),
  xsmall: moderateScale(10),
  xxsmall: moderateScale(8),
};

const fontSizes2 = {
  xlarge: moderateScale(18),
  large: moderateScale(16),
  big: moderateScale(14),
  medium: moderateScale(12),
  regular: moderateScale(10),
  small: moderateScale(10),
  xsmall: moderateScale(10),
  xxsmall: moderateScale(10),
};
const theme = {
  colors,
  fonts,
  fontSizes: fontSizes,
  // Platform.OS === 'ios' && langDir === 'rtl' ? fontSizes2 : fontSizes,
};

export default theme;
