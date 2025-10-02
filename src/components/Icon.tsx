import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: any;
  style?: Object;
  size: number;
  color?: string;
  type?: string;
}
const Icon = ({name, style, size, color, type}: Props) => {
  return type === 'MaterialCommuintyIcons' ? (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  ) : type === 'Ionicons' ? (
    <Ionicons name={name} size={size} color={color} style={style} />
  ) : type === 'Feather' ? (
    <Feather name={name} size={size} color={color} style={style} />
  ) : type === 'EvilIcons' ? (
    <EvilIcons name={name} size={size} color={color} style={style} />
  ) : type === 'SimpleLineIcons' ? (
    <SimpleLineIcons name={name} size={size} color={color} style={style} />
  ) : type === 'Entypo' ? (
    <Entypo name={name} size={size} color={color} style={style} />
  ) : type === 'AntDesign' ? (
    <AntDesign name={name} size={size} color={color} style={style} />
  ) : type === 'FontAwesome' ? (
    <FontAwesome name={name} size={size} color={color} style={style} />
  ) : type === 'FontAwesome6' ? (
    <FontAwesome6 name={name} size={size} color={color} style={style} />
  ) : type === 'MaterialIcons' ? (
    <MaterialIcons name={name} size={size} color={color} style={style} />
  ) : type === 'Fontisto' ? (
    <Fontisto name={name} size={size} color={color} style={style} />
  ) : type === 'Octicons' ? (
    <Octicons name={name} size={size} color={color} style={style} />
  ) : (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
