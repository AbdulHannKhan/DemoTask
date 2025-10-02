import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import images from '../config/images';
import styles from '../GlobalStyles';
import CameraOpt from './CamerOptions';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import ImgBack from '../assets/images/ImgBack.svg';
import Icon from './Icon';
import theme from '../config/theme';

type Props = {
  setImage: (data: any) => void;
  image: any;
};

const ProfileImageUpload = ({setImage, image}: Props) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <View style={[styles.centerAlign]}>
      <TouchableOpacity
        onPress={toggle}
        style={[styles.productImg, styles.selfAlign, styles.centerAlign]}>
        {image?.uri ? (
          <Image
            source={image?.uri ? {uri: image?.uri} : images.kurleez}
            style={{
              width: '100%',
              height: '100%',
              zIndex: 1,
              borderRadius: moderateScale(140 / 2),
            }}
            resizeMode="cover"
          />
        ) : (
          <ImgBack />
        )}
      </TouchableOpacity>

      {show ? (
        <View style={{marginTop: verticalScale(20)}}>
          <CameraOpt
            setImage={img => {
              setImage(img);
              setShow(false);
            }}
          />
        </View>
      ) : null}
      {!show ? (
        <TouchableOpacity
          onPress={toggle}
          style={[
            styles.roundBtn,
            styles.centerAlign,
            {position: 'absolute', bottom: 10, left: '60%'},
          ]}>
          <Icon
            name={'upload'}
            type="AntDesign"
            color={theme.colors.surface}
            size={moderateScale(18)}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProfileImageUpload;
