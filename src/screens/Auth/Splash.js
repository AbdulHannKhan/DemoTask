import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, Animated, Easing} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import theme from '../../config/theme';

import images from '../../config/images';
import {moderateScale} from 'react-native-size-matters';
import {height, width} from '../../config/constants';

const Splash = () => {
  const logoScale = useRef(new Animated.Value(1)).current; // For scaling the logo
  const logoPosition = useRef(new Animated.Value(0)).current; // For moving the logo
  const [isBootSplashVisible, setIsBootSplashVisible] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Hide the bootsplash and start the transition animation
    const startAnimation = () => {
      // Scale the logo down
      Animated.timing(logoScale, {
        toValue: 0.9, // Shrink logo to 30% of its size
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Move the logo to the top-left corner (adjust values as per your design)
      Animated.timing(logoPosition, {
        toValue: -20, // Adjust this value based on your layout
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setAnimationFinished(true)); // After animation ends
    };
    setIsBootSplashVisible(false);
    startAnimation(); // Start the transition animation
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: animationFinished
            ? theme.colors.surface
            : theme.colors.primary,
        },
      ]}>
      {isBootSplashVisible ? null : (
        <Animated.View
          style={[
            styles.logoContainer,
            {
              backgroundColor: animationFinished
                ? theme.colors.surface
                : theme.colors.primary,

              transform: [{scale: logoScale}, {translateY: logoPosition}],
            },
          ]}>
          <View style={styles.row}>
            <View style={styles.circleLogo}>
              <Image
                source={images.appLogo}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary, // Adjust this to match your splash screen background
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLogo: {
    width: moderateScale(188),
    height: moderateScale(188),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 100, // Font size for the logo "P"
    color: '#4A00E0', // Color matching your theme
  },
  appContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Main screen background color
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -200, // Position logo and text higher after transition
  },
  miniLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A00E0', // Adjust to match theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 36,
    color: '#4A00E0',
    marginLeft: 10, // Adjust space between logo and brand name
  },
  poweredBy: {
    position: 'absolute',
    bottom: 20,
    color: '#4A00E0',
    fontSize: 14,
  },
});
