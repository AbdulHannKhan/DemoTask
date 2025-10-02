import {environment} from '../config/constants';
import {EnvironmentEnum} from '../helper/enums';

export const BASE_URL =
  environment === EnvironmentEnum.Staging
    ? 'https://courtbooking-staging.qplnk.com/api/'
    : 'https://courtbooking.qplnk.com/api/';

export const API = {
  LOGIN: `auth/login`,
  SIGNUP: `auth/signup-user`,
  OTP_VERIFY: `auth/verify-otp`,
  FORGOT_PASSWORD: `auth/forgot-password`,
  GENERATE_OTP_FORGET: `auth/generate-otp-forgot`,
  GENERATE_OTP_SIGNUP: `auth/generate-otp-signup`,
  LOGOUT: `auth/logout`,
  GET_HOME_DATA: `auth/get-home-data`,
  GET_BLOCKED_TIMES: `booking/get-blocked-times`,
  GET_LOCATIONS: `location/get-locations`,
  GET_LOCATIONS_NEW: `location/get-locations-new`,
  VALIDATE_COUPON: `booking/validate-coupon`,
  ADD_BOOKING: `booking/add-booking`,
  GET_BOOKING: `booking/get-bookings`,
  GET_NOTIFICATIONS: `notification/get-notifications`,
  DELETE_ACCOUNT: `profile/delete-account`,
  SUBMIT_SURVEY: `survey/submit-survey-response`,
  UPDATE_PROFILE: `profile/update-profile`,
  GET_IMAGE: `image/get-image`,
};
export default API;
