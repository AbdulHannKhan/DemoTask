import {Children, default as React} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../GlobalStyles';
import Wrapper from './wrapper';
import {moderateScale} from 'react-native-size-matters';

type CustomProps = {
  rbsheetRef: any;
  children: React.ReactNode;
  onClose?: () => void;
  height?: number;
  closeOnDrag?: boolean;
};

const CustomRBSheet = ({
  rbsheetRef,
  onClose,
  height,
  children,
  closeOnDrag = true,
}: CustomProps) => {
  return (
    <RBSheet
      ref={rbsheetRef}
      closeOnPressBack={true}
      closeOnPressMask={true}
      draggable={closeOnDrag}
      onClose={onClose}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: [style.container, {height: height}],
      }}>
      <Wrapper>{children}</Wrapper>
    </RBSheet>
  );
};

export default CustomRBSheet;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
  },
});
