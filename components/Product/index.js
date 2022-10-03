import React from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native"

const Product = ({ product, navigation }) => {
  return (
    <View style={productStyles.container}>
      <View style={productStyles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('productDetails', { product });
          }}
        >
          <Image
            resizeMode="contain"
            source={{ uri: product?.images[0]?.original }}
            style={productStyles.productImage}
          />
        </TouchableOpacity>


      </View>
      <View style={productStyles.descriptionContainer}>
        <Text style={productStyles.bold}>{product.title}</Text>
        <View style={productStyles.availabilityTextContainer}>
          <Text style={productStyles.availabilityText}>Purchase: </Text>
          <Text style={{...productStyles.availability, color: product?.availability_status?.is_available_to_buy ? "#12D790" : "#EA4335"}}>
            {product?.availability_status?.is_available_to_buy
              ? 'Available'
              : "Not available"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const productStyles = StyleSheet.create({
  container: {
    height: 240,
    width: 160,
    margin: 10
  },
  imageContainer: {
    height: 167,
    width: 145,
    borderRadius: 10
  },
  productImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  descriptionContainer: {
    justifyContent: "center",
    padding: 10
  },
  availabilityTextContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  availabilityText: {
    color: "#7C7C7C",
    fontSize: 12,
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold"
  },
  favIcon: {
    height: 18,
    width: 20,
    position: "absolute",
    right: 10,
    top: 10
  },
  availability: {
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default Product;
