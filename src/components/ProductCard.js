import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import theme from "../config/theme";

const ProductCard = ({ item, onPress }) => {
    
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>Rs.{item?.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
        card: {
          flexDirection: "row",
          alignItems: "center",
          padding: moderateScale(10),
          marginBottom: verticalScale(10),
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: moderateScale(12),
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3, // for Android shadow
        },
        image: {
          width: scale(70),
          height: scale(70),
          resizeMode: "contain",
          borderRadius: moderateScale(8),
          backgroundColor: "#f9f9f9",
        },
        info: {
          flex: 1,
          marginLeft: moderateScale(12),
          justifyContent: "center",
        },
        title: {
          fontSize: theme.fontSizes.regular,
          fontFamily:theme.fonts.semiBold,
          color: "#333",
          marginBottom: verticalScale(4),
        },
        price: {
          fontSize: theme.fontSizes.small,
          fontFamily:theme.fonts.bold,
          color: "#2a9d8f",
        },
      });