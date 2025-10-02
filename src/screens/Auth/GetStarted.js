import React, {useEffect, useState} from 'react';
import {Animated, ImageBackground, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import images from '../../config/images';
import styles from '../../GlobalStyles';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setStartedAlready} from '../../store/onBoarding';
import LogoSvg from '../../assets/images/applogo.svg';
import {moderateScale} from 'react-native-size-matters';
import {companyDetailID} from '../../config/constants';
import {
  getHomeData,
  getLocationsDataNew,
  setLoading,
} from '../../store/courtSlice';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment-timezone';
import {navigationRef} from '../../navigation';

const GetStarted = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [opacity] = useState(new Animated.Value(0)); // Start fully transparent
  const [translateY] = useState(new Animated.Value(40)); // Start slightly lower
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      dispatch(getHomeData({companyDetailID: companyDetailID}));
      dispatch(getLocationsDataNew({companyDetailID: companyDetailID}));
    }
  }, [isFocus]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // Fade in
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, // Move to normal position
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = async () => {
    await AsyncStorage.setItem('opened', 'true');
    dispatch(setStartedAlready(true));
  };

  return (
    <ImageBackground
      source={images.backgroundImg}
      style={[styles.fullWidthHeight, styles.centerAlign]}
      resizeMode="cover">
      <View style={styles.emptyView} />
      <View
        style={[
          styles.centerAlign,
          styles.justifyBetween,
          {width: '90%', flex: 1},
        ]}>
        {/* Animated Logo */}
        <Animated.View style={{opacity, transform: [{translateY}]}}>
          <LogoSvg width={moderateScale(250)} height={moderateScale(150)} />
        </Animated.View>
        <View style={[styles.fullWidth, styles.centerAlign]}>
          <Button
            title="Continue as Guest"
            onPress={() => {
              handlePress();
              setTimeout(() => {
                navigationRef.navigate('HomeScreen');
              }, 100);
            }}
            style={styles.fullWidth}
          />

          <Text
            onPress={() => {
              handlePress();
              setTimeout(() => {
                dispatch(setLoading(false));
                navigationRef.navigate('AuthStack', {screen: 'SignIn'});
              }, 100);
              // navigationRef.navigate('AuthStack', {screen: 'SignIn'});
            }}
            style={[styles.normalSmall, styles.underlineTxt]}>
            Sign In
          </Text>
        </View>

        <Text style={[styles.normalSmall, styles.marginVL, styles.selfAlign]}>
          Powered by Quantum Paradigm
        </Text>
      </View>
    </ImageBackground>
  );
};

export default GetStarted;
