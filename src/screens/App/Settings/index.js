import {default as React, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AlertModal from '../../../components/AlertModal';
import BackButton from '../../../components/BackButton';
import Card from '../../../components/Card';
import Wrapper from '../../../components/wrapper';
import images from '../../../config/images';
import theme from '../../../config/theme';
import styles from '../../../GlobalStyles';
import {navigationRef} from '../../../navigation';
import {setAllDataClear, setBookingData} from '../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  deleteUserAccount,
  logOut,
  setAccessToken,
  setUserData,
} from '../../../store/onBoarding';
import Toast from 'react-native-toast-message';
import Person from '../../../assets/images/person.svg';
import {goToHomeAndResetStack} from '../../../helper/functions';
import {useIsFocused} from '@react-navigation/native';

const Settings = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltype, setModaltype] = useState('');
  const {userData, accessToken, fcmToken} = useAppSelector(
    state => state.onBoarding,
  );
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus && !accessToken) {
      dispatch(setBookingData(null));
      navigation.navigate('AuthStack', {
        screen: 'SignIn',
        params: {stack: 'SettingsStack', data: 'Settings'},
      });
    }
  }, [isFocus]);

  const settings = [
    {
      title: 'Profile Settings',
      leftIcon: 'person-outline',
      rightIcon: 'arrow-right',
      iconType: 'MaterialIcons',
      text: 'Name, email, phone, password',
      onPress: () => {
        navigationRef?.navigate('Profile');
      },
    },
    {
      title: 'My Bookings',
      leftIcon: 'calendar-outline',
      rightIcon: 'arrow-right',
      iconType: 'MaterialCommunityIcons',
      text: 'Upcoming bookings, History',
      onPress: () => {
        navigationRef?.navigate('MyBookingStack');
      },
    },
    {
      title: 'Terms and Conditions',
      leftIcon: 'file-edit-outline',
      rightIcon: 'arrow-right',
      iconType: 'MaterialCommunityIcons',
      text: 'Rules and regulations, user ob...',
      onPress: () => {
        navigationRef?.navigate('TermsnConditions');
      },
    },
    {
      title: 'Privacy Policy',
      rightIcon: 'arrow-right',
      iconType: 'MaterialCommunityIcons',
      text: 'Data Protection, Information u..',
      onPress: () => {
        navigationRef?.navigate('PrivacyPolicy');
      },
    },

    {
      title: 'Logout',
      leftIcon: 'logout',
      rightIcon: 'arrow-right',
      iconType: 'MaterialCommunityIcons',
      onPress: () => {
        setModaltype('logout');
        setModalVisible(true);
      },
    },
    {
      title: 'Delete Account',
      leftIcon: 'trash-can-outline',
      iconType: 'MaterialCommunityIcons',
      onPress: () => {
        setModaltype('delete');
        setModalVisible(true);
      },
      centerAlign: true,
    },
  ];

  const logout = () => {
    setModalVisible(false);
    const logoutForm = {
      deviceToken: fcmToken,
    };

    dispatch(logOut(logoutForm)).then(res => {
      if (res?.error?.message !== 'Rejected') {
      }

      dispatch(setAccessToken(''));
      dispatch(setUserData(null));
      navigationRef.navigate('HomeScreen');
    });
  };

  const deleteAccount = pass => {
    dispatch(deleteUserAccount({password: pass})).then(res => {
      if (res?.error?.message !== 'Rejected') {
        Toast.show({
          type: 'success',
          text1: 'Your account has been deleted successfully.',
        });
        dispatch(setAccessToken(''));
        dispatch(setUserData(null));
        navigationRef.navigate('HomeScreen');
      }
    });
  };
  return (
    <Wrapper style={styles.wrapper}>
      <BackButton
        title={'My Account'}
        onPress={() => navigation.goBack()}
        style={[styles.paddingHL, styles.paddingVM, styles.headerBorder]}
      />
      <View style={[styles.paddingHL]}>
        <View
          style={[
            styles.row,
            styles.marginBL,
            styles.centerAlign,
            {
              justifyContent: 'flex-start',
            },
          ]}>
          <View style={[styles.centerAlign, styles.profileImg]}>
            {userData?.userImage ? (
              <Image
                source={{uri: userData?.userImage}}
                resizeMode="cover"
                style={styles.fullWidthHeight}
              />
            ) : (
              <Person width={moderateScale(20)} height={moderateScale(20)} />
            )}
          </View>

          <View
            style={[
              styles.paddingHM,
              styles.centerAlign,
              {alignItems: 'flex-start'},
            ]}>
            <Text style={[styles.regularBold, {marginTop: moderateScale(-6)}]}>
              {userData?.userName}
            </Text>
            <Text
              style={[
                styles.normalSmall,
                {marginTop: moderateScale(-5)},
                {color: theme.colors.primary},
              ]}>
              {userData?.userEmail?.length > 28
                ? `${userData?.userEmail?.substring(0, 28)}...`
                : userData?.userEmail}
            </Text>
          </View>
        </View>

        {settings.map(setting => {
          return (
            <Card
              title={setting?.title}
              // text={setting?.text}
              leftIcon={setting?.leftIcon}
              rightIcon={setting?.rightIcon}
              iconType={setting?.iconType}
              rightText={setting?.rightText}
              rightImage={setting?.rightImage}
              onPress={setting?.onPress}
              centerAlign={setting?.centerAlign}
            />
          );
        })}
      </View>

      <AlertModal
        type={modaltype}
        isVisible={modalVisible}
        onClose={t => setModalVisible(!modalVisible)}
        onPress={modaltype === 'delete' ? deleteAccount : logout}
      />
    </Wrapper>
  );
};

export default Settings;
