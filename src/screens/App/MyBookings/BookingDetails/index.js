import moment from 'moment';
import React from 'react';
import {ScrollView, Share, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import styles from '../../../../GlobalStyles';
import BackButton from '../../../../components/BackButton';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import Wrapper from '../../../../components/wrapper';
import {height} from '../../../../config/constants';
import theme from '../../../../config/theme';
import {BookingStatusEnum} from '../../../../helper/enums';
import {
  convertToAMPM,
  openNativeCalendarEvent,
} from '../../../../helper/functions';
import {navigationRef} from '../../../../navigation';
import {useAppSelector} from '../../../../store/hooks';

const BookingDetails = ({route}) => {
  const {data} = route?.params;
  const fromPrevious = route?.params?.from === 'previous';
  const {userData} = useAppSelector(state => state.onBoarding);

  const parsedDate = new Date(data?.bookingDate);

  const shareInfo = async () => {
    let formattedDate = moment(data?.bookingDate).format('dddd DD MMMM');
    try {
      // await Share.share({
      //   message: `Hey! I just booked a padel court at ${
      //     userData?.companyName
      //   } on ${formattedDate} at \n${data?.bookingBreakdowns?.map(e => {
      //     return `${convertToAMPM(e?.bookingStartTime)} - ${convertToAMPM(
      //       e?.bookingEndTime,
      //     )}`;
      //   })} on ${
      //     data?.courtName
      //   }🏓🔥. \n\nLet’s team up and have an exciting game! \n\nSee you on the court!`,
      // });

      await Share.share({
        message: `Hey! I just booked a padel court at ${
          userData?.companyName
        } on ${formattedDate} at ${`${convertToAMPM(
          data?.bookingStartTime,
        )} - ${convertToAMPM(data?.bookingEndTime)}`} on ${
          data?.courtName
        }🏓🔥. \n\nLet’s team up and have an exciting game! \n\nSee you on the court!`,
      });
    } catch (error) {
      if (error?.message) {
        Toast.show({
          type: 'error',
          text1: error?.message,
        });
      }
    }
  };
  const [s, ref, no] = data?.bookingNo?.split('-');
  return (
    <View style={[styles.main, {paddingHorizontal: 0}]}>
      <BackButton
        onPress={() => navigationRef.goBack()}
        title="Booking Summary"
        style={[styles.paddingHL, styles.paddingVM, styles.headerBorder]}
      />
      <Wrapper
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={[
              styles.row,
              styles.centerAlign,
              {justifyContent: 'space-between', width: '100%'},
            ]}>
            <View style={{width: '18%'}}>
              <Icon
                name={'calendar'}
                size={moderateScale(47)}
                color={theme.colors.primary}
              />
            </View>
            <View style={[{width: '82%'}]}>
              <View
                style={[styles.row, styles.centerAlign, styles.justifyBetween]}>
                <Text style={[styles.regularBold]}>{`${ref}-${no}`}</Text>
                <Text
                  style={[
                    styles.normalSmall,
                    {
                      color:
                        data?.bookingStatusId === BookingStatusEnum.Cancelled ||
                        data?.bookingStatusId === BookingStatusEnum.Pending
                          ? theme.colors.red
                          : theme.colors.success,
                    },
                  ]}>
                  {fromPrevious
                    ? data?.bookingStatusId === BookingStatusEnum.Cancelled ||
                      data?.bookingStatusId === BookingStatusEnum.Pending
                      ? 'Booking Cancelled'
                      : 'Booking Confirmed'
                    : data?.bookingStatusId === BookingStatusEnum.Cancelled
                    ? 'Booking Cancelled'
                    : data?.bookingStatusId === BookingStatusEnum.Pending
                    ? 'Reservation Pending'
                    : 'Booking Confirmed'}
                </Text>
              </View>
              <Text
                style={[styles.smallTabText, {color: theme.colors.darkGrey}]}>
                {data?.courtName}
              </Text>
              <Text
                style={[styles.smallTabText, {color: theme.colors.darkGrey}]}>
                {parsedDate?.toDateString()}
              </Text>
            </View>
          </View>

          <View style={[styles.borderBottom, styles.marginVS]} />

          <Text style={[styles.regularBold, styles.paddingBS]}>
            Court Charges
          </Text>
          <View style={[{maxHeight: height * 0.25}]}>
            <ScrollView>
              {data?.bookingBreakdowns?.map(slot => {
                return (
                  <View
                    style={[
                      styles.row,
                      styles.justifyBetween,
                      styles.marginBS,
                    ]}>
                    <Text style={[styles.normalSmall]}>
                      {convertToAMPM(slot?.bookingStartTime)} -{' '}
                      {convertToAMPM(slot?.bookingEndTime)}
                    </Text>
                    <Text style={[styles.normalSmall]}>
                      Rs. {slot?.charges?.toLocaleString()}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={[styles.borderBottom, styles.marginVXS]} />
          {data?.couponCode ? (
            <Text style={[styles.normalSmall, {color: theme.colors.primary}]}>
              {data?.couponCode} (Coupon Code Availed)
            </Text>
          ) : null}

          {data?.bookingDiscountAmount ? (
            <>
              <View style={[styles.row, styles.justifyBetween]}>
                <Text style={[styles.normalSmall]}>Sub Total</Text>
                <Text style={[styles.normalSmall]}>
                  Rs. {data?.bookingGrossAmount?.toLocaleString()}
                </Text>
              </View>
              <View style={[styles.row, styles.justifyBetween]}>
                <Text style={[styles.normalSmall]}>Discount</Text>
                <Text style={[styles.normalSmall]}>
                  Rs. {data?.bookingDiscountAmount?.toLocaleString()}
                </Text>
              </View>
            </>
          ) : null}

          <View style={[styles.row, styles.justifyBetween]}>
            <Text style={[styles.regularBold]}>Total</Text>

            <Text style={[styles.regularBold]}>
              Rs. {data?.bookingNetAmount?.toLocaleString()}
            </Text>
          </View>
        </View>

        {data?.bookingStatusId === BookingStatusEnum.Confirmed ? (
          <View
            style={[
              {width: '100%'},
              styles.row,
              styles.centerAlign,
              styles.justifyBetween,
            ]}>
            <Button
              title="Add to Calendar"
              onPress={() => {
                openNativeCalendarEvent(
                  data?.bookingStartTime,
                  data?.bookingEndTime,
                  data?.bookingDate,
                  data?.locationAddress ?? data?.locationName,
                );
              }}
              style={[styles.marginVXS, {width: '45%'}]}
              textStyle={[styles.normalBold, {color: theme.colors.surface}]}
            />

            <Button
              title="Share Booking Info"
              onPress={() => shareInfo()}
              style={[styles.marginVXS, {width: '52%'}]}
              textStyle={[styles.normalBold, {color: theme.colors.surface}]}
            />
          </View>
        ) : null}
      </Wrapper>

      <Button
        title="Back"
        onPress={() => navigationRef?.goBack()}
        style={[
          {width: '90%', alignSelf: 'center'},
          styles.marginVXS,
          styles.whiteBtn,
        ]}
        textStyle={[{color: theme.colors.primary}]}
      />
    </View>
  );
};

export default BookingDetails;
