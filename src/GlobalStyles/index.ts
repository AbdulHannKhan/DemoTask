import {Platform, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import theme from '../config/theme';
import {height, width} from '../config/constants';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: moderateScale(20),
  },

  courtSelect: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
    width: 'auto',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  courtFont: {
    fontFamily: theme.fonts.regular,
    textAlign: 'center',
    fontSize: theme.fontSizes.regular,
    lineHeight: moderateScale(16),
  },
  inputBorder: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    borderColor: theme.colors.primary,
  },
  notiText: {
    fontSize: theme.fontSizes.regular,
    marginRight: moderateScale(25),
    marginVertical: moderateScale(5),
    lineHeight: moderateScale(26),
  },
  notifyDot: {
    backgroundColor: theme.colors.red,
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(6 / 2),

    position: 'absolute',
    top: moderateScale(7),
    right: moderateScale(10),
  },
  previewImg: {
    borderRadius: moderateScale(8),
    width: moderateScale(136),
    height: moderateScale(124),
  },
  termsView: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: moderateScale(20),
  },
  profileImg: {
    borderRadius: moderateScale(55 / 2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: moderateScale(55),
    height: moderateScale(55),
    overflow: 'hidden',
  },
  headerBorder2: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: moderateScale(15),
  },
  flatlist: {
    paddingHorizontal: moderateScale(3),
    paddingBottom: moderateScale(30),
  },
  imgPreview: {
    width: '100%',
    height: moderateScale(226),
    borderRadius: 0,
    // marginLeft: -1,
  },
  buttonOver: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    bottom: 0,
  },
  slotContainer: {
    width: '48%',
    height: moderateScale(38),
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  slotContainer2: {
    width: '21%',
    height: moderateScale(38),
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  date: {
    borderRadius: moderateScale(8),

    width: moderateScale(65),
    height: moderateScale(81),
  },

  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    backgroundColor: theme.colors.surface,
  },
  courtStyle: {
    flex: 1,
    marginTop: -moderateScale(25),
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
  },
  tabBack: {
    borderRadius: moderateScale(100),
    padding: moderateScale(10),
    backgroundColor: theme.colors.primaryBg,
  },
  emptyView: {
    height: '30%',
    width: '100%',
  },
  headerBorder: {
    backgroundColor: theme.colors.surface,
    marginVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerText: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.surface,
    position: 'absolute',
    width: moderateScale(140),
    right: moderateScale(30),
    alignSelf: 'flex-end',
  },
  wrapper: {
    paddingHorizontal: 0,
    marginVertical: 0,
    backgroundColor: theme.colors.bg,
  },
  borderBottomText: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingBottom: moderateScale(10),
    marginBottom: moderateScale(5),
    width: '50%',
  },
  option: {
    width: '90%',
    borderRadius: moderateScale(8),
  },
  optionText: {
    color: theme.colors.darkGrey,
    height: moderateScale(70),
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: moderateScale(4),
    backgroundColor: theme.colors.border,
  },
  dropdownList: {
    borderWidth: 1,
    paddingHorizontal: moderateScale(20),
    borderColor: theme.colors.border,
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  calendarBtn2: {
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: '#5422C6',
    width: '45%',
    alignItems: 'center',
  },
  imgLogo: {
    width: moderateScale(110),
    height: moderateScale(110),
    borderRadius: moderateScale(10),
    marginRight: scale(20),
    resizeMode: 'contain',
  },
  calendarView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendar: {
    borderColor: theme.colors.primary,
    padding: moderateScale(10),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    backgroundColor: theme.colors.surface,
    marginHorizontal: moderateScale(10),
  },
  calendarBtn: {
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    alignItems: 'center',
    backgroundColor: 'white',
    width: '45%',
    borderWidth: 1,
    borderColor: '#DCDEE6',
  },
  homwidget: {
    width: '48%',
    minHeight: moderateScale(70),
  },
  desktopImg: {
    marginLeft: moderateScale(5),
    marginRight: moderateScale(10),
    resizeMode: 'contain',
    height: moderateScale(60),
    width: moderateScale(60),
  },
  activeHeading: {
    color: theme.colors.darkText,
  },
  row: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  justifyStart: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    flex: 1,
    marginTop: moderateScale(height * 0.23),
  },
  header: {
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.inputBack,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flag: {
    height: moderateScale(25),
    width: moderateScale(36),
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  selfAlign: {
    alignSelf: 'center',
  },
  line: {
    width: moderateScale(width * 0.35),
    borderColor: theme.colors.placeholder,
    borderTopWidth: 1,
  },
  horizontalLine: {
    borderWidth: 0.9,
    borderColor: theme.colors.border,
    marginVertical: moderateScale(10),
  },
  fullWidth: {
    width: '100%',
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    borderRadius: moderateScale(8),
  },
  borderContainer2: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.secondary2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: moderateScale(74),
    height: moderateScale(29),
    borderRadius: moderateScale(30),
    marginRight: moderateScale(5),
  },
  unfocusedBill: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  borderContainer3: {
    borderWidth: 1,
    borderColor: theme.colors.secondary2,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(20),
    flexDirection: 'column',
    borderRadius: moderateScale(8),
  },
  borderContainer4: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    width: '32%',
    height: moderateScale(64),
    flexDirection: 'column',
    borderRadius: moderateScale(8),
  },
  cardImg: {
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  cardStyle: {
    // height: moderateScale(193),
    width: '48%',
    marginVertical: moderateScale(10),
    backgroundColor: theme.colors.surface,
    borderRadius: moderateScale(8),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },

  imgBorder: {
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.inputBack,
  },
  notfoundComp: {
    width: '100%',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: theme.colors.danger,
    backgroundColor: theme.colors.inputBgDanger,
  },
  successCircle: {
    borderWidth: 2,
    backgroundColor: theme.colors.successBack,
    borderColor: theme.colors.success,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    alignSelf: 'center',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  greyBorder: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'column',
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(8),
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  dropdown: {
    width: '30%',
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(30),
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  roundBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    padding: moderateScale(5),
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(36 / 2),
  },
  roundBtn2: {
    width: moderateScale(30),
    height: moderateScale(30),
    padding: moderateScale(5),
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(30 / 2),
  },
  roundBtn3: {
    borderRadius: moderateScale(50 / 2),
    backgroundColor: theme.colors.inputBack,
    width: moderateScale(50),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    backgroundColor: theme.colors.surface,
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
    borderRadius: moderateScale(30),
  },
  centerText: {
    width: '50%',
    justifyContent: 'flex-start',
  },
  smallBtn: {
    backgroundColor: theme.colors.btnBack,
    borderRadius: moderateScale(4),
    width: moderateScale(28),
    height: moderateScale(28),
  },
  smallBtn2: {
    width: moderateScale(38),
    height: moderateScale(38),
    backgroundColor: theme.colors.btnBack,
    borderRadius: moderateScale(4),
  },
  checkBox: {
    transform: [
      {
        scaleX: Platform.OS === 'ios' ? moderateScale(0.7) : moderateScale(1),
      },
      {
        scaleY: Platform.OS === 'ios' ? moderateScale(0.7) : moderateScale(1),
      },
    ],
    marginRight: moderateScale(5),
    marginTop: moderateScale(3),
  },

  bottomTabStyle: {
    height: moderateScale(76),
    width: '100%',
    alignItems: 'center',
  },

  //=============== SPACE STYLES ==============//
  paddingLS: {
    paddingLeft: moderateScale(10),
  },
  paddingRS: {
    paddingRight: moderateScale(10),
  },
  paddingLM: {
    paddingLeft: moderateScale(15),
  },

  paddingS: {
    padding: moderateScale(10),
  },
  paddingL: {
    padding: moderateScale(20),
  },
  paddingM: {
    padding: moderateScale(15),
  },
  paddingXS: {
    padding: moderateScale(5),
  },
  paddingHM: {
    paddingHorizontal: moderateScale(15),
  },
  paddingHL: {
    paddingHorizontal: moderateScale(20),
  },
  paddingHS: {
    paddingHorizontal: moderateScale(10),
  },
  paddingHXS: {
    paddingHorizontal: moderateScale(5),
  },
  paddingHXL: {
    paddingHorizontal: moderateScale(40),
  },

  paddingBL: {
    paddingBottom: moderateScale(20),
  },
  paddingTXS: {
    paddingTop: moderateScale(5),
  },

  paddingBXS: {
    paddingBottom: moderateScale(5),
  },
  paddingBS: {
    paddingBottom: moderateScale(10),
  },
  paddingBM: {
    paddingBottom: moderateScale(15),
  },
  paddingLL: {
    paddingLeft: moderateScale(20),
  },
  paddingVS: {
    paddingVertical: moderateScale(10),
  },
  paddingVXS: {
    paddingVertical: moderateScale(7),
  },
  paddingVM: {
    paddingVertical: moderateScale(15),
  },
  paddingVL: {
    paddingVertical: moderateScale(50),
  },
  marginBS: {
    marginBottom: moderateScale(10),
  },
  marginBXS: {
    marginBottom: moderateScale(5),
  },
  marginHS: {
    marginHorizontal: moderateScale(10),
  },
  marginHXS: {
    marginHorizontal: moderateScale(5),
  },
  marginHM: {
    marginHorizontal: moderateScale(15),
  },
  marginHL: {
    marginHorizontal: moderateScale(20),
  },
  marginRS: {
    marginRight: moderateScale(5),
  },

  marginRM: {
    marginRight: moderateScale(10),
  },
  marginRL: {
    marginRight: moderateScale(15),
  },
  marginVS: {
    marginVertical: verticalScale(10),
  },
  marginVM: {
    marginVertical: verticalScale(15),
  },
  marginVXS: {
    marginVertical: verticalScale(5),
  },
  marginVXL: {
    marginVertical: verticalScale(50),
  },
  marginVL: {
    marginVertical: verticalScale(30),
  },
  marginTXL: {
    marginTop: moderateScale(50),
  },
  marginLXS: {
    marginLeft: moderateScale(5),
  },
  marginBL: {
    marginBottom: moderateScale(30),
  },
  marginLL: {
    marginLeft: moderateScale(20),
  },
  marginLM: {
    marginLeft: moderateScale(15),
  },
  marginLS: {
    marginLeft: moderateScale(10),
  },
  marginBM: {
    marginBottom: moderateScale(20),
  },
  marginB: {
    marginBottom: moderateScale(15),
  },
  marginTL: {
    marginTop: moderateScale(20),
  },
  marginTM: {
    marginTop: moderateScale(15),
  },
  marginTS: {
    marginTop: moderateScale(10),
  },

  marginTXS: {
    marginTop: moderateScale(5),
  },

  //============= BUTTON STYLES ================//
  primaryBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    marginVertical: moderateScale(20),
  },
  homeTabs: {
    marginTop: verticalScale(2),
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginLeft: -moderateScale(4),
  },

  btntxt: {
    color: theme.colors.surface,
    fontFamily: theme.fonts.bold,
  },
  googleBtn: {
    backgroundColor: theme.colors.inputBack,
    flexDirection: 'row',
  },
  absBtn: {
    position: 'absolute',
    bottom: moderateScale(5),
    right: moderateScale(5),
  },
  whiteBtn: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
  },
  partialPayBtn: {
    width: '32%',
    paddingVertical: moderateScale(3),
  },
  smallHeightBtn: {
    width: '48%',
    marginVertical: 0,
    paddingVertical: moderateScale(5),
  },
  width47: {
    marginTop: moderateScale(10),
    width: '47%',
    height: moderateScale(40),
  },
  scanButton: {
    width: '22%',
    borderLeftWidth: 1,
    borderColor: theme.colors.placeholder,
  },
  //=============== TEXT STYLES ==============//
  underlineTxt: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  text: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    // lineHeight: theme.fontSizes.xlarge,
  },
  normalSmall: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.darkText,
    fontSize: theme.fontSizes.regular,
    // lineHeight: theme.fontSizes.xlarge,
  },
  heading4: {
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.darkText,
    fontSize: theme.fontSizes.large,
  },
  normalBold: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.darkGrey,
    fontSize: theme.fontSizes.regular,
    // lineHeight: theme.fontSizes.xlarge,
  },
  smallBold: {
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.darkGrey,
    fontSize: theme.fontSizes.small,
    // lineHeight: theme.fontSizes.xlarge,
  },
  heading2: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.darkText,
    fontSize: theme.fontSizes.large,
  },
  smallTabText: {
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fonts.regular,
    color: theme.colors.darkText,
  },
  heading3: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.darkText,
    fontSize: theme.fontSizes.xlarge,
  },

  regularBold: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkText,
    fontFamily: theme.fonts.semiBold,
  },
  purpleBold: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
  ////  ======== INPUT STYLES =========== ////////

  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    height: moderateScale(47),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    backgroundColor: theme.colors.inputBack,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  phInput: {
    height: '100%',
    width: '100%',
  },
  errorText: {
    color: theme.colors.danger,
  },
  focusContainer: {
    width: '75%',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
  },
  //=============== Images STYLES ==============//
  absImg: {
    position: 'absolute',
    width: moderateScale(125),
    height: moderateScale(130),
    right: moderateScale(20),
    bottom: moderateScale(-25),
    // top: moderateScale(15),
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  imgView: {
    width: moderateScale(width * 0.8),
    height: moderateScale(305),
    alignSelf: 'center',
  },
  productImg: {
    backgroundColor: theme.colors.inputBack,
    borderRadius: moderateScale(140 / 2),
    width: moderateScale(140),
    height: moderateScale(140),
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  productImg2: {
    overflow: 'hidden',
    backgroundColor: theme.colors.inputBack,
    borderRadius: moderateScale(16),
    width: moderateScale(100),
    height: moderateScale(100),
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  productImg3: {
    // backgroundColor: theme.colors.inputBack,
    borderRadius: moderateScale(10),
    width: moderateScale(56),
    height: moderateScale(48),
    borderColor: theme.colors.border,
    // borderWidth: 1,
    overflow: 'hidden',
  },
  userImg: {
    // backgroundColor: theme.colors.inputBack,
    borderRadius: moderateScale(10),
    width: moderateScale(56),
    height: moderateScale(56),
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  userImg2: {
    // backgroundColor: theme.colors.inputBack,
    borderRadius: moderateScale(20),
    width: moderateScale(100),
    height: moderateScale(100),
  },

  qrCodeImg: {
    width: moderateScale(241),
    height: moderateScale(241),
    alignSelf: 'center',
  },
  notifyBorderView: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: moderateScale(8),
    backgroundColor: theme.colors.secondary,
  },
  printerImg: {
    width: moderateScale(160),
    height: moderateScale(140),
    // borderRadius: moderateScale(8),
    // borderWidth: 1,
    // borderColor: theme.colors.border,
  },
});

export default styles;
