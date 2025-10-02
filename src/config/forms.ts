import {Formik} from 'formik';
import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Incorrect Email').required(),
  password: yup.string().required('Password is required'),
  version: yup.string().required('version is required'),
  deviceToken: yup.string(),
  companyDetailID: yup.number().required(),
});

export const SignUpSchema = yup.object().shape({
  name: yup.string().required(),
  countryCode: yup.string().required(),
  cellNumber: yup.string().required(),
  email: yup.string().email('Incorrect Email').required(),
  password: yup.string().required('Password is required'),
  tnC: yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
});

export const VerifyPhoneSchema = yup.object().shape({
  companyDetailID: yup.number().required(),
  email: yup.string().email('Incorrect Email').required(),
});

export const ResetPassSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
});

export const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const ProfileSchema = yup.object().shape({
  name: yup.string().required(),
  countryCode: yup.string(),
  cellNumber: yup.string(),
  password: yup.string(),
});
