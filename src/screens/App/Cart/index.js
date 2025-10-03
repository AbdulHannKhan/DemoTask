import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../store/cartSlice";
import Wrapper from "../../../components/wrapper";
import theme from "../../../config/theme";
import BackButton from "../../../components/BackButton";
import Entypo from 'react-native-vector-icons/Entypo'
import Button from "../../../components/Button";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const Cart = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state?.cart?.items);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item?.price * item?.quantity, 0)
    .toFixed(2);
console.log("Cart Items",cartItems);

    
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item?.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item?.title}
        </Text>
        <Text style={styles.price}>${item?.price}</Text>

        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(decreaseQuantity(item?.id))}
          >
            <Entypo
              name={'minus'}
              size={moderateScale(16)}
              color={theme.colors.surface} />          
              </TouchableOpacity>

          <Text style={styles.qtyText}>{item?.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(increaseQuantity(item?.id))}
          >
            <Entypo
              name={'plus'}
              size={moderateScale(16)}
              color={theme.colors.surface} />          
              </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(removeFromCart(item?.id))}
      >
        <AntDesign 
        name={'delete'} 
        color={theme.colors.danger}
        size={theme.fontSizes.big}
        />
      </TouchableOpacity>
    </View>
  );

  return (

    <Wrapper style={{ flex: 1 }}>
      <BackButton
        borderHide={true}
        onPress={() => navigation.goBack()}
      />
      {cartItems?.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          />
          <View style={styles.checkoutBar}>
            <Text style={styles.totalText}>Total: ${totalPrice}</Text>
            <Button 
            title="Checkout" style={{width:'35%'}}
            onPress={()=>navigation.navigate('Home')}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        </View>
      )}
    </Wrapper>
  );
};

export default Cart;

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderRadius: moderateScale(12),
    marginVertical: moderateScale(8),
    padding: moderateScale(10),
    alignItems: "center",
  },
  image: {
    width: moderateScale(70),
    height: moderateScale(70),
    resizeMode: "contain",
    marginRight: moderateScale(10),
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.regular,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  price: {
    fontSize: theme.fontSizes.regular,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
    marginVertical: moderateScale(5),
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(8),
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.bold,
    marginHorizontal: moderateScale(15),
    color: theme.colors.text,
  },
  removeButton: {
    marginLeft: moderateScale(10),
    padding: moderateScale(5),
  },
  
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: theme.colors.background,
  },
  totalText: {
    fontSize: theme.fontSizes.large,
    fontFamily:theme.fonts.bold,
    color: theme.colors.text,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.text,
  },
});
