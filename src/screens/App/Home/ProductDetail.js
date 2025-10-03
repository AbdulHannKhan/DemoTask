import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import Wrapper from "../../../components/wrapper";
import Button from "../../../components/Button";
import theme from "../../../config/theme";
import Entypo from 'react-native-vector-icons/Entypo'
import BackButton from "../../../components/BackButton";
import { addToCart } from "../../../store/cartSlice";

const ProductDetailScreen = ({ navigation, route }) => {
    const cartItems = useSelector((state) => state.cart.items);

    const { product } = route.params;
    console.log("Detail", product);

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const increaseQty = () => setQuantity(quantity + 1);
    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };


    return (
        <Wrapper>
            <BackButton
                borderHide={true}
                onPress={() => navigation.goBack()}
                onPressCart={()=>navigation.navigate('Cart')}
                cartCount={cartItems?.length}
                cart={true}
            />
            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.price}>${product.price}</Text>

                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                        ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                    </Text>
                </View>

                <Text style={styles.description}>{product.description}</Text>

                <View style={styles.qtyContainer}>
                    <TouchableOpacity style={styles.qtyButton} onPress={decreaseQty}>
                        <Entypo
                            name={'minus'}
                            color={theme.colors.surface}
                            size={moderateScale(20)}
                        />
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{quantity}</Text>

                    <TouchableOpacity style={styles.qtyButton} onPress={increaseQty}>
                        <Entypo
                            name={'plus'}
                            size={moderateScale(20)}
                            color={theme.colors.surface} />

                    </TouchableOpacity>
                </View>
                <Button title="Add To Cart"
                    onPress={() => {
                        dispatch(addToCart({ ...product, quantity }));
                        navigation.navigate("Cart");
                    }} />
            </View>
        </Wrapper>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({

    image: {
        width: "100%",
        height: moderateScale(250),
        resizeMode: "contain",
        marginBottom: moderateScale(15),
    },
    infoContainer: {
        backgroundColor: theme.colors.background,
        borderRadius: moderateScale(12),
        padding: moderateScale(15),
    },
    title: {
        fontSize: theme.fontSizes.medium,
        marginBottom: moderateScale(5),
        color: theme.colors.text,
        fontFamily: theme.fonts.bold
    },
    category: {
        fontSize: theme.fontSizes.regular,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        // marginBottom: moderateScale(5),
    },
    price: {
        fontSize: theme.fontSizes.big,
        fontFamily: theme.fonts.bold,
        color: theme.colors.primary,
    },
    ratingContainer: {
        marginBottom: moderateScale(10),
    },
    ratingText: {
        fontSize: theme.fontSizes.regular,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular
    },
    description: {
        fontSize: theme.fontSizes.regular,
        lineHeight: moderateScale(22),
        fontFamily: theme.fonts.medium,
        color: theme.colors.text,
        marginBottom: moderateScale(15),
    },
    qtyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: moderateScale(10),
    },
    qtyButton: {
        width: moderateScale(35),
        height: moderateScale(35),
        borderRadius: moderateScale(8),
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    qtyButtonText: {
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.bold,
        color: theme.colors.surface,
    },
    qtyText: {
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.bold,
        marginHorizontal: moderateScale(15),
        color: theme.colors.text,
    },

});
