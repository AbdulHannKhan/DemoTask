import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import Gallery from '../assets/images/Gallery.svg';
import {checkCameraPermission, height} from '../config/constants';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import {useAppDispatch} from '../store/hooks';
import Icon from './Icon';
import i18next from 'i18next';

type Props = {
  setImage: (data: any) => void;
};
const CameraOpt = ({setImage}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const langDir = i18next.dir();

  const openCamera = async (c: any) => {
    if (c == 'g') {
      launchImageLibrary({
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
        mediaType: 'photo',
      })
        .then(image => {
          if (image?.assets) {
            let data = {
              uri: image?.assets[0]?.uri,
              type: image?.assets[0]?.type,
              name: image?.assets[0]?.fileName,
            };
            setImage(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (c == 'c') {
      if (Platform.OS == 'android') {
        let isCameraPermitted = await checkCameraPermission(dispatch);
        if (isCameraPermitted) {
          launchCamera({
            quality: 0.5,
            maxWidth: 200,
            maxHeight: 200,
            mediaType: 'photo',
            saveToPhotos: true,
          })
            .then(image => {
              if (image?.assets) {
                let data = {
                  uri: image?.assets[0]?.uri,
                  type: image?.assets[0]?.type,
                  name: image?.assets[0]?.fileName,
                };
                setImage(data);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        launchCamera({
          quality: 0.5,
          maxWidth: 200,
          maxHeight: 200,
          mediaType: 'photo',
          saveToPhotos: true,
        })
          .then(image => {
            if (image?.assets) {
              let data = {
                uri: image?.assets[0]?.uri,
                type: image?.assets[0]?.type,
                name: image?.assets[0]?.fileName,
              };
              setImage(data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  const Option = ({type, icon, text}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.borderContainer,
          styles.marginVXS,
          styles.paddingVXS,
          styles.paddingHXL,
          styles.centerAlign,
          {
            width: '80%',
            backgroundColor: theme.colors.surface,
          },
        ]}
        onPress={() => openCamera(type)}>
        {type === 'c' ? (
          <Icon
            name={icon}
            size={moderateScale(20)}
            color={theme.colors.primary}
            type={'MaterialCommunityIcons'}
          />
        ) : (
          <Icon
            name={icon}
            size={moderateScale(20)}
            color={theme.colors.primary}
            type={'MaterialCommunityIcons'}
          />
        )}

        <Text
          style={[
            styles.text,
            styles.paddingLS,
            {
              color: theme.colors.darkText,
              width: Platform.OS === 'ios' && langDir === 'rtl' ? '50%' : null,
            },
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const CamerOpt = () => {
    return (
      <View style={[styles.centerAlign]}>
        <Option type={'c'} text={t('CAMERA')} icon={'camera-plus-outline'} />
        <Option type={'g'} text={t('GALLERY')} icon={'image-frame'} />
      </View>
    );
  };
  return <CamerOpt />;
};

export default CameraOpt;
