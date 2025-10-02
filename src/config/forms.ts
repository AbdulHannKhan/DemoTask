import {Formik} from 'formik';
import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Incorrect Email').required(),
  password: yup.string().required('Password is required'),
  version: yup.string().required('version is required'),
  deviceToken: yup.string(),
  companyDetailID: yup.number().required(),
});

