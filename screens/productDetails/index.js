// @ts-nocheck
import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Image, Pressable } from "react-native"
import { addToBasket, getPrice } from "../../apis"
import Button from "../../components/Button"
import CartBox from "../../components/CartBox"
import Loader from "../../components/Loader"
import { cartCount } from "../../utils"

const ProductDetails = ({ navigation, route }) => {
  
  const [product, setProduct] = useState({});
  const [productPrice, setProductPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [productQuantity, setProductQuantity] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const handlePrice = async priceUrl => {
    const price = await getPrice(priceUrl).catch((error) =>console.log("error: ", error));
    setProductPrice(price)
  }

  const cartProducts = async () =>{
    await cartCount().then((res) => setProductQuantity(res)).catch((err) => console.log("Error: ", err));
   }
   
  useEffect(() => {
    if (route?.params?.product) {
      setProduct(route?.params?.product)
      handlePrice(route?.params?.product?.price);
    };
    cartProducts();
  }, []);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const handleConfirmation = async id => {
    setIsLoading(true)
    try {
      await addToBasket({
        quantity,
        url: id,
        partner_id: 4,
      }).then((res) => {setIsLoading(false);navigation.navigate("cart")}).catch((error) => {console.log("error: ", error); setIsLoading(false)})
      
    } catch (error) {
      console.log("ERROR: ", error)
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader></Loader> }
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product?.images ? product?.images[0].original : "jt" }}
          style={styles.logo}
        />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.bar} />
        <View style={styles.cartContainer}>
        <Text style={styles.title}>{product?.title}</Text>
        <CartBox navigation={navigation} quantity={productQuantity}></CartBox>
        </View>
        <Text style={styles.description}>{product?.description}</Text>
        <View style={styles.availabilityContainer}>
          <Text style={styles.statusText}>Availability Status: </Text>
          <Text style={[styles.availability,{color: product?.availability_status?.is_available_to_buy ? "#12D790" : "#EA4335",}]}>
            {product?.availability_status?.is_available_to_buy
              ? 'Available'
              : "Not available"}
          </Text>
        </View>
        <View style={styles.counterContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${productPrice?.excl_tax}</Text>
            <Text style={styles.acctualPrice}>${productPrice?.incl_tax}</Text>
          </View>

          <View style={styles.counter}>
            <Pressable
              style={[styles.counterBtn, styles.decrement]}
              onPress={() => decrement()}
            >
              <Image
                source={require("../../assets/minusIcon.png")}
                style={styles.icon}
              />
            </Pressable>
            <Text style={styles.counterText}>{quantity}</Text>
            <Pressable
              style={[styles.counterBtn, styles.increment]}
              onPress={() => increment()}
            >
              <Image
                source={require("../../assets/plusIcon.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>

        <Text style={styles.description}>{product.caption}</Text>
        <Button
          buttonText="Add to cart"
          style={styles.button}
          onPress={() => handleConfirmation(product?.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F3FA"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  logo: {
    resizeMode: "stretch",
    height: 200,
    width: "100%"
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 40
  },
  bar: {
    height: 6,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    width: 60,
    alignSelf: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginVertical: 10
  },
  description: {
    fontSize: 14,
    color: "#4E4E4E",
    textAlign: "justify"
  },
  thumb: {
    width: 30,
    height: 30,
    borderWidth: 7,
    borderColor: "rgba(249,216,217,0.6)"
  },
  track: {
    height: 8,
    borderRadius: 5
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sizeText: {
    fontSize: 16,
    color: "#9A9A9A"
  },
  boldSizeText: {
    color: "#000",
    fontWeight: "bold"
  },
  priceText: {
    color: "#121212",
    fontSize: 24,
    fontWeight: "bold"
  },
  acctualPrice: {
    fontSize: 16,
    color: "#9A9A9A",
    textDecorationLine: "line-through",
    marginLeft: 10
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  counter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F5F2",
    width: 110,
    height: 35,
    borderRadius: 10
  },
  counterBtn: {
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 10
  },
  decrement: {
    backgroundColor: "#E1E1E1"
  },
  increment: {
    backgroundColor: "#E84C4F"
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  },
  availabilityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 15
  },
  statusText: { fontSize: 12, fontWeight: "bold", color: "#626468" },
  cartContainer:{ flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",},
  availability: {
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default ProductDetails;
