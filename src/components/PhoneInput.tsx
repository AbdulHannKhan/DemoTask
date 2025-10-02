import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import {useAppSelector} from '../store/hooks';
import CustomRBSheet from './RBSheet';
import {getLocal} from '../helper/functions';
import {setInitialCountry, setInitialCountryCode} from '../store/onBoarding';
import {getCountry, getTimeZone} from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {timezonesToCountries} from './timezone';
import moment from 'moment-timezone';
const keys = [232, 233, 234, 235, 236, 238, 239, 240, 241, 242];

type CustomProps = {
  value?: string;
  labelValue: string;
  customStyle?: object;
  label?: string;
  required?: boolean;
  disableFlag?: boolean;
  rightIcon?: string;
  onChangeText: (arg: string) => void;
  deleteFunc?: () => void;
  initialValue?: string;
  error?: string;
  setError?: any;
  phError?: string;
  inputRef?: any;
  onChangeCode: (arg: string) => void;
};

const PhoneNumInput = ({
  value,
  labelValue,
  onChangeText,
  customStyle,
  label,
  required,
  disableFlag,
  rightIcon,
  deleteFunc,
  initialValue,
  error,
  setError,
  phError,
  inputRef,
  onChangeCode,
  ...rest
}: CustomProps) => {
  const {t} = useTranslation();
  const {initialCountry, initialCountryCode} = useAppSelector(
    state => state.onBoarding,
  );
  const phonenum = useRef<any>();
  const countryRBSheet = useRef<any>();
  const [isValid, setIsValid] = useState(initialValue ? true : false);
  const [countryData, setCountryData] = useState([]);
  const getCountryCodeByTimezone = timezone => {
    return timezonesToCountries[timezone] || null; // Return null if the timezone is not found
  };

  useEffect(() => {
    if (initialValue && !labelValue) {
      let a = moment.tz.guess();
      let b = getCountryCodeByTimezone(a);
      initialRef(b);
    } else {
      console.log('going11', labelValue);
      phonenum?.current?.setValue(labelValue);
    }
    console.log('going11', labelValue);
  }, [initialValue]);

  const countryCodes = {
    AF: '+93', // Afghanistan
    AL: '+355', // Albania
    DZ: '+213', // Algeria
    AS: '+1-684', // American Samoa
    AD: '+376', // Andorra
    AO: '+244', // Angola
    AI: '+1-264', // Anguilla
    AQ: '+672', // Antarctica
    AG: '+1-268', // Antigua and Barbuda
    AR: '+54', // Argentina
    AM: '+374', // Armenia
    AW: '+297', // Aruba
    AU: '+61', // Australia
    AT: '+43', // Austria
    AZ: '+994', // Azerbaijan
    BS: '+1-242', // Bahamas
    BH: '+973', // Bahrain
    BD: '+880', // Bangladesh
    BB: '+1-246', // Barbados
    BY: '+375', // Belarus
    BE: '+32', // Belgium
    BZ: '+501', // Belize
    BJ: '+229', // Benin
    BT: '+975', // Bhutan
    BO: '+591', // Bolivia
    BA: '+387', // Bosnia and Herzegovina
    BW: '+267', // Botswana
    BR: '+55', // Brazil
    BN: '+673', // Brunei
    BG: '+359', // Bulgaria
    BF: '+226', // Burkina Faso
    BI: '+257', // Burundi
    CV: '+238', // Cabo Verde
    KH: '+855', // Cambodia
    CM: '+237', // Cameroon
    CA: '+1', // Canada
    CF: '+236', // Central African Republic
    TD: '+235', // Chad
    CL: '+56', // Chile
    CN: '+86', // China
    CO: '+57', // Colombia
    KM: '+269', // Comoros
    CG: '+242', // Congo (Congo-Brazzaville)
    CD: '+243', // Congo (Democratic Republic of the)
    CR: '+506', // Costa Rica
    HR: '+385', // Croatia
    CU: '+53', // Cuba
    CY: '+357', // Cyprus
    CZ: '+420', // Czechia (Czech Republic)
    DK: '+45', // Denmark
    DJ: '+253', // Djibouti
    DM: '+1-767', // Dominica
    DO: '+1-809', // Dominican Republic
    EC: '+593', // Ecuador
    EG: '+20', // Egypt
    SV: '+503', // El Salvador
    GQ: '+240', // Equatorial Guinea
    ER: '+291', // Eritrea
    EE: '+372', // Estonia
    SZ: '+268', // Eswatini
    ET: '+251', // Ethiopia
    FK: '+500', // Falkland Islands
    FO: '+298', // Faroe Islands
    FJ: '+679', // Fiji
    FI: '+358', // Finland
    FR: '+33', // France
    GF: '+594', // French Guiana
    PF: '+689', // French Polynesia
    GA: '+241', // Gabon
    GM: '+220', // Gambia
    GE: '+995', // Georgia
    DE: '+49', // Germany
    GH: '+233', // Ghana
    GI: '+350', // Gibraltar
    GR: '+30', // Greece
    GL: '+299', // Greenland
    GD: '+1-473', // Grenada
    GP: '+590', // Guadeloupe
    GU: '+1-671', // Guam
    GT: '+502', // Guatemala
    GG: '+44-1481', // Guernsey
    GN: '+224', // Guinea
    GW: '+245', // Guinea-Bissau
    GY: '+592', // Guyana
    HT: '+509', // Haiti
    HM: '+672', // Heard Island and McDonald Islands
    VA: '+39-06', // Holy See
    HN: '+504', // Honduras
    HK: '+852', // Hong Kong
    HU: '+36', // Hungary
    IS: '+354', // Iceland
    IN: '+91', // India
    ID: '+62', // Indonesia
    IR: '+98', // Iran
    IQ: '+964', // Iraq
    IE: '+353', // Ireland
    IM: '+44-1624', // Isle of Man IL: '+972', // Israel
    IT: '+39', // Italy
    JM: '+1-876', // Jamaica
    JP: '+81', // Japan
    JE: '+44-1534', // Jersey
    JO: '+962', // Jordan
    KZ: '+7', // Kazakhstan
    KE: '+254', // Kenya
    KI: '+686', // Kiribati
    KP: '+850', // North Korea
    KR: '+82', // South Korea
    KW: '+965', // Kuwait
    KG: '+996', // Kyrgyzstan
    LA: '+856', // Laos
    LV: '+371', // Latvia
    LB: '+961', // Lebanon
    LS: '+266', // Lesotho
    LR: '+231', // Liberia
    LY: '+218', // Libya
    LI: '+423', // Liechtenstein
    LT: '+370', // Lithuania
    LU: '+352', // Luxembourg
    MO: '+853', // Macau
    MG: '+261', // Madagascar
    MW: '+265', // Malawi
    MY: '+60', // Malaysia
    MV: '+960', // Maldives
    ML: '+223', // Mali
    MT: '+356', // Malta
    MH: '+692', // Marshall Islands
    MQ: '+596', // Martinique
    MR: '+222', // Mauritania
    MU: '+230', // Mauritius
    YT: '+262', // Mayotte
    MX: '+52', // Mexico
    FM: '+691', // Micronesia
    MD: '+373', // Moldova
    MC: '+377', // Monaco
    MN: '+976', // Mongolia
    ME: '+382', // Montenegro
    MS: '+1-664', // Montserrat
    MA: '+212', // Morocco
    MZ: '+258', // Mozambique
    MM: '+95', // Myanmar
    NA: '+264', // Namibia
    NR: '+674', // Nauru
    NP: '+977', // Nepal
    NL: '+31', // Netherlands
    NC: '+687', // New Caledonia
    NZ: '+64', // New Zealand
    NI: '+505', // Nicaragua
    NE: '+227', // Niger
    NG: '+234', // Nigeria
    NU: '+683', // Niue
    NF: '+672', // Norfolk Island
    MP: '+1-670', // Northern Mariana Islands
    NO: '+47', // Norway
    OM: '+968', // Oman
    PK: '+92', // Pakistan
    PW: '+680', // Palau
    PS: '+970', // Palestine
    PA: '+507', // Panama
    PG: '+675', // Papua New Guinea
    PY: '+595', // Paraguay
    PE: '+51', // Peru
    PH: '+63', // Philippines
    PN: '+64', // Pitcairn Islands
    PL: '+48', // Poland
    PT: '+351', // Portugal
    PR: '+1-787', // Puerto Rico
    QA: '+974', // Qatar
    RE: '+262', // Réunion
    RO: '+40', // Romania
    RU: '+7', // Russia
    RW: '+250', // Rwanda
    BL: '+590', // Saint Barthélemy
    KN: '+1-869', // Saint Kitts and Nevis
    LC: '+1-758', // Saint Lucia
    MF: '+590', // Saint Martin
    PM: '+508', // Saint Pierre and Miquelon
    VC: '+1-784', // Saint Vincent and the Grenadines
    WS: '+685', // Samoa
    SM: '+378', // San Marino
    ST: '+239', // São Tomé and Príncipe
    SA: '+966', // Saudi Arabia
    SN: '+221', // Senegal
    RS: '+381', // Serbia
    SC: '+248', // Seychelles
    SL: '+232', // Sierra Leone
    SG: '+65', // Singapore
    SX: '+1-721', // Sint Maarten
    SK: '+421', // Slovakia
    SI: '+386', // Slovenia
    SB: '+677', // Solomon Islands
    SO: '+252', // Somalia
    ZA: '+27', // South Africa
    GS: '+500', // South Georgia and the South Sandwich Islands
    SS: '+211', // South Sudan
    ES: '+34', // Spain
    LK: '+94', // Sri Lanka
    SD: '+249', // Sudan
    SR: '+597', // Suriname
    SJ: '+47', // Svalbard and Jan Mayen
    SZ: '+268', // Eswatini
    SE: '+46', // Sweden
    CH: '+41', // Switzerland
    SY: '+963', // Syria
    TW: '+886', // Taiwan
    TJ: '+992', // Tajikistan
    TZ: '+255', // Tanzania
    TH: '+66', // Thailand
    TL: '+670', // Timor-Leste
    TG: '+228', // Togo
    TK: '+690', // Tokelau
    TO: '+676', // Tonga
    TT: '+1-868', // Trinidad and Tobago
    TN: '+216', // Tunisia
    TR: '+90', // Turkey
    TM: '+993', // Turkmenistan
    TC: '+1-649', // Turks and Caicos Islands
    TV: '+688', // Tuvalu
    UG: '+256', // Uganda
    UA: '+380', // Ukraine
    AE: '+971', // United Arab Emirates
    GB: '+44', // United Kingdom
    US: '+1', // United States
    UY: '+598', // Uruguay
    UZ: '+998', // Uzbekistan
    VU: '+678', // Vanuatu
    VE: '+58', // Venezuela
    VN: '+84', // Vietnam
    WF: '+681', // Wallis and Futuna
    EH: '+212', // Western Sahara
    YE: '+967', // Yemen
    ZM: '+260', // Zambia
    ZW: '+263', // Zimbabwe
  };

  const initialRef = a => {
    const getCountryCode = country => {
      return countryCodes[country] || null; // Return null if the country code is not found
    };

    // Example usage
    const country = a; // You can change this to test with different countries
    const code = getCountryCode(country);

    if (code) {
      console.log('going112', code);

      phonenum?.current.setValue(code);
      // setInitialCountryCode(code)
      // setInitialCountry(country)
      console.log(`The country code for ${country} is ${code}`);
    } else {
      console.log(`Country code for ${country} not found`);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => phonenum?.current?.focus(), 100);
  // }, [phonenum]);

  const onSearch = (text: string) => {
    if (!text) {
      let data = phonenum?.current?.getPickerData();
      setCountryData(data);
    } else {
      const results = phonenum?.current
        ?.getPickerData()
        ?.filter((item: any) => {
          return (
            item?.label?.toLowerCase()?.includes(text?.toLowerCase()) ||
            item?.dialCode?.includes(text)
          );
        });

      setCountryData(results);
    }
  };

  const onFocus = () => {
    phonenum?.current?.focus();
  };

  const onClose = () => {
    setCountryData(phonenum?.current?.getPickerData());
  };

  return (
    <TouchableOpacity
      disabled={disableFlag}
      onPress={onFocus}
      style={customStyle}>
      <View style={[styles.row, styles.marginBXS]}>
        {label ? <Text style={styles.regularBold}>{label}</Text> : null}
        <Text style={[styles.regularBold, {color: theme.colors.danger}]}>
          {required ? ' *' : null}
        </Text>
      </View>
      <View style={[styles.inputContainer, styles.paddingHM]}>
        <PhoneInput
          initialValue={initialCountryCode}
          disabled={disableFlag}
          initialCountry={initialCountry}
          textProps={{
            placeholderTextColor: theme.colors.text,
            placeholder: 'Enter Phone Number',
          }}
          style={[styles.phInput, styles.centerAlign]}
          flagStyle={styles.flag}
          onPressFlag={() => {
            countryRBSheet.current.open();
          }}
          autoFormat={true}
          textStyle={[
            styles.text,
            {
              lineHeight: moderateScale(20),
            },
          ]}
          ref={phonenum}
          onChangePhoneNumber={phNumber => {
            if (phonenum?.current?.isValidNumber()) {
              setIsValid(true);
              setError('');
            } else {
              setIsValid(false);
              setError(`${t('INVALID_PH_NUM')}`);
            }
            onChangeCode(`+${phonenum?.current?.getCountryCode()}`);
            onChangeText(phNumber);
          }}
          // onPressFlag={showBS}
        />
      </View>
      {/* {(!isValid && labelValue) || error1 ? (
        error1 ? (
          <Text style={styles.text}>{error1}</Text>
        ) : null
      ) : phError && !labelValue ? (
        <Text style={styles.text}>{phError}</Text>
      ) : null} */}
      {error ? <Text style={[styles.errorText]}>{error}</Text> : null}

      {/*  =========== Country Picker ============= */}

      <CustomRBSheet
        rbsheetRef={countryRBSheet}
        onClose={onClose}
        height={moderateScale(400)}>
        <Text style={[styles.heading3, styles.marginVS, {alignSelf: 'center'}]}>
          Country
        </Text>
        <View style={style.border}>
          <Ionicons
            name="search"
            size={moderateScale(18)}
            color={theme.colors.greyText}
          />
          <TextInput
            onChangeText={onSearch}
            placeholder={t('SEARCH')}
            placeholderTextColor={theme.colors.text}
            style={{
              paddingLeft: scale(10),
              width: '90%',
              color: theme.colors.text,
            }}
          />
        </View>

        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{paddingBottom: verticalScale(30)}}>
          {countryData?.map((item: any, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  phonenum.current.setValue(item?.dialCode);
                  onChangeCode(item?.dialCode);
                  countryRBSheet.current.close();
                  setCountryData(phonenum.current.getPickerData());
                }}
                key={index}
                style={[style.stateWrapper]}>
                <View style={style.round}>
                  {!keys.includes(item?.key) ? (
                    <Image
                      source={item?.image}
                      style={{borderWidth: 1, width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  ) : (
                    // <Error width={'100%'} height={'100%'} />
                    <Text>!</Text>
                  )}
                </View>
                <View style={style.row}>
                  <Text style={[style.stateName, style.left]}>
                    {item?.label}
                  </Text>
                  <Text style={[style.stateName, style.right]}>
                    {item?.dialCode}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </CustomRBSheet>
    </TouchableOpacity>
  );
};

export default PhoneNumInput;

const style = StyleSheet.create({
  delete: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '80%',
    // backgroundColor,
  },
  round: {
    // borderWidth: 1,
    width: moderateScale(30),
    borderRadius: moderateScale(30 / 2),
    height: moderateScale(30),
    overflow: 'hidden',
  },
  stateWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.greyText,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(7),
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
  },
  stateName: {
    color: theme.colors.text,
    fontFamily: theme.fonts.semiBold,
    fontSize: theme.fontSizes.medium,
    textAlign: 'center',
    marginLeft: moderateScale(20),
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
  },
  focus: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  border: {
    padding: Platform.OS === 'ios' ? moderateScale(15) : 0,
    borderWidth: 1,
    // marginHorizontal: moderateScale(15),
    marginVertical: verticalScale(10),
    borderColor: theme.colors.greyText,
    borderRadius: moderateScale(25),
    paddingLeft: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.fonts.medium,
    marginVertical: moderateScale(10),
    alignSelf: 'center',
  },
  right: {
    width: '20%',
    alignSelf: 'flex-start',
    textAlign: 'right',
  },
  left: {
    width: '75%',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
});
