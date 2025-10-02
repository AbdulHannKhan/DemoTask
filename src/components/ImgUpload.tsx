import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ImgBack from '../assets/images/ImgBack.svg';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';

type Props = {
  onPress: () => void;
  image: string;
  style?: object;
  hideUploadIcon?: boolean;
};

const ImgUpload = ({onPress, image, style, hideUploadIcon = false}: Props) => {
  return (
    <TouchableOpacity
      disabled={hideUploadIcon}
      onPress={onPress}
      style={[styles.productImg, styles.selfAlign, styles.centerAlign, style]}>
      {image ? (
        <View style={[styles.productImg, styles.centerAlign]}>
          <Image
            source={{uri: image}}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: moderateScale(20),
            }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <ImgBack />
      )}
      {hideUploadIcon ? null : (
        <View style={[styles.roundBtn, styles.absBtn, styles.centerAlign]}>
          <Icon
            name={'upload'}
            type="AntDesign"
            color={theme.colors.surface}
            size={moderateScale(18)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ImgUpload;
