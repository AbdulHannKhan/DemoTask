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
// import {setRouteFlag} from '../../redux/actions';

const PrivacyPolicy = ({navigation, route}) => {
  const {t} = useTranslation();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
          }}>
          <BackButton
            title="Privacy Policy"
            borderHide={true}
            onPress={() => navigationRef.goBack()}
            // RightComp={LanguageDropdown}
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
              <Text style={[styles.regularBold]}>Privacy Policy</Text>
              <Text
                style={[styles.smallTabText, {color: theme.colors.greyText}]}>
                Last Updated on {moment(new Date('2025-02-06')).format('LL')}
              </Text>
            </View>
          </View>
          <Text style={[styles.normalSmall, styles.marginBM]}>
            "Padel Club" is a product of Quantum Paradigm Private) Limited, a
            company incorporated under the applicable laws of Pakistan ("we",
            "us", "our" or "Company"). The domain name [your domain name], is
            exclusively owned by us.
            {'\n\n'}
            We respect your privacy and value the trust you place in us. Set out
            below is our 'Privacy Policy' which details the manner in which
            information relating to you is collected, used and disclosed by us.
            All visitors to any of our Platform, including visiting our website
            [your Website name] or signing in at our application by the name of
            Padel Club (collectively referred to as 'Platform') are advised to
            carefully read and understand our Privacy Policy ("Policy"), as by
            accessing the Platform, you agree to be bound by the terms and
            conditions of this Policy and consent to the collection, storage and
            use of information relating to you.
            {'\n\n'}
            There are many different ways you can use our services. When you
            share information with us on any of our Platform we aim to make
            those services even better, for example showing you more relevant
            search results and ads, to help you connect with people, or to make
            your experience on the Platform worthwhile. We want you to be clear
            how we are using information and the ways in which you can protect
            your privacy.
            {'\n\n'}
            We have created this Policy in order to demonstrate our firm
            commitment to helping you better understand what information we
            collect about you and what may happen to that information. This
            Policy applies solely to information collected while visiting our
            Platform. By using or accessing our Platform, you signify your
            assent and consent to our Policy. If you do not agree to this
            Policy, you will not be allowed to access or otherwise use the Site.
            {'\n'}
            Our Policy explains:{'\n'}
            {'\n'}{' '}
            <Icon
              name={'dot-fill'}
              size={moderateScale(10)}
              color={theme.colors.darkText}
              type={'Octicons'}
            />{' '}
            What information we collect and why we collect it?
            {'\n'}{' '}
            <Icon
              name={'dot-fill'}
              size={moderateScale(10)}
              color={theme.colors.darkText}
              type={'Octicons'}
            />{' '}
            How we use that information?
            {'\n'}{' '}
            <Icon
              name={'dot-fill'}
              size={moderateScale(10)}
              color={theme.colors.darkText}
              type={'Octicons'}
            />{' '}
            The choices we offer, including how to access and update
            information.
            {'\n\n'}
            We have tried to keep it as simple as possible, but if you're not
            familiar with terms like cookies, IP addresses, pixel tags and
            browsers, you are advised to read about
          </Text>
          {data.map((e, i) => {
            return (
              <>
                <View
                  style={[
                    styles.row,
                    // {alignItems: 'flex-start', backgroundColor: 'red'},
                  ]}>
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

                <Text style={[styles.normalSmall]}>
                  {e.text}
                  {'\n'}
                </Text>
                {e?.points?.map(point => {
                  return (
                    <View style={[styles.row]}>
                      <Icon
                        name={'dot-fill'}
                        size={moderateScale(12)}
                        color={theme.colors.darkText}
                        type={'Octicons'}
                        style={{marginTop: moderateScale(7), width: '5%'}}
                      />
                      <Text
                        style={[
                          styles.normalSmall,
                          {
                            width: '90%',
                            marginLeft: moderateScale(5),
                          },
                        ]}>
                        {point}
                      </Text>
                    </View>
                  );
                })}
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

export default PrivacyPolicy;

const data = [
  {
    title:
      'Collection, Storage and Use of Information Related to You for Using our Platform',
    text: `While using the Platform you may be asked to provide, or you may choose to upload, certain personally identifiable information about yourself such as your name, occupation, photo, e-mail address, address, phone number(s), Facebook profile, Twitter handle, selected interests or date of birth. Please note that personal information may also include personally identifiable information you voluntarily provide when you take a survey or a poll or enter a contest, sweepstakes or other promotion. In addition, and to provide you effective services, we may automatically track certain information about you based upon your behavior on the application usage. Moreover, we may also collect non- personally identifiable information, such as IP host address, pages viewed, browser type and other data, and may aggregate any personal information collected, such as demographic information, in a manner which does not identify any one person.\n\nWe use this information to do internal research on our users' demographics, interests, and behavior to better understand, protect, and serve our users. We also use this information to offer you tailored content like giving you more relevant search results. This information is compiled and analyzed on aggregated basis. Our automated systems analyze your content (including emails) to provide you personally relevant product features, such as customized search results, tailored advertising, and spam and malware detection. Survey answers and influencer scores that are not connected to personal information may also constitute aggregate information.`,
  },
  {
    title: 'Device Information',
    text: `The information we get may include the URL through which you accessed our Platform, which URL you next go to, your device browser information, your IP address, and other information associated with your interaction.    `,
  },
  {
    title: 'Personal Information',
    text: `The App collects personal information from both court owners and players. For court owners, we collect personal details such as your name, email address, phone number, and business details. Additionally, we gather facility-related information like the name of your sports complex, contact details, and court specifications. We also collect data related to your usage of the App, including your IP address, device type, operating system, browser type, time spent on the App, and your interaction patterns.\n\nTo provide the best experience to you, we also collect and store personal information provided by you from time to time on the Platform. When you contact us, we keep a record of your communication to help solve any issues you might be facing. We may use your email address to inform you about our services, such as letting you know about upcoming changes or improvements, and updating you with issue status. We only collect and use such information from you that we consider necessary for achieving a seamless, efficient and safe experience, customized to your needs including:`,
    points: [
      'To enable the provision of services opted for by you.',
      'To communicate necessary account and product/service related information from time to time;',
      'To allow you to receive quality customer care services;',
      'To undertake necessary fraud and money laundering prevention checks, and comply with the highest security standards;',
      'Comply with applicable laws, rules, and regulations; and',
      'Provide you with information and offers on products and services, on updates, on promotions, on related, affiliated or associated service providers and partners, that we believe would be of interest to you. Where any service requested by you involves a third party, such information as reasonably necessary for us to carry out your service request may be shared with such third party.\n\nFor players, the App collects personal details, including full name, contact information, date of birth, gender, and other identifying details necessary for padel court booking services. We also gather booking-related information, such as preferred playing times, court reservations, payment history, and playing partners.\n\nThese details stay within the App for booking management purposes. If the App facilitates financial transactions, we collect payment-related information such as credit card details or digital wallet information for billing purposes.',
    ],
  },
  {
    title: 'Contact Information',
    text: `We also do use your contact information to send you offers based on your interests and prior activity. The Company may also use contact information internally to direct its efforts for product improvement, to contact you as a survey respondent and to send you promotional materials from its contest sponsors or advertisers.\n\nPlatform users will occasionally receive e-mails containing information regarding any new product invitations, Companyʼs offers, and directives from Company if they have opted-in. “Opted-inˮ means the users have approved certain e-mails to be sent to them from the Company. Users may opt-out of these emails by updating their notifications on their profile settings page.`,
  },
  {
    title: 'Financial Information',
    text: `Further, you may from time to time choose to provide payment related financial information (credit card, debit card, bank account details, billing address etc.) on the Platform. We are committed to keeping all such sensitive data/information safe at all times and ensure that such data/information is only transacted over secure of approved payment gateways which are digitally encrypted, and provide the highest possible degree of care available under the technology presently in use. In addition, if you desire to pay for bills via our Sites or Services, we may require that you provide to us your financial and billing information, such as billing name and address, credit card number or bank account information, and if you choose to pay by credit card, credit card information, such as type of credit card, name on card, card number, validation number, and expiration date. We may retain any transactional information as long as is necessary to fulfill the purposes specified in this Privacy Policy and for recordkeeping, subject to statutory or regulatory retention requirements and legitimate business needs, such as for order tracking and status retrieval purposes.\n\nTo the extent possible, we provide you the option of not divulging any specific information that you wish for us not to collect, store or use. You may also choose not to use a particular service or feature on the Platform and opt out of any non- essential communications from the Company.
`,
  },
  {
    title: 'Personal Account Information',
    text: `Further, transacting over the internet has inherent risks which can only be avoided by you following security practices yourself. We, therefore, caution you and advise you to not reveal any information to any other person and in case of any suspicious activity to your account or where your account have/may have been compromised, please report it to our customer care team on immediate basis.\n\nWhenever you use our services, we aim to provide you with access to your personal information. If that information is wrong, we strive to give you ways to update it quickly or to delete it unless we have to keep that information for legitimate business or legal purposes.\n\nWe aim to maintain our services in a manner that protects information from accidental or malicious destruction. Because of this, after you delete information from our services, we may not immediately delete residual copies from our active servers and may not remove information from our backup systems.`,
  },
  {
    title: 'Correction and upgradation of Personal Information',
    text: `You may have certain rights relating to your Personal Information, subject to local data protection law. We aim to provide you with access to your Personal Information. If that information is wrong, we strive to give you ways to update it quickly or to delete it – unless we have to keep that information for legitimate business or legal purposes. Subject to applicable law, you may obtain a copy of Personal Information we maintain about you or you may update or correct inaccuracies in that information by contacting us. To help protect your privacy and maintain security, we will take steps to verify your identity before granting you access to the information. In addition, if you believe that Personal Information, we maintain about you is inaccurate, subject to applicable law, you may have the right to request that we correct or amend the information by contacting us as indicated below.\n\nIf you wish to correct or update any information you have provided, you may do so online, by yourself. Alternatively, you may contact the Company to correct or
update such information by sending an email to [your Website name]In the event of loss of access to the Platform, you may contact the Company by sending an email to [your Website name]In the event you wish to report a breach of this Policy, you may email us at [your Website name]`,
  },
  {
    title: 'Transparency and Choice',
    text: `People have different privacy concerns. Our goal is to be clear about what information we collect, so that you can make meaningful choices about how it is used. For example, you can:\n\n. Review and control certain types of information tied to your account by using Platform.\n. View and edit your preferences about the ads shown to you on Platform such as which categories might interest you, using ads settings. You can also visit that page to opt out of certain Platform advertising services.\n\nYou may also set your browser to block all cookies, including cookies associated with our services, or to indicate when a cookie is being set by us. However, it is important to remember that many of our services may not function properly if your cookies are disabled.`,
  },
  {
    title: 'How We Use Your Information',
    text: `The information we collect is used to facilitate and enhance the padel court booking services provided through the App. This includes securely connecting court owners with players and allowing facility managers to manage court bookings, schedules, and reservations effectively. We use this information to improve the functionality of the App, ensuring a smooth user experience and optimizing the interface based on how you interact with it.\n\nYour information is also used to comply with legal and regulatory obligations, ensuring that court facilities meet necessary operational standards. We may also use your data to provide customer support, resolve technical issues, and send important communications regarding updates to the App, security alerts, or other essential notices. Your data helps us ensure the App operates smoothly and remains secure for both court owners and players.`,
  },
  {
    title: 'Information we Share',
    text: `We do not share user personal data. However, your personal information may be shared with our affiliate partners, clients, technical consultants, third-party auditors, or other third parties under confidentiality agreements. These parties may compile aggregate information, enhance the functionality of our services, provide associated services, or process your orders and deliver content. For example, we may share your personal information with a vendor to fulfill an incentive or reward you have chosen to receive, and that vendor may forward your email address to a third party to complete the redemption process.\n\nWe may also use aggregated information for operational purposes, to enhance the Appʼs performance, and for market research. Additionally, we may share your data with clients, affiliates, charity partners, and other third parties for advertising, promotional, or other related purposes. If you participate in programs marked as ‘confidential,ʼ your answers may be shared with affiliates, clients, and business partners, but they will not be linked to your personal information or identified individually.\n\nYour username, city, profile photo, publicly declared preferences, and certain activity on the App may be shared with other users. Similarly, you may be able to view such information about other users while using the App.\n\nWe will also share personal information with companies, organizations, or individuals outside of the company if we have a good-faith belief that access, use, preservation, or disclosure of the information is necessary to comply with legal obligations, such as applicable laws, regulations, or governmental requests. We may also share data to enforce our Terms of Service, investigate potential violations, detect or prevent fraud and security issues, or protect the rights, property, or safety of the company, our users, or the public as permitted or required by law.`,
  },
  {
    title: 'Compliance and cooperation with regulatory authorities',
    text: `We regularly review our compliance with our Policy. When we receive any formal written complaints, we contact the person who made the complaint to follow up. We work with the relevant authorities to resolve the complaints on priority basis.`,
  },
  {
    title: 'Cookies and Similar Technologies',
    text: `We use data collection devices such as ‘cookiesʼ on certain pages to help analyzing our web page flow, measure promotional effectiveness, and promote trust and safety. In simple tems ‘cookiesʼ are small files placed on your hard drive that assists us in providing our services. We offer certain features that are only available through the use of ‘cookieʼ.\n\nWe also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are ‘session cookiesʼ, meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline our cookies if your browser permits, although in that case, you may not be able to use certain features and you may be required to re-enter your password more frequently during a session.\n\nAdditionally, you may encounter ‘cookiesʼ or other similar devices on certain pages that are placed by third parties. We do not control the use of cookies by third parties.\n\nIf you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities on the Platform, we may collect such information into a file specific to you. We do not retain any information collected for any longer than is reasonably considered necessary by us, or such period as may be required by applicable laws. The Company may be required to disclose any information that is lawfully sought from it by a judicial or another competent body pursuant to applicable laws.\n\nThey may contain links to other websites. We are not responsible for the privacy practices of such websites which we do not manage and control.
`,
  },
  {
    title:
      'Choices Available Regarding Collection, Use, and Distribution of Information',
    text: `To protect against the loss, misuse and alteration of the information under its control, the Company has in place appropriate physical, electronic and managerial procedures. For example, the Company servers are accessible only to authorized personnel and your information is shared with employees and authorized personnel on a need to know basis to complete the transaction and to provide the services requested by you. Although the Company endeavors to safeguard the confidentiality of your personally identifiable information, transmissions made by means of the internet cannot be made absolutely secure. By using the Platform, you agree that the Company will have no liability for disclosure of your information due to errors in transmission and/or unauthorized acts of third parties.\n\nPlease note that we will not ask you to share any sensitive data or information via email or telephone. If you receive any such request by email or telephone, please do not respond/divulge any sensitive data or information and forward the information relating to the same to [your Website name] for necessary action.`,
  },
  {
    title: 'Changes in our Privacy',
    text: `Our Policy is incorporated into the Terms of Use of the Platform and is are subject to change from time to time without any prior notice. In case of any significant changes, we may intimate you by prominent notification that will appear on Platform. We will also keep our prior version of the privacy policy in an archive for your review. It is strongly recommended that you periodically review our Policy as posted on the Platform. You may “opt outˮ from receiving communications from us and/or sharing your personal information with us, at any time.\n\nIf should you have any queries and clarifications regarding this Policy, please do not hesitate to contact us at [your Website name]`,
  },
];
