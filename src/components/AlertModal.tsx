import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import theme from '../config/theme';
import styless from '../GlobalStyles';
import Button from './Button';
import Input from './Input';
import {useTranslation} from 'react-i18next';

const AlertModal = ({isVisible, onPress, onClose, type}: any) => {
  const [password, setPassword] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (!isVisible) {
      setPassword('');
    }
  }, [isVisible]);
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose} // Handles back button press on Android
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styless.heading2}>
            {type === 'delete'
              ? 'Delete Account'
              : type === 'reset'
              ? 'Reset Password'
              : 'Logout'}
          </Text>

          {/* Description */}
          {type === 'delete' ? (
            <Text
              style={[
                styless.text,
                styless.marginVS,
                {textAlign: 'center', width: '90%'},
              ]}>
              Deleting your account will permanently erase all data.{' '}
              <Text style={styless.regularBold}>
                This action cannot be undone.{' '}
              </Text>
              Are you sure you want to proceed?
            </Text>
          ) : (
            <Text
              style={[
                styless.text,
                styless.marginVS,
                {textAlign: 'center', width: '100%'},
              ]}>
              {type === 'reset'
                ? 'Your Password has been successfully reset. Now you can easily login to your account.'
                : 'Are you sure you want to logout?'}
            </Text>
          )}
          {type === 'delete' ? (
            <Input
              label={t('PASSWORD')}
              required={true}
              placeholder={t('ENTER_PASS')}
              secureTextEntry={true}
              onChangeText={text => {
                setPassword(text);
              }}
              labelValue={password}
              textContentType={'password'}
              autoComplete={'password'}
            />
          ) : null}

          {type === 'reset' ? (
            <Button title="Close" onPress={onClose} style={{width: '100%'}} />
          ) : (
            <View
              style={[styless.row, {width: '100%'}, styless.justifyBetween]}>
              <Button
                title={type === 'delete' ? 'Delete Account' : 'Logout'}
                onPress={() => onPress(password)}
                style={[
                  {width: '48%'},
                  {
                    paddingTop: moderateScale(2),
                    paddingBottom: moderateScale(2),
                  },
                  styless.marginVXS,
                ]}
              />

              <Button
                title="Cancel"
                onPress={() => {
                  onClose(password);
                }}
                style={[
                  styless.whiteBtn,
                  {width: '48%', borderColor: theme.colors.border},
                  {
                    paddingTop: moderateScale(2),
                    paddingBottom: moderateScale(2),
                  },
                  styless.marginVXS,
                ]}
                textStyle={[{color: theme.colors.primary}]}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  shareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    marginHorizontal: 5,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default AlertModal;
