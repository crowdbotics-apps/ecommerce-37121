import React from "react"
import { Pressable } from "react-native"
import { Text, Image, StyleSheet, View } from "react-native"

const OrderCard = ({ item, handleRemoveProduct }) => {
  const { product } = item;

  return (
    <View style={orderStyles.container}>
      <View style={orderStyles.order}>
        <View style={orderStyles.image}>
          <Image
            source={{ uri: product.images[0].original }}
            style={orderStyles.productImage}
          />
        </View>
        <View style={orderStyles.description}>
          <Text>{product?.title}</Text>
          <View style={orderStyles.bottomComponent}>
            <View style={orderStyles.quantity}>
              <Text>-</Text>
              <Text style={{ fontWeight: "bold" }}>{item?.quantity}</Text>
              <Text>+</Text>
            </View>
            <Pressable onPress={() => handleRemoveProduct(item?.url)}>
              <Image
                source={require('../../assets/delete.png')}
                style={orderStyles.img}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View>
        <Text style={orderStyles.orderPrice}>${product?.price?.excl_tax}</Text>
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
  order: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  productImage: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    borderRadius: 30,
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  quantity: {
    width: 80,
    height: 30,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 12
  },
  bottomComponent: {
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    marginLeft: 10,
    marginTop: 10
  },
  orderPrice: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10
  }
});

export default OrderCard;
