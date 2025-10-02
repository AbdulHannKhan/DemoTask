import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import styles from '../GlobalStyles';
import theme from '../config/theme';
import Button from './Button';
import {moderateScale} from 'react-native-size-matters';
type BtnsProps = {
  reference?: any;
  btnText1?: string;
  btnText2?: string;
  onBtn1Press?: any;
  onBtn2Press?: any;
  btnStyle?: object;
  textStyle?: object;
  btnStyle1?: object;
  borderColor?: string;
  btn2disable?: boolean;
  disableSubmitBtn?: boolean;
};

const Btns = ({
  reference,
  btnText1,
  btnText2,
  textStyle,
  onBtn1Press,
  onBtn2Press,
  btnStyle,
  btnStyle1,
  borderColor,
  btn2disable,
}: BtnsProps) => {
  const {t} = useTranslation();

  return (
    <View
      style={[
        styles.row,
        styles.fullWidth,
        styles.justifyBetween,
        {marginTop: -moderateScale(5)},
      ]}>
      <Button
        title={btnText1 ? btnText1 : t('CANCEL')}
        onPress={onBtn1Press}
        style={[
          styles.whiteBtn,
          borderColor
            ? {borderColor: borderColor}
            : {borderColor: theme.colors.border},
          {width: '48%'},
          btnStyle1,
        ]}
        textStyle={[styles.regularBold, styles.purpleBold]}
      />
      <Button
        disable={btn2disable}
        title={btnText2 ? btnText2 : t('UPDATE')}
        onPress={
          onBtn2Press
            ? onBtn2Press
            : () => {
                reference?.current.close();
              }
        }
        style={[{width: '48%'}, btnStyle]}
        textStyle={textStyle}
      />
    </View>
  );
};

export default Btns;
