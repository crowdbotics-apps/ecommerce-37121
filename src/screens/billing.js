import React, { useState } from "react";
import { Text, Image, StyleSheet, View, ScrollView, LogBox } from "react-native";
import Button from "../components/Button";
import DetailsCard from "../components/DetailCard";
// import Input from "../components/TextInput";
import { modules } from "@modules";
import { useEffect } from "react";
const Billing = ({ navigation }) => {
  const [address, setAddress] = useState(null);
  const AddressAutoComplete = modules[0].value.navigator;  //module_index : position of the module in modules folder


  const onSelectAddress = (address) => {
    setAddress(address.formatted_address);
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  
  return (
    <View style={{ backgroundColor: "#FFF", width: "100%", height: '100%' }}>
      <DetailsCard orderAmount={20} deliveryCharges={1.5} totalAmount={21.5} />
      <View style={styles.container}>

        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.deliveryDetails}>Delivery details</Text>
          <Text style={styles.label}>
            Address
          </Text>
          <View style={{ zIndex: 100 }}>
            <AddressAutoComplete onAddressSelect={(data, address) => onSelectAddress(address)} />
          </View>

        </View>
        <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
        </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <Button buttonText={"Proceed"} onPress={() => { navigation.navigate("Shipping") }} />
        </View>
      </View>
    </View>
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
  deliveryDetailsContainer: {
    marginBottom: 20
  },
  deliveryDetails: {
    padding: 20,
    fontWeight: "bold",
    fontSize: 14,
    color: "#1E2022"
  },
  label: {
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 10
  },
  inputIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#C4C4C4",
    borderRadius: 10
  },
  inputStyle: {
    flex: 1,
    borderWidth: 0
  },

  icon: {
    height: 18,
    width: 18,
    marginRight: 10
  },
  btnContainer: {
    marginVertical: 20,
    paddingHorizontal: "10%"
  },
  cardContainer: {
    height: 250
  }
});

export default Billing;

const OrderCard = () => {
  return (
    <View style={orderStyles.container}>
      <View style={orderStyles.order}>
        <View style={orderStyles.image}>
          <Image source={require("../assets/edit.png")} />
        </View>
        <View style={orderStyles.description}>
          <Text style={orderStyles.orderName}>Order name</Text>
          <Text style={orderStyles.quantity}>Quantity: 1</Text>
          <Text style={orderStyles.inStock}>In stock</Text>
        </View>
      </View>
      <View>
        <Text style={orderStyles.orderPrice}>$10.25</Text>
      </View>
    </View>
  );
};

const orderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 15,
    borderRadius: 10
  },
  fontWeightBold: {
    fontWeight: "bold"
  },
  order: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  orderName: {
    fontSize: 15,
    fontWeight: "bold"
  },
  quantity: {
    fontSize: 13,
    color: "#3E3E3E"
  },
  inStock: {
    fontSize: 13,
    color: "#12D790"
  },
  orderPrice: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10
  }
});



