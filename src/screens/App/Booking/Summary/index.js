import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Share,
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  convertToAMPM,
  goToHomeAndResetStack,
} from '../../../../helper/functions';
import theme from '../../../../config/theme';
import styles from '../../../../GlobalStyles';
import Icon from '../../../../components/Icon';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {height} from '../../../../config/constants';
import {navigationRef} from '../../../../navigation';
import Wrapper from '../../../../components/wrapper';
import {moderateScale} from 'react-native-size-matters';
import {PaymentMethodEnum} from '../../../../helper/enums';
import BackButton from '../../../../components/BackButton';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {addBooking, validateCoupon} from '../../../../store/courtSlice';
import BookingConfirmationModal from '../../../../components/BookingModal';

const Summary = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {bookingData, selectedDate} = useAppSelector(state => state.court);
  const {userData} = useAppSelector(state => state.onBoarding);

  const [coupon, setCoupon] = useState('');
  const [slotss, setSlotss] = useState(bookingData?.slots);
  const [modalVisible, setModalVisible] = useState(false);
  const [discountTotal, setDiscountTotal] = useState(0);

  const parsedDate = moment(selectedDate)?.format('YYYY-MM-DD');
  const parsedDate1 = moment(selectedDate)?.format('dddd DD MMMM');

  const applyCoupon = () => {
    let form = {
      couponCode: coupon,
      bookingDate: parsedDate,
      bookingTimes: bookingData?.slots,
      courtId: bookingData?.data?.courtId,
    };
    dispatch(validateCoupon(form)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        applyCouponDiscount(res?.payload?.body?.couponTimes);
      }
    });
  };

  useEffect(() => {
    sortAndCombine();
  }, []);

  const applyCouponDiscount = couponTimes => {
    const timeToMinutes = time => {
      const [hours, minutes] = time?.split(':').map(Number);
      return hours * 60 + minutes;
    };

    // Step 1: Filter out valid coupons
    const validCoupons = couponTimes?.filter(coupon => coupon.isValid);

    // Step 2: Check which slots match a valid coupon
    const updatedSlots = bookingData?.slots?.map(slot => {
      const slotStart = timeToMinutes(slot.bookingStartTime);
      const slotEnd = timeToMinutes(slot.bookingEndTime);

      const matchingCoupon = validCoupons.find(coupon => {
        const couponStart = timeToMinutes(coupon.bookingStartTime);
        const couponEnd = timeToMinutes(coupon.bookingEndTime);

        // Check if there is any overlap
        return couponStart < slotEnd && couponEnd > slotStart;
      });

      if (matchingCoupon) {
        const couponStart = timeToMinutes(matchingCoupon.bookingStartTime);
        const couponEnd = timeToMinutes(matchingCoupon.bookingEndTime);

        // Calculate overlap duration
        const applicableStart = Math.max(slotStart, couponStart);
        const applicableEnd = Math.min(slotEnd, couponEnd);
        const applicableDuration = applicableEnd - applicableStart;

        if (matchingCoupon?.discountAmount) {
          return {
            ...slot,
            discountAmount:
              (applicableDuration / bookingData?.duration) *
              matchingCoupon?.discountAmount,
          };
        } else if (matchingCoupon?.discountPercentage) {
          return {
            ...slot,
            discountAmount:
              slot?.courtCharges * (matchingCoupon?.discountPercentage / 100),
          };
        } else {
          return {...slot};
        }
      }
    });
    const totalDiscount = updatedSlots?.reduce(
      (sum, slot) => sum + slot?.discountAmount,
      0,
    );
    setDiscountTotal(totalDiscount);
  };

  const sortAndCombine = () => {
    // Step 1: Sort slots by bookingStartTime
    let temp = bookingData?.slots?.map(slot => ({...slot}));
    temp?.sort((a, b) => a.bookingStartTime.localeCompare(b.bookingStartTime));

    // Step 2: Merge adjacent slots if they have the same courtCharges
    const mergedBookings = [];

    for (let i = 0; i < temp?.length; i++) {
      if (mergedBookings?.length > 0) {
        let last = mergedBookings[mergedBookings?.length - 1];

        // Merge only if last.endTime == current.startTime & same original charges
        if (
          last.bookingEndTime === temp[i]?.bookingStartTime &&
          last.originalCourtCharges === temp[i]?.courtCharges // Ensure consistency
        ) {
          last.bookingEndTime = temp[i]?.bookingEndTime; // Extend last slot
          last.courtCharges += temp[i]?.courtCharges; // Accumulate charges
          continue;
        }
      }

      // Push a new slot with an originalCourtCharges reference
      mergedBookings.push({
        ...temp[i],
        originalCourtCharges: temp[i].courtCharges, // Preserve original for checking
      });
    }

    // Remove the helper field before setting state
    setSlotss(mergedBookings?.map(({originalCourtCharges, ...rest}) => rest));
  };

  const handleAddBooking = () => {
    let form = {
      courtId: bookingData?.data?.courtId,
      paymentMethodId: PaymentMethodEnum.PayAtVenue,
      couponCode: coupon,
      teamLevel: 0,
      teamTypeId: null,
      bookingDate: parsedDate,
      bookingTimes: bookingData?.slots?.map(e => {
        return {
          bookingStartTime: e?.bookingStartTime,
          bookingEndTime: e?.bookingEndTime,
        };
      }),
      collectedAmount: 0,
    };
    console.log(form);
    dispatch(addBooking(form)).then(res => {
      if (res?.error?.message !== 'Rejected') {
        setModalVisible(true);
      }
    });
  };

  const shareInfo = async () => {
    try {
      const result = await Share.share({
        message: `Hey! I just booked a padel court at ${
          userData?.companyName
        } on ${parsedDate1} at \n${slotss?.map(e => {
          return `${e?.bookingStartTime} - ${e?.bookingEndTime}`;
        })} on ${
          bookingData?.data?.courtName
        }. 🏓🔥 Let’s team up and have an exciting game! See you on the court!`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const openNativeCalendar = selectedDate => {
    const eventDate = new selectedDate(); // Ensure it's a selectedDate object
    // const formattedDate = eventDate.toISOString(); // Convert to standard format

    if (Platform.OS === 'ios') {
      // iOS - Use the calendar URL scheme
      const url = `calshow:${eventDate.getTime() / 1000}`; // Convert to Unix timestamp in seconds
      Linking.openURL(url).catch(err =>
        console.error('Error opening calendar:', err),
      );
    } else {
      // Android - Use Google Calendar Intent
      const url = `content://com.android.calendar/time/${eventDate.getTime()}`;
      Linking.openURL(url).catch(err =>
        console.error('Error opening calendar:', err),
      );
    }
  };

  const calculateTotalCharges = bookings => {
    return bookingData?.slots?.reduce(
      (total, booking) => total + booking.courtCharges,
      0,
    );
  };

  return (
    <View style={[styles.main, {paddingHorizontal: 0}]}>
      <BackButton
        onPress={() => navigationRef.goBack()}
        title="Booking"
        style={[styles.paddingHL, styles.paddingVM, styles.headerBorder]}
      />
      <Wrapper style={{paddingBottom: moderateScale(50)}}>
        <View
          style={[
            styles.row,
            styles.centerAlign,
            {justifyContent: 'flex-start'},
          ]}>
          <Icon
            name={'calendar'}
            size={moderateScale(47)}
            color={theme.colors.primary}
          />
          <View style={[styles.marginLM]}>
            <Text style={[styles.regularBold]}>Booking Summary</Text>
            <Text style={[styles.smallTabText, {color: theme.colors.darkGrey}]}>
              {bookingData?.data?.courtName}
            </Text>
            <Text style={[styles.smallTabText, {color: theme.colors.darkGrey}]}>
              {parsedDate1}
            </Text>
          </View>
        </View>

        <View style={[styles.borderBottom, styles.marginVS]} />

        <Text style={[styles.regularBold, styles.paddingBS]}>
          Court Charges
        </Text>
        <View style={[{maxHeight: height * 0.25}]}>
          <ScrollView>
            {slotss?.map(slot => {
              return (
                <View
                  style={[styles.row, styles.justifyBetween, styles.marginBS]}>
                  <Text style={[styles.normalSmall]}>
                    {convertToAMPM(slot?.bookingStartTime)} -{' '}
                    {convertToAMPM(slot?.bookingEndTime)}
                  </Text>
                  <Text style={[styles.normalSmall]}>
                    Rs. {slot?.courtCharges?.toLocaleString()}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={[styles.borderBottom, styles.marginVXS]} />

        {discountTotal ? (
          <View style={[styles.row, styles.justifyBetween]}>
            <Text style={[styles.normalSmall]}>Sub Total</Text>
            <Text style={[styles.normalSmall]}>
              Rs. {calculateTotalCharges()?.toLocaleString()}
            </Text>
          </View>
        ) : null}

        {discountTotal ? (
          <View
            style={[
              styles.row,
              styles.centerAlign,
              styles.justifyBetween,
              styles.marginVXS,
            ]}>
            <View style={[styles.row, styles.centerAlign]}>
              <Text
                style={[
                  styles.normalSmall,
                  {
                    color: theme.colors.primary,
                  },
                ]}>
                {coupon} (Coupon Code)
                {'   '}
              </Text>

              <TouchableOpacity
                style={styles.marginTXS}
                onPress={() => {
                  setCoupon('');
                  setDiscountTotal(0);
                }}>
                <Icon
                  name={'closecircleo'}
                  color={theme.colors.red}
                  size={moderateScale(16)}
                  type="AntDesign"
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.normalSmall]}>
              (Rs. {discountTotal?.toLocaleString()})
            </Text>
          </View>
        ) : null}

        <View style={[styles.row, styles.justifyBetween]}>
          <Text style={[styles.regularBold]}>Total</Text>

          <Text style={[styles.regularBold]}>
            Rs. {(calculateTotalCharges() - discountTotal).toLocaleString()}
          </Text>
        </View>
        {discountTotal === 0 ? (
          <>
            <Text style={[styles.regularBold, styles.marginVS]}>
              Apply Coupon Code
            </Text>

            <View
              style={[
                styles.row,
                styles.centerAlign,
                styles.justifyBetween,
                {width: '100%', marginTop: -moderateScale(20)},
              ]}>
              <Input
                labelValue={coupon}
                onChangeText={code => setCoupon(code)}
                placeholder="Coupon Code (If Any)"
                customStyle={{width: '72%'}}
                inputStyle={[styles.inputBorder]}
                textStyle
              />

              <Button
                disable={coupon == ''}
                title="Apply"
                onPress={applyCoupon}
                style={{width: '25%'}}
                textStyle={[styles.normalBold, {color: theme.colors.surface}]}
              />
            </View>
          </>
        ) : null}
      </Wrapper>

      <Button
        title="Book Now"
        onPress={handleAddBooking}
        style={styles.buttonOver}
      />

      <BookingConfirmationModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          goToHomeAndResetStack(navigation, 'HomeScreen');
        }}
        onShare={shareInfo}
        onAddToCalendar={openNativeCalendar}
      />
    </View>
  );
};

export default Summary;
