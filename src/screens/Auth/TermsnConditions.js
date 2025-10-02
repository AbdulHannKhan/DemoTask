import moment from 'moment-timezone';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import BackButton from '../../components/BackButton';
import Icon from '../../components/Icon';
import theme from '../../config/theme';
import styles from '../../GlobalStyles';
import {navigationRef} from '../../navigation';

const TermsnConditions = ({}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.termsView}>
          <BackButton
            borderHide={true}
            title="Terms and Conditions"
            onPress={() => navigationRef.goBack()}
          />
          <View
            style={[
              styles.row,
              styles.borderContainer,
              styles.marginBS,
              {backgroundColor: theme.colors.surface},
            ]}>
            <View style={styles.centerAlign}>
              <Icon
                name={'file-edit-outline'}
                size={moderateScale(24)}
                color={theme.colors.primary}
              />
            </View>
            <View style={[styles.paddingVS, styles.marginLS]}>
              <Text style={[styles.regularBold]}>Terms Of Services</Text>
              <Text
                style={[styles.smallTabText, {color: theme.colors.greyText}]}>
                Last Updated on {moment(new Date('2025-02-06')).format('LL')}
              </Text>
            </View>
          </View>

          {data.map((e, i) => {
            return (
              <>
                <View style={[styles.row]}>
                  <Icon
                    name={'dot-fill'}
                    size={moderateScale(16)}
                    color={theme.colors.darkText}
                    type={'Octicons'}
                    style={{marginTop: moderateScale(7), width: '5%'}}
                  />
                  <Text
                    style={[
                      styles.regularBold,
                      {
                        width: '90%',
                        marginLeft: moderateScale(5),
                      },
                    ]}>
                    {e.title}
                  </Text>
                </View>

                <Text style={[styles.normalSmall]}>{e.text}</Text>
              </>
            );
          })}
        </View>

        {/* <View style={[{alignItems: 'center', marginBottom: moderateScale(20)}]}>
          <Button
            onPress={() => {
              onButtonPress(true);
            }}
            title={'Accept and Continue'}
            textStyle={{fontSize:theme.fontSizes.regular}}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default TermsnConditions;
const data = [
  {
    title: 'App Access and Use',
    text: `(a) Eligibility\nBy signing up and using the Padel Club App, you represent and warrant that you are a player, manager, or administrator using the app for booking and managing padel court sessions.\n\n(b) License Grant\nSubject to your compliance with these terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the App solely for booking padel courts, managing reservations, and tracking game statistics.\n\n(c) Account Registration\nTo access certain features of the App, you must create an account. You agree to provide accurate, complete, and up-to-date information during the registration process and keep your login credentials secure. You are solely responsible for all activities under your account.\n\n(d) Booking and Confirmation\nUsers can select a time slot for their booking request, which will be sent to the admin for approval. The admin will confirm the booking after contacting the user and receiving payment. The user acknowledges that their booking is not finalized until the admin confirms it.\n\n(e) Compliance with Laws\nYou agree to comply with all applicable laws, rules, and regulations related to padel club management, user data privacy, and online payments.\n\n(f) Prohibited Activities\nYou shall not use the App for any unlawful, fraudulent, or malicious purposes, including but not limited to unauthorized access, data breaches, or manipulation of booking records. Any such activity may lead to account suspension or termination.`,
  },
  {
    title: 'Intellectual Property',
    text: `(a) Ownership\nThe App and all associated intellectual property rights remain the exclusive property of Padel Club. This Agreement does not grant you any ownership rights beyond the limited license to use the App.\n\n(b) Feedback\nIf you provide suggestions, ideas, or feedback regarding the App, you grant Padel Club a non-exclusive, royalty-free, perpetual, irrevocable, and worldwide license to use, modify, and implement such feedback.`,
  },
  {
    title: 'Data Privacy and Security',
    text: `(a) Data Collection and Use\nBy using the Padel Club App, you acknowledge and agree that we may collect and store your personal information and booking data in accordance with our Privacy Policy.\n\n(b) Security\nWe take reasonable steps to protect your data, but you acknowledge that no system is completely secure. We are not liable for any unauthorized access, loss, or modification of data.`,
  },
  {
    title: 'Payment and Refunds',
    text: `(a) Payment Process\nPayments for court bookings must be completed before confirmation. The admin will verify and confirm the booking after receiving payment.\n\n(b) Refund Policy\nOnce your booking is confirmed and payment has been received, refund requests must be made at least 24 hours before the booking's start time. After this period, no refunds will be issued.`,
  },
  {
    title: 'Termination',
    text: `(a) Termination by User\nUsers may discontinue using the App at any time. Non-renewal of a subscription will result in account deactivation.\n\n(b) Termination by Admin\nIf a user engages in fraudulent activities, misrepresents information, or violates these terms, their account may be suspended or permanently terminated.`,
  },
  {
    title: 'Indemnification',
    text: `You agree to indemnify and hold harmless Padel Club, its affiliates, officers, employees, and agents from any claims, damages, or losses arising from your use of the App or violation of these Terms and Conditions.`,
  },
  {
    title: 'Governing Law and Dispute Resolution',
    text: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction where the Padel Club operates.`,
  },
  {
    title: 'Amendments',
    text: `We reserve the right to modify or update these Terms and Conditions at any time. Your continued use of the App after such modifications constitutes your acceptance of the updated terms.`,
  },
];
