import React, {useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  FlatList,
} from 'react-native';
import {width} from '../config/constants';
import styles from '../GlobalStyles';
import theme from '../config/theme';

import {moderateScale} from 'react-native-size-matters';
import Icon from './Icon';

type CustomProps = {
  imageLeft?: any;
  value?: string;
  placeholder: string;
  onSelect: any;
  customStyle?: object;
  error?: string;
  label?: string;
  required?: boolean;
  disableFlag?: boolean;
  disableType?: boolean;
  rightIcon?: boolean;
  deleteFunc?: () => void;
  border?: string;
  bottomList?: boolean;
  overFlow?: boolean;
  initialValue?: string;
};

const DropDown = ({
  imageLeft,
  value,
  placeholder,
  customStyle,
  error,
  label,
  required,
  onSelect,
  disableType,
  disableFlag,
  deleteFunc,
  rightIcon,
  border,
  bottomList,
  overFlow,
  initialValue,
}: CustomProps) => {
  const [close, setClose] = useState(true);
  const [selectedVal, setSelectedVal] = useState(
    initialValue ? initialValue : '',
  );

  const inputRef = useRef<any>();
  const onFocus = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableOpacity
      disabled={disableType}
      onPress={() => {
        if (!bottomList) {
          onSelect();
        } else {
          setClose(!close);
        }
      }}
      style={[customStyle, styles.marginVS]}>
      {label ? (
        <View style={[styles.row, styles.marginBXS]}>
          <Text style={styles.regularBold}>{label}</Text>
          <Text style={[styles.regularBold, {color: theme.colors.danger}]}>
            {required ? ' *' : null}
          </Text>
        </View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {height: moderateScale(45)},
          styles.paddingHM,
          {
            backgroundColor: border
              ? theme.colors.surface
              : theme.colors.inputBack,
            borderColor: border ? theme.colors.border : theme.colors.inputBack,
            borderWidth: border ? 1 : 0,
          },
        ]}>
        {imageLeft ? (
          <View
            style={[
              {
                width: moderateScale(24),
                height: moderateScale(18),
              },
            ]}>
            <Image
              source={imageLeft}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
        ) : null}
        <Text
          style={[
            styles.input,
            styles.text,

            border
              ? {
                  textAlign: 'center',
                  color: theme.colors.darkText,
                  fontSize: theme.fontSizes.small,
                }
              : null,
            overFlow && {fontSize: theme.fontSizes.regular},
          ]}>
          {selectedVal ? selectedVal : value ? value : placeholder}
        </Text>

        {/* {rightText && <Text style={styles.minutes}>Minutes</Text>} */}
        {rightIcon && (
          <TouchableOpacity
            disabled={disableType}
            onPress={() => {
              onSelect();
              setClose(!close);
            }}
            style={[styles.centerAlign]}>
            <Icon
              name={'chevron-down'}
              type="Entypo"
              color={border ? theme.colors.darkText : theme.colors.darkGrey}
              size={border ? moderateScale(18) : moderateScale(22)}
            />
          </TouchableOpacity>
        )}

        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      </View>
      {error && value ? <Text style={styles.errorText}>{error}</Text> : null}
      {/* {!error && customError && !labelValue ? (
        <Text style={styles.errorText}>{customError}</Text>
      ) : null} */}
      {bottomList && !close ? (
        <FlatList
          data={[
            {width: 58, unit: 'mm', value: '2 inch'},
            {width: 80, unit: 'mm', value: '3 inch'},
          ]}
          contentContainerStyle={styles.dropdownList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.paddingVXS}
                onPress={() => {
                  setClose(true);
                  setSelectedVal(item?.value);
                  onSelect(item?.width);
                }}>
                <Text style={styles.text}>{item?.value}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default DropDown;
