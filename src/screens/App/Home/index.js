import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, ActivityIndicator, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/courtSlice";
import ProductCard from "../../../components/ProductCard";
import Input from "../../../components/Input";
import styles from "../../../GlobalStyles";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector(state => state.court);
  const [search, setSearch] = useState("");
  console.log("Alllllll", allProducts);


  const getProductsAPI = async () => {

    await dispatch(getAllProducts()).then(res => {
      console.log('GET All Products', res?.payload);
    });
  };

  useEffect(() => {
    getProductsAPI()
  }, []);

  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    />
  );


  return (
    <View style={styles.mainView}>
      
      <Input
        placeholder={'Search'}
        onChangeText={setSearch}
        labelValue={search}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        // ListEmptyComponent={}
      />
    </View>
  );
}

export default Home;
