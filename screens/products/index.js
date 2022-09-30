import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, FlatList } from "react-native"
import { getProduct, getProductsList, productAvailability } from "../../apis"
import CartBox from "../../components/CartBox"
import Product from "../../components/Product"
import TabView from "../../components/TabView"
import { productsInCart } from "../../utils"


const ProductListingScreen = ({ navigation, route }) => {
  const [productsList, setProductsList] = useState([])
const [productQuantity, setProductQuantity] = useState("0")
  const handleProducts = async () => {
    const products = await getProductsList();
    var productList = [];
    let i = 0;
    while (i < products.length) {
      const product = await getProduct(products[i].url);
      const availability = await productAvailability(product.availability);
      product.availability_status = availability
      productList.push(product);
      i += 1;
    }
    setProductsList(productList)
  }



  useEffect(() => {
     handleProducts();
   const cartProducts = async () =>{
    const productQuantity= await productsInCart();
    setProductQuantity(productQuantity)
   }
   cartProducts();
  }, [route]);

//   useEffect(() => {
//     getBasket();
//  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <TabView tabTitles={["All", "Best Products"]} selected={0} />
      <CartBox navigation={navigation} quantity={productQuantity}></CartBox>
      </View>
     
      <View style={styles.productsContainer}>
        <FlatList
          data={productsList}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Product product={item} navigation={navigation} />
          )}
          columnWrapperStyle={{
            justifyContent: "space-around"
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  productsContainer: {
    paddingLeft: 15,
    marginBottom: 50
  },
  topContainer:{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 30,}
  
});

export default ProductListingScreen;
