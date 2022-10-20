import React, { useState } from "react"
import { useEffect } from "react"
import { Text, Image, StyleSheet, View, ScrollView, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getBasket, removeFromBasket } from "../../apis"
import Button from "../../components/Button"
import DetailsCard from "../../components/DetailCard"
import Loader from "../../components/Loader"
import OrderCard from "../../components/OrderCard"
import { cartCounts, getMyBasket } from "../../store"
import { cartCount } from "../../utils"
const ShoppingCart = ({ navigation }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // @ts-ignore
  const myBasket = useSelector(state => state?.ecommerce?.myBasket);
  useEffect(() => {
    setCartProducts(myBasket[0]?.line_details)
    setBasketData(myBasket[0]);
  }, [myBasket])


  const handleGetBasket = async () => {
    setIsLoading(true)
    await getBasket().then(basket => {
      dispatch(getMyBasket(basket));
      setIsLoading(false)
    }).catch(err => { console.log("ERROR: ", err); setIsLoading(false) });
  }

  useEffect(() => {
    handleGetBasket();
  }, [])

  const getCartProducts = async () => {
    await cartCount().then((res) => dispatch(cartCounts(res))).catch((err) => console.log("Error: ", err));
  }

  const handleRemoveProduct = async url => {
    try {
      await removeFromBasket(url)
        .then(res => {
          handleGetBasket();
          getCartProducts();
        })
        .catch(err => console.log("ERROR: ", err))
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }

  const handleCheckout = () => {
    if (cartProducts.length !== 0) {
      navigation.navigate('billing', { basketData });
    } else {
      Alert.alert("No product in Basket!", "Please add at least one product in basket before checkout")
    }

  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#FFF' }}
    >
      {isLoading ? <Loader></Loader> : <DetailsCard basketData={basketData} />}
      <View style={styles.container}>
        <View style={styles.cardContent}>
          <Text style={styles.chartText}>Cart</Text>
        </View>
        {cartProducts &&
          cartProducts.map((product, index) => (
            <OrderCard
              item={product}
              handleRemoveProduct={handleRemoveProduct}
              key={index}
            />
          ))}


        <View style={styles.btnContainer}>
          <Button
            buttonText="Checkout"
            onPress={handleCheckout}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 10,
    flex: 1,
    backgroundColor: "#FFF"
  },
  headerCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    elevation: 15,
    borderRadius: 8
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3
  },
  cardTextOne: {
    fontSize: 13,
    color: "#424347"
  },
  cardTextTwo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424347"
  },
  cartImage: {
    width: 31,
    height: 23
  },
  chartText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2022"
  },
  tabView: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 20
  },
  selectedTab: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  tabItem: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  },
  btnContainer: {
    marginVertical: 20,
    paddingHorizontal: "10%"
  },
  noProduct: { fontSize: 18, textAlign: 'center', fontWeight: 'bold' }
});

export default ShoppingCart;
