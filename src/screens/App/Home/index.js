
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/productSlice";
import ProductCard from "../../../components/ProductCard";
import Input from "../../../components/Input";
import Wrapper from "../../../components/wrapper";
import BackButton from "../../../components/BackButton";
import { moderateScale } from "react-native-size-matters";
import theme from "../../../config/theme";
import { clearCart } from "../../../store/cartSlice";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector(state => state.product);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  const filtered = allProducts.filter(p => {
    const searchLower = search.toLowerCase();

    const matchSearch =
    p.title.toLowerCase().includes(searchLower) ||
    p.price.toString().toLowerCase().includes(searchLower);    
    if (selectedCategory === "All") {
      return matchSearch;
    }
    return p.category === selectedCategory && matchSearch;
  });

  const renderItem = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    />
  );

  return (
    <Wrapper scrollEnabled={false} style={{flex:1}}>
       <BackButton
                borderHide={true}
                onPress={() => navigation.goBack()}
                title="Products"
                cart={true}
                logout={true}
                onPressLogout={()=>{
                  dispatch(clearCart());
                  navigation.navigate('AuthStack')
                }}
                onPressCart={()=>navigation.navigate('Cart')}
                cartCount={cartItems?.length}

            />
      <Input
        placeholder="Search"
        onChangeText={setSearch}
        labelValue={search}
        />
      <View style={styles.tabsContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={[
              styles.tab,
              selectedCategory === item && styles.activeTab
            ]}
            onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === item && styles.activeTabText
                ]}
                >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filtered}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={renderItem}
        />
        
        </Wrapper>
  );
};
export default Home;


const styles = StyleSheet.create({


tabsContainer: {
  flexDirection: "row",
  marginVertical: moderateScale(10),
},
tab: {
  paddingVertical: moderateScale(6),
  paddingHorizontal: moderateScale(15),
  borderRadius: moderateScale(20),
  backgroundColor: "#f0f0f0",
  marginRight: moderateScale(10),
},
activeTab: {
  backgroundColor: theme.colors.primary,
},
tabText: {
  color: theme.colors.text,
  fontFamily:theme.fonts.regular,
  fontSize:theme.fontSizes.regular,

},
activeTabText: {
  color:theme.colors.surface,
  fontFamily:theme.fonts.semiBold,
  fontSize:theme.fontSizes.regular
},

})