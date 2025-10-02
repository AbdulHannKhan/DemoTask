import {useState} from 'react';
import {Animated, Image} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = ({onAnimationEnd}: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const {container, logo /*, brand */} = BootSplash.useHideAnimation({
    manifest: require('../../../assets/bootsplash/manifest.json'),
    logo: require('../../../assets/bootsplash/logo.png'),
    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      Animated.parallel([
        // Fade out the background/container
        // Animated.timing(opacity, {
        //   useNativeDriver: true,
        //   toValue: 0,
        //   duration: 2000,
        // }),
        // Move logo up by 10% of its height
        Animated.timing(translateY, {
          useNativeDriver: true,
          toValue: -moderateScale(120), // Adjust based on screen size
          duration: 1500,
        }),
      ]).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, {opacity}]}>
      <Animated.Image
        {...logo}
        style={[logo.style, {transform: [{translateY}]}]} // Move logo up
      />
      {/* <Image {...brand} /> */}
    </Animated.View>
  );
};
