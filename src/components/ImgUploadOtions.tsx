import React from 'react';
import {Image, View} from 'react-native';
import images from '../config/images';
import styles from '../GlobalStyles';
import CameraOpt from './CamerOptions';
import {moderateScale} from 'react-native-size-matters';
import ImgBack from '../assets/images/ImgBack.svg';
type Props = {
  setImage: (data: any) => void;
  image: any;
};

const ImgUploadOtions = ({setImage, image}: Props) => {
  return (
    <View style={[styles.row, styles.centerAlign]}>
      <View style={[styles.productImg2, styles.centerAlign]}>
        {image?.uri ? (
          <Image
            source={{uri: image?.uri}}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        ) : (
          <ImgBack />
        )}
      </View>
      <CameraOpt setImage={setImage} />
    </View>
  );
};

export default ImgUploadOtions;
