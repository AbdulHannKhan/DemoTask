import {CommonActions} from '@react-navigation/native';
import {Linking, PermissionsAndroid, Platform, Text} from 'react-native';
import {getCountry, getLocales} from 'react-native-localize';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import {environment} from '../config/constants';
import {EnvironmentEnum} from './enums';
import {Image} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import styles from '../GlobalStyles';
import theme from '../config/theme';
import isEqual from 'lodash.isequal';
export const goToHomeAndResetStack = (navigation, screen) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0, // Start from the first screen
      // routes: [{name: 'HomeScreen'}], // Replace with your Home screen name
      routes: [{name: screen}], // Replace with your Home screen name
    }),
  );
};

export const compareData = (prev, newData) => {
  try {
    // Only update if data is different
    if (!isEqual(prev, newData)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return true;
  }
};

export const openNativeCalendarEvent = (
  startTime,
  endTime,
  dateString,
  location,
) => {
  const date = new Date(dateString);
  // Ensure the date is in YYYY-MM-DD format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Combine date with provided time
  let startDateTime = new Date(`${year}-${month}-${day}T${startTime}`);
  let endDateTime = new Date(`${year}-${month}-${day}T${endTime}`);

  // Handle case where end time is past midnight (next day)
  if (endDateTime <= startDateTime) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  const startTimestamp = startDateTime.getTime();
  const endTimestamp = endDateTime.getTime();

  if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
    console.error('Invalid start or end time provided:', startTime, endTime);
    return;
  }

  if (Platform.OS === 'ios') {
    const startDate = new Date(dateString); // Ensure this is a proper Date object
    const unixTimestampInSeconds = Math.floor(startDate.getTime() / 1000); // Convert to seconds

    const url = `calshow:${unixTimestampInSeconds}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening calendar:', err),
    );
  } else {
    // Android - Open Google Calendar Intent with pre-filled event details
    const url =
      `https://www.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent('Padel Club Booking')}` + // Event title
      `&location=${encodeURIComponent(location)}` + // Location
      `&dates=${new Date(startTimestamp)
        .toISOString()
        .replace(/[-:.]/g, '')}/${new Date(endTimestamp)
        .toISOString()
        .replace(/[-:.]/g, '')}`;

    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Calendar:', err),
    );
  }
};

export const generateIntervals = (
  timeslots,
  intervalMinutes = 60,
  originalDuration,
) => {
  const intervals = [];
  const intervalMs = intervalMinutes * 60 * 1000; // Convert interval to milliseconds

  // Helper function to convert "HH:mm" to Date object
  function parseTime(time) {
    const [hours, minutes] = time?.split(':')?.map(Number);
    return new Date(0, 0, 0, hours, minutes);
  }

  // Helper function to format Date object to "HH:mm:ss"
  function formatTime(date) {
    return date.toTimeString().slice(0, 8);
  }

  // Generate intervals
  for (const timeslot of timeslots) {
    let current = parseTime(timeslot.courtStartTime);
    const end =
      timeslot.courtEndTime == '00:00:00'
        ? new Date(0, 0, 0, 24, 0)
        : parseTime(timeslot.courtEndTime);

    // If you divide by 30-minute intervals, the charge should be halved
    const totalCharge = timeslot.courtCharges; // Charges for the original 1-hour slot
    const chargePerInterval =
      intervalMinutes === originalDuration
        ? totalCharge
        : originalDuration === 30 && intervalMinutes !== 30
        ? totalCharge * 2
        : totalCharge / 2; // Half charge if 30 minutes, else full charge for 1 hour

    while (current < end) {
      const next = new Date(current.getTime() + intervalMs);

      intervals.push({
        ...timeslot,
        courtStartTime: formatTime(current),
        courtEndTime: formatTime(next),
        isBlocked: true, // Default to true
        courtCharges: chargePerInterval, // Set the charge for the interval (either halved or full)
      });

      current = next; // Move to the next interval
    }
  }

  return intervals;
};

export const splitAndMarkBlockedIntervals = (intervals = [], blockedTimes) => {
  // Helper function to convert "HH:mm" to Date object
  function parseTime(time) {
    const [hours, minutes] = time?.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes);
  }
  // Helper function to format Date object to "HH:mm:ss"
  function formatTime(date) {
    return date.toTimeString()?.slice(0, 8);
  }
  if (blockedTimes) {
    const result = [];

    for (const interval of intervals) {
      let {courtStartTime, courtEndTime} = interval;
      const intervalStart = parseTime(courtStartTime);
      const intervalEnd =
        courtEndTime == '00:00:00'
          ? new Date(0, 0, 0, 24, 0)
          : parseTime(courtEndTime);

      // Find overlapping blocked times
      const overlappingBlocked = blockedTimes?.filter(blocked => {
        const blockedStart = parseTime(blocked.blockedStartTime);
        const blockedEnd =
          blocked.blockedEndTime == '00:00:00'
            ? new Date(0, 0, 0, 24, 0)
            : parseTime(blocked.blockedEndTime);
        return (
          (intervalStart < blockedEnd && intervalEnd > blockedStart) || // Partial overlap
          (intervalStart >= blockedStart && intervalEnd <= blockedEnd) // Fully contained
        );
      });

      if (overlappingBlocked?.length > 0) {
        const intervalStart = parseTime(interval.courtStartTime);
        const intervalEnd =
          interval.courtEndTime === '00:00:00'
            ? new Date(0, 0, 0, 24, 0)
            : parseTime(interval.courtEndTime);

        // Step 1: Combine overlapping blocks into one overall blocked window
        let blockStart = parseTime('23:59:59');
        let blockEnd = new Date(0, 0, 0, 0, 0);

        overlappingBlocked.forEach(block => {
          const start = parseTime(block.blockedStartTime);
          const end =
            block.blockedEndTime === '00:00:00'
              ? new Date(0, 0, 0, 24, 0)
              : parseTime(block.blockedEndTime);

          if (start < blockStart) blockStart = start;
          if (end > blockEnd) blockEnd = end;
        });

        const fullyCovered =
          intervalStart >= blockStart && intervalEnd <= blockEnd;

        if (fullyCovered) {
          result?.push({
            ...interval,
            isBlocked: true,
          });
        } else if (intervalStart < blockStart) {
          const slotDuration = (blockStart - intervalStart) / (60 * 1000); // Convert milliseconds to minutes

          if (slotDuration >= 30) {
            let wastedBlock = new Date(intervalStart);
            wastedBlock.setMinutes(intervalStart.getMinutes() + 30);

            result?.push({
              ...interval,
              courtStartTime: formatTime(intervalStart),
              courtEndTime: formatTime(wastedBlock),
              courtCharges: interval?.courtCharges / 2,
              isBlocked: false,
            });

            result?.push({
              ...interval,
              courtStartTime: formatTime(wastedBlock),
              courtCharges: interval?.courtCharges / 2,
              courtEndTime: formatTime(intervalEnd),
            });
          } else {
            result?.push({
              ...interval,
            });
          }
        } else if (blockEnd < intervalEnd) {
          const slotDuration = (intervalEnd - blockEnd) / (60 * 1000);

          if (slotDuration >= 30) {
            let wastedBlock = new Date(intervalStart);
            wastedBlock.setMinutes(intervalStart.getMinutes() + 30);

            result?.push({
              ...interval,
              courtStartTime: formatTime(intervalStart),
              courtEndTime: formatTime(wastedBlock),
              courtCharges: interval?.courtCharges / 2,
            });

            result?.push({
              ...interval,
              courtStartTime: formatTime(wastedBlock),
              courtEndTime: formatTime(intervalEnd),
              courtCharges: interval?.courtCharges / 2,
              isBlocked: false,
            });
          } else {
            result?.push({
              ...interval,
            });
          }
        } else {
          result?.push({
            ...interval,
          });
        }
      } else {
        result?.push({
          ...interval,
          isBlocked: false,
        });
      }
    }
    return result;
  } else {
    return intervals;
  }
};

export const processLocations = async locations => {
  return await Promise.all(
    locations?.map(async location => ({
      ...location,
      courts: await Promise.all(
        location?.courts?.map(async court => {
          // Compress images and ensure they match index

          let compressedImages = await Promise.all(
            court?.courtImages?.map(async data => {
              return {
                ...data,
                companyImage: await compressImages(data?.companyImage, 0.9),
              };
            }),
          );

          return {
            ...court,
            courtImages: compressedImages, // Ensure updated images are used
          };
        }),
      ),
    })),
  );
};

export const compressImages = async (base64Image, quality = 0.5) => {
  if (!base64Image) return;
  try {
    // Step 1: Save Base64 as a temporary file
    const path = `${RNFS.CachesDirectoryPath}/image_${Math.random()}.png`;
    await RNFS.writeFile(
      path,
      base64Image.replace('data:image/png;base64,', ''),
      'base64',
    );
    // Step 2: Compress the image file
    const compressedUri = await Image.compress(path, {quality});
    // Step 3: Convert compressed image back to Base64
    const compressedBase64 = await RNFS.readFile(compressedUri, 'base64');
    await RNFS.unlink(path);

    return `data:image/png;base64,${compressedBase64}`;
  } catch (error) {
    console.error('Error compressing images:', error);
  }
};

export const convertToAMPM = time => {
  const [hours, minutes] = time?.split(':');
  const hour = parseInt(hours, 10);
  const isPM = hour >= 12;
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  const ampm = isPM ? 'PM' : 'AM';
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const getDateRangeWithDay = (inputDate, today) => {
  const [year, month, day] = inputDate?.split('-').map(Number);

  const baseDate = new Date(year, month - 1, day);

  if (baseDate <= today) {
    return [
      baseDate,
      new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate() + 1,
      ),
      new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate() + 2,
      ),
    ].map(date => ({
      date: date.toLocaleDateString('en-GB'),
      day: date
        .toLocaleDateString('en-US', {weekday: 'short'})
        ?.substring(0, 3),
    }));
  } else {
    return [
      new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate() - 1,
      ),
      baseDate,
      new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate() + 1,
      ),
    ].map(date => ({
      date: date.toLocaleDateString('en-GB'),
      day: date
        .toLocaleDateString('en-US', {weekday: 'short'})
        ?.substring(0, 3),
    }));
  }
};
export const addUniqueProducts = (firstArray, secondArray) => {
  secondArray = secondArray || [];
  firstArray?.forEach(product1 => {
    const existingProductIndex = secondArray?.findIndex(
      product2 => product2?.productId === product1?.productId,
    );

    if (existingProductIndex !== -1) {
      secondArray = secondArray?.map((product2, i) =>
        i === existingProductIndex
          ? {...product2, quantity: product2.quantity + product1.quantity}
          : product2,
      );
    } else {
      secondArray?.push(product1);
    }
  });

  return secondArray;
};

export const areProductsMatching = (products1, products2) => {
  // Check if lengths of both arrays are the same
  if (products1.length !== products2.length) {
    return false;
  }

  // Create a map for quick lookup of productId and quantity from one array
  const productMap1 = new Map();
  products1.forEach(product => {
    productMap1.set(product.productId, product.quantity);
  });

  // Compare the productId and quantity for each product in the second array
  for (const product of products2) {
    const quantityInProducts1 = productMap1.get(product.productId);

    // Check if the productId exists and the quantities match
    if (
      quantityInProducts1 === undefined ||
      quantityInProducts1 !== product.quantity
    ) {
      return false;
    }
  }

  return true; // All productId and quantity pairs match
};

export const checkFilePermissions = async ({t}) => {
  if (Platform.OS === 'android') {
    if (Platform.Version <= 28) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        Toast.show({
          type: 'error',
          text1: t('PLEASE_ALLOW_STORAGE_PERMISSIONS_TO_GENERATE_PDF'),
        });

        return false;
      }
    }
  } else if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);

    if (result !== RESULTS.GRANTED) {
      Toast.show({
        type: 'error',
        text1: t('PLEASE_ALLOW_STORAGE_PERMISSIONS_TO_GENERATE_PDF'),
      });
      return false;
    }
  }

  return true;
};

export const getLocal = () => {
  const locales = getLocales();
  const l = getCountry();

  return locales[0]?.countryCode;
};

export const getUserLocale = () => {
  if (environment === EnvironmentEnum.Production) {
    const locales = getLocales();

    if (Array.isArray(locales) && locales.length > 0) {
      return locales[0].languageTag; // e.g., "en-US"
    }
  }

  return 'en-US'; // Fallback
};

export const parseBoldText = (text, style) => {
  const parts = text?.split(/(<b>.*?<\/b>)/g); // Split at <b>...</b> tags

  return parts.map((part, index) => {
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      return (
        <Text
          key={index}
          style={[styles.smallTabText, style, {fontFamily: theme.fonts.bold}]}>
          {part.replace(/<\/?b>/g, '')} {/* Remove <b> and </b> */}
        </Text>
      );
    }
    return (
      <Text key={index} style={[styles.smallTabText, style]}>
        {part} {/* Remove <b> and </b> */}
      </Text>
    );
  });
};

export const linkTest = () => {
  const packageName = 'com.pospey.qp';
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
  const appId = '6736383778';
  const appStoreUrl = `https://apps.apple.com/app/id${appId}`;
  if (Platform.OS === 'ios') {
    Linking.openURL(appStoreUrl);
  } else {
    Linking.openURL(playStoreUrl);
  }
};

export const checkBluetoothPermissions = async ({t}) => {
  if (Platform.OS === 'android') {
    if (Platform.Version <= 30) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Bluetooth',
          message: 'Allow Access for Bluetooth',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show({
          type: 'error',
          text1: t('PLEASE_ALLOW_BLUETOOTH_PERMISSIONS_FOR_THERMAL'),
        });

        return false;
      }
    } else {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        Toast.show({
          type: 'error',
          text1: t('PLEASE_ALLOW_BLUETOOTH_PERMISSIONS_FOR_THERMAL'),
        });

        return false;
      }
    }
  }

  return true;
};

export const isPng = uri => {
  if (uri) {
    const fileExtension = uri?.split('.')?.pop(); // Get the file extension
    return fileExtension.toLowerCase() === 'png';
  }
  return false;
};
