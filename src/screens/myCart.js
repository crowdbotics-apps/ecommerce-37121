import React from "react";
import { useEffect } from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { getBasket } from "../apis";
import Button from "../components/Button";
import DetailsCard from "../components/DetailCard";
import OrderCard from "../components/OrderCard";

const ShoppingCart = ({navigation, route}) => {
    console.log("route: ", route?.params);

    useEffect(async() => {
   const basket = await getBasket();
   console.log("basket", basket)
    }, [])
    
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#FFF"}}>
      <DetailsCard orderAmount={20} deliveryCharges={1.5} totalAmount={21.5}></DetailsCard>
      <View style={styles.container}>
        
        <View style={styles.tabView}>
          <View style={styles.selectedTab}>
            <Text>Select all</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Delete selected</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.chartText}>Chart</Text>
          <Image resizeMode="contain" style={styles.cartImage} source={require("../assets/cart.png")} />
        </View>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <View style={styles.btnContainer}>
          <Button buttonText="Checkout" onPress={() =>{navigation.navigate("Billing", {})}} />
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
  }
});

export default ShoppingCart;

