import i18next from 'i18next';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Filter from '../assets/images/Filter.svg';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import Icon from './Icon';

type ButtonProps = {
  style?: object;
  onPress: () => void;
  type?: string;
  title?: string;
  rightBtn?: string;
  RightComp?: any;
  rightButtonPress?: () => void;
  borderHide?: boolean;
  languageChng?: boolean;
  extraBtn?: string;
  onPressExtra?: () => void;
  extraBtnDisable?: boolean;
  showBackButton?: boolean;
  logout?: boolean;
  cart?: boolean;
  onPressLogout?: () => void;
  onPressCart?: () => void;
  cartCount?: number; // 👈 new prop for showing cart items
};

const BackButton = ({
  type,
  title,
  rightButtonPress,
  onPress,
  rightBtn,
  style,
  borderHide,
  RightComp,
  extraBtn,
  onPressExtra,
  extraBtnDisable,
  showBackButton = true,
  cart,
  logout,
  onPressLogout,
  onPressCart,
  cartCount = 0,
}: ButtonProps) => {
  const langDir = i18next.dir();
  const [disable, setDisable] = useState(false);

  return (
    <View
      style={[
        styles.marginVM,
        styles.marginBM,
        styles.row,
        { justifyContent: 'space-between' },
        style,
      ]}>
      {showBackButton && (
        <View style={[styles.row, styles.centerAlign]}>
          <TouchableOpacity
            disabled={disable}
            onPress={() => {
              onPress();
              setDisable(true);
              setTimeout(() => {
                setDisable(false);
              }, 2000);
            }}>
            <Icon
              name={'arrow-left'}
              type={'MaterialCommunityIcons'}
              size={moderateScale(24)}
              color={theme.colors.grey2}
              style={{ marginTop: moderateScale(5) }}
            />
          </TouchableOpacity>
          <Text
            style={[
              langDir === 'rtl' ? styles.regularBold : styles.heading2,
              styles.marginLS,
            ]}>
            {title}
          </Text>
        </View>
      )}

      <View style={[styles.row, { alignItems: 'center' }]}>
       {cart&&

        <TouchableOpacity onPress={onPressCart} style={{ marginRight: moderateScale(15) }}>
          <View>
            <Icon
              name="cart-outline"
              type="MaterialCommunityIcons"
              size={moderateScale(26)}
              color={theme.colors.grey2}
            />
            {cartCount > 0 && (
              <View
                style={styles.cartView}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: moderateScale(10),
                    fontWeight: 'bold',
                  }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
}
        {logout &&
          <TouchableOpacity onPress={onPressLogout} style={{ marginRight: moderateScale(15) }}>
            <Icon
              name="logout"
              type="MaterialCommunityIcons"
              size={moderateScale(24)}
              color={theme.colors.grey2}
            />
          </TouchableOpacity>
        }

        {/* Extra Button */}
        {extraBtn ? (
          <TouchableOpacity disabled={extraBtnDisable} onPress={onPressExtra}>
            <Icon
              name={extraBtn}
              size={moderateScale(24)}
              color={
                extraBtn === 'trash-can-outline' && extraBtnDisable === false
                  ? theme.colors.red
                  : extraBtnDisable === true
                    ? theme.colors.placeholder
                    : theme.colors.primary
              }
              type={'MaterialCommunityIcons'}
            />
          </TouchableOpacity>
        ) : null}

        {/* Right Button */}
        {rightBtn ? (
          <TouchableOpacity onPress={rightButtonPress}>
            {rightBtn === 'filter' ? (
              <Filter />
            ) : (
              <Icon
                name={rightBtn}
                size={moderateScale(24)}
                color={
                  rightBtn === 'trash-can-outline'
                    ? theme.colors.red
                    : rightBtn === 'information-outline'
                      ? theme.colors.grey2
                      : theme.colors.primary
                }
                type={
                  rightBtn === 'dots-three-vertical'
                    ? 'Entypo'
                    : 'MaterialCommunityIcons'
                }
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {RightComp && <RightComp />}
    </View>
  );
};

export default BackButton;

