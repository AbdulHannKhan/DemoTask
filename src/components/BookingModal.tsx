import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Check from '../assets/images/check.svg';
import styless from '../GlobalStyles';
import Button from './Button';
import Btns from './Btns';
import theme from '../config/theme';
const BookingConfirmationModal = ({
  isVisible,
  onClose,
  onShare,
  onAddToCalendar,
}: any) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose} // Handles back button press on Android
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Checkmark Icon */}
          {/* <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png',
            }}
            style={styles.icon}
          /> */}
          <Check />
          {/* Title */}
          <Text style={styless.heading2}>Thank You !!</Text>

          {/* Description */}
          <Text style={[styless.text, styless.marginVS, {textAlign: 'center'}]}>
            Your request for booking reservation has been submitted.
          </Text>

          {/* Share Button */}
          <Button
            title="Close"
            onPress={onClose}
            style={[styless.fullWidth, styless.paddingVXS, styless.marginVXS]}
          />
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

export default BookingConfirmationModal;
