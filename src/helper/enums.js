import {Platform} from 'react-native';

const EnvironmentEnum = {
  Staging: 'staging',
  Production: 'production',
};

const CompanyImageTypeEnum = {
  Main: 1,
  Thumbnail: 2,
  Preview: 3,
  Banner: 4,
};

const CourtStatusEnum = {
  Open: 1,
  Maintenance: 2,
};

const BookingStatusEnum = {
  Confirmed: 1,
  Cancelled: 2,
  Pending: 3,
};

const NotiIconTypes = {
  Booking: 'Booking',
  Payment: 'Payment',
  Promotion: 'Promotion',
  Reminder: 'Reminder',
  Admin: 'Admin',
};

const BookingPaymentStatusEnum = {
  Paid: 1,
  PartialPaid: 2,
  NotPaid: 3,
};

const PaymentMethodEnum = {
  PayAtVenue: 1,
  BankTransfer: 2,
  MeezanBank: 3,
  JazzCash: 4,
};

const CourtDayOfWeekEnum = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
export {
  CourtDayOfWeekEnum,
  CompanyImageTypeEnum,
  CourtStatusEnum,
  BookingStatusEnum,
  BookingPaymentStatusEnum,
  PaymentMethodEnum,
  EnvironmentEnum,
  NotiIconTypes,
};
