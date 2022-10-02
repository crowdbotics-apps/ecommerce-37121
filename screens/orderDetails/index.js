import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

const OrderDetails = ({ navigation, route }) => {
  const [Order, setOrder] = useState({});
  const [orderLines, setOrderLines] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");

  useEffect(() => {
    if (route?.params.item) {
      const { item } = route.params;
      setOrder(item);
      setOrderLines(item?.lines)
      const dateTime = item.date_placed.split("T")
      setOrderDate(dateTime[0])
      const splitTime = dateTime[1].split(":");
      setOrderTime(splitTime[0] + ":" + splitTime[1])
    }
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.productHeader}>
          <Image source={{ uri: "https://as2.ftcdn.net/v2/jpg/01/19/32/93/1000_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg"}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.mainText}>{Order?.shipping_address?.first_name + " " + Order?.shipping_address?.last_name}</Text>
            <Text style={styles.subText}>#{Order?.number}</Text>
          </View>
          <Pressable
            style={[
              styles.statusBtn,
              {backgroundColor: Order?.status === "Completed" ? "#63b530" : Order?.status === "Pending" ? "#ead00e" : "#f21313"}
            ]}>
            <Text style={styles.statusText}>
              {Order?.status}
            </Text>
          </Pressable>
        </View>
        <View style={styles.flexRowContainer}>
        <View style={styles.flexRow}>
          <Image
            source={require("../../assets/locationIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>{Order?.shipping_address?.line1}</Text>
        </View>
        <View style={styles.flexRow}>
          <Image
            source={require("../../assets/clockIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>
            Ordered: {orderDate} | {orderTime} 
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Image
            source={require("../../assets/walletIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>{Order?.shipping_method}</Text>
          <Text style={styles.pricingText}>
            {Order?.total_incl_tax} {Order?.currency}
          </Text>
        </View>
        </View>
        
        {orderLines && orderLines.map((product, index) =>

          <View style={styles.productContainer1} key={index}>
            <Image source={{ uri: product?.product?.images[0].original }} style={styles.productImage1} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product?.product?.title}</Text>
              <Text style={styles.pricingText1}>
                ({product?.quantity}) ${product?.price_excl_tax}{" "}
                <Text style={styles.lineThrough}>${product?.price_incl_tax}</Text>
              </Text>
              <View style={styles.deliveryContainer}>
                <View style={styles.greenCircle}>
                  <Text style={[styles.white, styles.bold]}>%</Text>
                </View>
                <Text style={styles.fnt12}>Free delivery</Text>
              </View>
            </View>
          </View>
        )

        }
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  productContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
    borderBottomWidth: 1,
    
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 20,
    height: 60
  },
  mainText: {
    fontSize: 16,
    color: "#3E4462",
    fontWeight: "bold"
  },
  subText: {
    fontSize: 16,
    color: "#7C7C7C"
  },
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 10,
  },
  statusText: {
    color: "#fff",
    fontSize: 12
  },
  plusIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  flexRowContainer:{marginTop: 20, marginBottom: 30},
  flexRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain"
  },
  text: {
    color: "#3E4462",
    fontSize: 14
  },
  pricingText: {
    color: "#000",
    fontSize: 20,
    textAlign: "right",
    flex: 1,
    fontWeight: "bold"
  },
  productContainer1: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopColor: "#f1f1f1",
    borderTopWidth: 1,

  },
  productImage1: {
    height: 80,
    width: 70,
    borderRadius: 10,
    resizeMode: "contain"
  },
  productDetails: {
    flex: 1,
    marginLeft: 20
  },
  productName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5
  },
  pricingText1: {
    fontSize: 14,
    color: "#7E7E7E",
    marginBottom: 5
  },
  lineThrough: {
    textDecorationLine: "line-through",
    color: "#ccc",
    textDecorationStyle: "solid"
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  greenCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#12D790",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5
  },
  white: {
    color: "#fff"
  },
  fnt12: {
    fontSize: 12
  },
  bold: {
    fontWeight: "bold"
  },

});

export default OrderDetails;
