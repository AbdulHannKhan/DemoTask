import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {moderateScale} from 'react-native-size-matters';
import styles from '../../../GlobalStyles';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import Wrapper from '../../../components/wrapper';
import theme from '../../../config/theme';
import {CompanyImageTypeEnum, CourtStatusEnum} from '../../../helper/enums';
import {navigationRef} from '../../../navigation';
import {
  getImage,
  setAllImages,
  setBookingData,
} from '../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {compressImages, parseBoldText} from '../../../helper/functions';
import {companyDetailID} from '../../../config/constants';

const CourtDetails = ({navigation, route}) => {
  const {allImages} = useAppSelector(state => state.court);
  const {data, charges, slots, location} = route?.params;
  const [visible, setIsVisible] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [imageMap, setImageMap] = useState([]);
  const [activeIndex, setActiveIndex] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBookingData(null));
  }, []);

  useEffect(() => {
    if (data?.courtImages?.length) {
      const allCourtImages = [];

      const mainPrevImages = data.courtImages?.filter(
        e =>
          e?.companyImageTypeId === CompanyImageTypeEnum?.Main ||
          e?.companyImageTypeId === CompanyImageTypeEnum?.Preview,
      );

      if (mainPrevImages?.length) {
        allCourtImages.push(...mainPrevImages);
      }

      const alreadyFetchedIds = allImages?.map(img => img.companyImageId) || [];

      // Images that already exist in Redux
      const existingImages = allCourtImages
        .filter(img => alreadyFetchedIds.includes(img.companyImageId))
        .map(img =>
          allImages?.find(e => e.companyImageId === img.companyImageId),
        );

      if (existingImages?.length) {
        setImageMap(prev => {
          const updated = [...prev];
          existingImages.forEach(img => {
            if (!updated.some(i => i.companyImageId === img.companyImageId)) {
              updated.push(img);
            }
          });
          return updated;
        });
      }
    }
  }, [allImages]);

  let img = imageMap?.find(
    e => e?.companyImageTypeId === CompanyImageTypeEnum?.Main,
  )?.companyImage;

  let mainImgFoundIndex = data?.courtImages?.findIndex(
    e => e?.companyImageTypeId === CompanyImageTypeEnum?.Main,
  );

  let checkMain =
    mainImgFoundIndex !== -1 &&
    !data?.courtImages[mainImgFoundIndex]?.companyImage &&
    !img;

  let previewImgs = imageMap
    ?.filter(e => e?.companyImageTypeId === CompanyImageTypeEnum?.Preview)
    ?.map(e => {
      return {uri: e?.companyImage, companyImageId: e?.companyImageId};
    });

  const renderItem = ({item, index}) => {
    let mainImgFoundIndex = data?.courtImages?.findIndex(
      e => e?.companyImageId === item?.companyImageId,
    );

    let checkFound =
      mainImgFoundIndex !== -1 &&
      !data?.courtImages[mainImgFoundIndex]?.companyImage &&
      !item?.uri;
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveIndex(index);
          setIsVisible(true);
        }}
        style={[{flex: 1}, styles.centerAlign]}>
        {item?.uri ? (
          <Image
            source={{uri: item?.uri}}
            style={[styles.marginRL, styles.previewImg]}
            resizeMode="cover"
          />
        ) : checkFound ? (
          <View
            style={[
              styles.marginRL,
              styles.centerAlign,
              {
                borderWidth: 1,
                borderColor: theme.colors.border,
              },
              styles.previewImg,
              {borderRadius: moderateScale(10)},
            ]}>
            <ActivityIndicator size={'large'} color={theme.colors.primary} />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const formattedText = parseBoldText(data?.courtDescription);

  return (
    <View style={[styles.main, {paddingHorizontal: 0}]}>
      <BackButton
        onPress={() => navigation.goBack()}
        title="Details"
        style={[
          styles.paddingHL,
          {marginBottom: 0},
          styles.paddingVM,
          styles.headerBorder,
        ]}
      />
      <Wrapper style={{paddingHorizontal: 0, paddingBottom: moderateScale(30)}}>
        {img ? (
          <TouchableOpacity
            onPress={() => {
              setIsVisible1(true);
            }}
            style={[styles.imgPreview]}>
            <Image
              source={{uri: img}}
              style={[styles.fullWidthHeight]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : checkMain ? (
          <View style={[styles.imgPreview, styles.centerAlign]}>
            <ActivityIndicator size={'large'} color={theme.colors.primary} />
          </View>
        ) : null}
        {img ? (
          <ImageView
            images={[{uri: img}]}
            imageIndex={0}
            visible={visible1}
            onRequestClose={() => setIsVisible1(false)}
          />
        ) : null}
        {/* //======= COURT DETAILS ======>>>>>> */}
        <View
          style={[
            styles.paddingL,
            styles.courtStyle,
            !img && styles.marginTXS,
          ]}>
          <View style={[styles.row, styles.justifyBetween]}>
            <View style={[styles.flexColumn, {width: '48%'}]}>
              <Text style={styles.heading2}>{data?.courtName}</Text>
              {/* <Text
                style={[styles.normalSmall, {marginTop: moderateScale(-5)}]}>
                {location}
              </Text> */}
            </View>
            {data?.courtStatusId === CourtStatusEnum?.Open ? (
              <View style={[styles.flexColumn, {alignItems: 'flex-end'}]}>
                <Text style={[styles.text]}>Starts from</Text>
                <Text style={styles.regularBold}>
                  Rs. {charges?.toLocaleString()}
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.flexColumn,
                  {width: '50%', alignItems: 'flex-end'},
                ]}>
                <Text
                  style={[
                    styles.text,
                    {textAlign: 'right', color: theme.colors.danger},
                  ]}>
                  Under Maintenance
                </Text>
              </View>
            )}
          </View>

          <View>
            <Text
              style={[
                styles.regularBold,
                styles.marginTS,
                styles.marginBXS,
                {fontFamily: theme.fonts.bold},
              ]}>
              Description
            </Text>
            <Text>{formattedText}</Text>
          </View>
          {previewImgs?.length ? (
            <View>
              <Text
                style={[
                  styles.regularBold,
                  styles.marginVS,
                  {fontFamily: theme.fonts.bold},
                ]}>
                Preview
              </Text>
              <FlatList horizontal data={previewImgs} renderItem={renderItem} />

              <ImageView
                images={previewImgs}
                imageIndex={activeIndex}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            </View>
          ) : null}
        </View>
      </Wrapper>

      <Button
        disable={data?.courtStatusId !== CourtStatusEnum?.Open}
        title="Book Now"
        style={styles.buttonOver}
        onPress={() =>
          navigationRef.navigate('BookingSchedule', {
            data: data,
            slots: slots,
            charges: charges,
          })
        }
      />
    </View>
  );
};

export default CourtDetails;
