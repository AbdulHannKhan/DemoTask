import {useIsFocused} from '@react-navigation/native';
import moment from 'moment-timezone';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import styles from '../../../GlobalStyles';
import Picker from '../../../components/DateTime';
import ImageCarousel from '../../../components/ImageCarousel';
import Wrapper from '../../../components/wrapper';
import {companyDetailID} from '../../../config/constants';
import images from '../../../config/images';
import theme from '../../../config/theme';
import {
  CompanyImageTypeEnum,
  CourtDayOfWeekEnum,
  CourtStatusEnum,
} from '../../../helper/enums';
import {
  compressImages,
  generateIntervals,
  splitAndMarkBlockedIntervals,
} from '../../../helper/functions';
import {navigationRef} from '../../../navigation';
import {
  getBlockedTimes,
  getHomeData,
  getImage,
  getLocationsDataNew,
  setAllHomeImages,
  setAllImages,
  setBookingData,
  setLoading,
  setSelectedDate,
  setSelectedLocData,
} from '../../../store/courtSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import Button from '../../../components/Button';

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    homeData,
    allHomeImages,
    selectedDate,
    locationData,
    imageIds,
    blockedSlots,
    selectedLocData,
    allImages,
  } = useAppSelector(state => state.court);

  const [filteredCourt, setFilteredCourt] = useState([]);
  const [imageMap, setImageMap] = useState([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      dispatch(getHomeData({companyDetailID: companyDetailID}));
      dispatch(getLocationsDataNew({companyDetailID: companyDetailID}));
      dispatch(setBookingData(null));

      if (!homeData || !locationData || !blockedSlots) {
        dispatch(setLoading(true));
      }
    }
  }, [isFocus]);

  useEffect(() => {
    if (selectedDate) {
      dispatch(setLoading(true));
      getBlockedSlots(selectedDate, null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (homeData) {
      if (selectedDate) {
        const currentDate = moment()?.tz(
          homeData?.companyTimezone ?? 'Asia/Karachi',
        );
        // ?.format('YYYY-MM-DD');

        const d1 = moment(selectedDate);

        if (d1.isBefore(currentDate, 'date')) {
          dispatch(setSelectedDate(currentDate?.format('YYYY-MM-DD')));
        }
      }
    }
  }, [homeData]);

  useEffect(() => {
    if (homeData && locationData && blockedSlots) {
      dispatch(setLoading(false));
    }
  }, [homeData, locationData, blockedSlots]);

  useEffect(() => {
    if (locationData?.length) {
      if (selectedLocData) {
        let found = locationData?.findIndex(
          e => e?.locationId === selectedLocData?.locationId,
        );
        if (found === -1) {
          dispatch(setSelectedLocData(locationData[0]));
        } else {
          dispatch(setSelectedLocData(locationData[found]));
        }
      } else {
        dispatch(setSelectedLocData(locationData[0]));
      }
    }
  }, [locationData]);

  useEffect(() => {
    if (selectedLocData) {
      groupCourts();
    }
  }, [selectedLocData]);

  const getBlockedSlots = (date, id) => {
    let form = {
      courtId: id,
      date: date,
      companyDetailID: companyDetailID,
    };

    dispatch(getBlockedTimes(form));
  };

  // Group courts by `courtSportType`
  const groupCourts = () => {
    const groupedCourts = selectedLocData?.courts?.reduce((result, court) => {
      const {courtSportType} = court;

      const existingGroup = result?.find(
        group => group.name === courtSportType,
      );

      if (existingGroup) {
        existingGroup.courts.push(court);
      } else {
        result?.push({
          name: courtSportType,
          courts: [court],
        });
      }

      return result;
    }, []);

    let temp = [...groupedCourts];
    setFilteredCourt(temp);
  };

  const fetchImage = async imgId => {
    try {
      const res = await dispatch(
        getImage({
          companyDetailID: companyDetailID,
          companyImageID: imgId,
        }),
      );

      if (res?.error?.message !== 'Rejected') {
        let image = await compressImages(res?.payload?.body?.companyImage);
        return {
          ...res?.payload?.body,
          companyImage: image,
        };
      } else {
        return null; // or throw an error if needed
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (selectedLocData?.courts?.length) {
      const allThumbnailImages = [];
      const allMainPrevImages = [];

      const alreadyFetchedThumIds =
        allHomeImages?.map(img => img.companyImageId) || [];

      const alreadyFetchedMainIds =
        allImages?.map(img => img.companyImageId) || [];

      selectedLocData.courts.forEach(court => {
        const thumbnailImages = court.courtImages?.filter(
          e => e?.companyImageTypeId === CompanyImageTypeEnum?.Thumbnail,
        );
        if (thumbnailImages?.length) {
          allThumbnailImages.push(...thumbnailImages);
        }
        const MainPrevImages = court.courtImages?.filter(
          e =>
            e?.companyImageTypeId === CompanyImageTypeEnum?.Main ||
            e?.companyImageTypeId === CompanyImageTypeEnum?.Preview,
        );
        if (MainPrevImages?.length) {
          allMainPrevImages.push(...MainPrevImages);
        }
      });

      // Filter new images that are not already in Redux (allHomeImages)
      const newThumbnailImages = allThumbnailImages.filter(
        img => !alreadyFetchedThumIds.includes(img.companyImageId),
      );

      const newMainPrevImages = allMainPrevImages.filter(
        img => !alreadyFetchedMainIds.includes(img.companyImageId),
      );
      // Set existing images from Redux into imageMap
      const existingImages = allThumbnailImages
        .filter(img => alreadyFetchedThumIds.includes(img.companyImageId))
        .map(img =>
          allHomeImages.find(e => e.companyImageId === img.companyImageId),
        );

      if (existingImages.length) {
        setImageMap(existingImages); // Initial set from Redux
      }

      fetchImagesOneByOne(newThumbnailImages, newMainPrevImages);
    }
  }, [selectedLocData?.locationId]);

  const fetchImagesOneByOne = async (newThumbnailImages, newMainPrevImages) => {
    if (newThumbnailImages?.length) {
      await Promise.allSettled(
        newThumbnailImages?.map(async img => {
          try {
            const result = await fetchImage(img.companyImageId);
            if (result?.companyImageId) {
              let updatedMap;

              setImageMap(prev => {
                updatedMap = [...prev];
                const index = updatedMap.findIndex(
                  i => i.companyImageId === result.companyImageId,
                );

                if (index !== -1) {
                  updatedMap[index] = {
                    ...updatedMap[index],
                    companyImage: result.companyImage,
                  };
                } else {
                  updatedMap.push(result);
                }

                return updatedMap;
              });

              // ✅ Dispatch outside setState logic
              dispatch(setAllHomeImages(updatedMap));
            }
          } catch (error) {
            console.log(`Failed to fetch image ${img.companyImageId}`, error);
          }
        }),
      );
    }

    // if (newMainPrevImages?.length) {
    //   let newArr = [];
    //   for (const img of newMainPrevImages) {
    //     try {
    //       const result = await fetchImage(img.companyImageId);
    //       if (result?.companyImageId) {
    //         console.log(result, 'result');

    //         newArr = [...newArr, result];
    //         dispatch(setAllImages(newArr));
    //       }
    //     } catch (error) {
    //       console.log(`Failed to fetch image ${img.companyImageId}`, error);
    //     }
    //   }
    if (newMainPrevImages?.length) {
      let newArr = [];
      await Promise.allSettled(
        newMainPrevImages?.map(async img => {
          try {
            const result = await fetchImage(img.companyImageId);
            if (result?.companyImageId) {
              newArr = [...newArr, result];

              dispatch(setAllImages(newArr));
            }
          } catch (error) {
            console.log(`Failed to fetch image ${img.companyImageId}`, error);
          }
        }),
      );
    }
  };

  // useEffect(() => {
  //   if (imageMap?.length) {
  //     // Merge updated imageMap into global allImages without duplicates
  //     const mergedImages = [...allHomeImages];
  //     imageMap.forEach(newImg => {
  //       const index = mergedImages.findIndex(
  //         i => i.companyImageId === newImg.companyImageId,
  //       );
  //       if (index !== -1) {
  //         mergedImages[index] = newImg; // replace existing
  //       } else {
  //         mergedImages.push(newImg); // add new
  //       }
  //     });
  //     dispatch(setAllHomeImages(mergedImages));
  //   }
  // }, [imageMap]);

  const renderCourt = ({item}) => {
    let blockedSlotss = blockedSlots?.filter(e => e?.courtId === item?.courtId);

    let dayOfWeek; // 0 = Sunday, 1 = Monday, etc.
    let dayName;
    dayOfWeek = new Date(selectedDate).getDay();
    dayName = Object.keys(CourtDayOfWeekEnum)?.find(
      day => CourtDayOfWeekEnum[day] === dayOfWeek,
    );
    const todaySlots = item?.courtTimings?.filter(
      slot => slot.courtDayOfWeek === CourtDayOfWeekEnum[dayName],
    );
    const intervals = generateIntervals(
      todaySlots,
      item?.courtSlotDuration,
      item?.courtSlotDuration,
    );
    const processedIntervals = splitAndMarkBlockedIntervals(
      intervals,
      blockedSlotss,
    );

    const availableSlots = processedIntervals?.filter(
      slot => slot?.isBlocked === false,
    );

    const minimumSlotCharges =
      item?.courtTimings?.reduce((minSlot, currentSlot) => {
        return currentSlot?.courtCharges < minSlot?.courtCharges
          ? currentSlot
          : minSlot;
      }, item?.courtTimings[0])?.courtCharges ?? 0;

    let imgId = item?.courtImages?.find(
      e => e?.companyImageTypeId === CompanyImageTypeEnum?.Thumbnail,
    )?.companyImageId;

    let imgfound = imageMap?.find(image => imgId == image?.companyImageId);
    return (
      <TouchableOpacity
        onPress={() => {
          navigationRef.navigate('CourtDetails', {
            data: item,
            slots: [...processedIntervals],
            charges: minimumSlotCharges,
            location: selectedLocData?.locationName,
          });
        }}
        style={styles.cardStyle}>
        <View
          style={[
            styles.centerAlign,
            {
              width: '100%',
              height: moderateScale(104),
              backgroundColor: theme.colors.background,
            },
          ]}>
          {imgId || imgfound ? (
            imgfound?.companyImage ? (
              <Image
                source={{uri: imgfound?.companyImage}}
                resizeMode="cover"
                style={[styles.cardImg, styles.fullWidthHeight]}
              />
            ) : (
              <ActivityIndicator size={'small'} color={theme.colors.primary} />
            )
          ) : (
            <View
              style={[
                styles.centerAlign,
                {
                  width: '50%',
                  height: '50%',
                },
              ]}>
              <Image
                source={images.skeleton}
                resizeMode="contain"
                style={[{width: '100%', height: '100%'}]}
              />
            </View>
          )}
        </View>

        <View style={styles.paddingHS}>
          <Text style={[styles.normalBold, {color: theme.colors.darkText}]}>
            {item?.courtName}
          </Text>
          <View
            style={[
              styles.row,
              styles.justifyBetween,
              styles.paddingBXS,
              styles.borderBottom,
            ]}>
            <Text style={styles.smallTabText}>
              {availableSlots?.length} slots
            </Text>
            <Text
              style={[styles.smallTabText, {fontFamily: theme.fonts.semiBold}]}>
              {item?.courtSlotDuration} mins
            </Text>
          </View>
          {item?.courtStatusId === CourtStatusEnum?.Open ? (
            <Text style={[styles.smallTabText, styles.marginVXS]}>
              Starts From{' '}
              <Text
                style={[
                  styles.smallTabText,
                  {fontFamily: theme.fonts.semiBold},
                ]}>
                Rs. {minimumSlotCharges?.toLocaleString()}
              </Text>
            </Text>
          ) : (
            <Text
              style={[
                styles.smallTabText,
                styles.marginVXS,
                {
                  color: theme.colors.danger,
                },
              ]}>
              Under Maintenance
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const RenderCourts = useCallback(() => {
    return filteredCourt?.map((courtType, i) => {
      return (
        <View key={i}>
          <View
            style={[
              styles.row,
              styles.main,
              styles.centerAlign,
              styles.justifyBetween,
            ]}>
            <Text style={styles.regularBold}>{courtType?.name} Courts</Text>
          </View>

          <View style={styles.paddingHM}>
            <FlatList
              data={courtType?.courts}
              renderItem={renderCourt}
              keyExtractor={item => item.courtId?.toString()}
              numColumns={2}
              columnWrapperStyle={[styles.justifyBetween, {flex: 1}]}
              contentContainerStyle={styles.paddingHXS}
            />
          </View>
        </View>
      );
    });
  }, [locationData, imageMap, blockedSlots, filteredCourt]);

  const DatePickerRender = useCallback(() => {
    return (
      <Picker
        placeholder={'Select Date'}
        value={
          selectedDate ?? moment()?.tz('Asia/Karachi')?.format('YYYY-MM-DD')
        }
        icon={'calendar-text-outline'}
        type={'datePicker'}
        onSelectItem={date => {
          if (date?.dateString) {
            dispatch(setSelectedDate(date.dateString));
          }
        }}
      />
    );
  }, [selectedDate]);

  return (
    <Wrapper style={{paddingHorizontal: 0}}>
      {/* <Header title="Hello Umair" rightBtn="bell-alt" /> */}

      <ImageCarousel images={homeData?.homeBannerImages} />
      <View
        style={[
          styles.row,
          styles.centerAlign,
          styles.paddingHXS,
          styles.justifyBetween,
        ]}>
        <DatePickerRender />
        {locationData?.length > 1 && selectedLocData ? (
          <Picker
            icon={'location'}
            value={selectedLocData?.locationName}
            type={'location'}
            onSelectItem={item => {
              let data = locationData?.find(e => e?.locationName === item);

              dispatch(setSelectedLocData(data));
            }}
            list={locationData?.map(e => {
              return {id: e?.locationId, text: e?.locationName};
            })}
          />
        ) : null}

        <Button
          title="Book Now"
          leftIcon="padel"
          style={[
            styles.paddingHM,
            styles.marginRL,
            {paddingTop: moderateScale(2), paddingBottom: moderateScale(2)},
          ]}
          textStyle={styles.marginLS}
          onPress={() => {
            navigationRef.navigate('AllCourtsBooking', {
              data: selectedLocData,
            });
          }}
        />
      </View>
      {filteredCourt?.length ? <RenderCourts /> : null}
    </Wrapper>
  );
};
export default Home;
