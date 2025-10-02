import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import theme from '../config/theme';

const Loader = ({isLoading}: any) => {
  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    // top: 0,
    // left: 0,
    // height: Dimensions.get('screen').width,
    // width: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Loader;
