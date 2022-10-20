import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getVendorsList, cartCounts } from "../../store";
import { logoutUser, getVenders } from "../../apis";
import CartBox from "../../components/CartBox";
import Loader from "../../components/Loader";
import { cartCount } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
const StoreList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [vendors, setVendors] = useState([]);
  const [searchedStores, setSearchedStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState('0');

  // @ts-ignore
  const stores = useSelector(state => state?.ecommerce?.stores);
  const cartItems = useSelector(state => state?.ecommerce?.cartItems);
  useEffect(() => {
    setVendors(stores);
    setSearchedStores(stores);
    setProductQuantity(cartItems)
  },[stores || cartItems])

  const handleGetStores = async () => {
    setIsLoading(true)
    await getVenders().then((res) => {
      dispatch(getVendorsList(res))
      setIsLoading(false)
    });
  }

  const handleSearchStore = async (text) => {
    if (!text) {
      setVendors(searchedStores)
    } else {
      const searchedVenders = searchedStores.filter(element => element.name.toLowerCase().includes(text.toLowerCase()));
      setVendors(searchedVenders);
    }
  }

  const handleLogout = async () => {
    await logoutUser()
      .then(async (res) => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userID');
        navigation.navigate('login');
      })
      .catch((err) => console.log('Error: ', err));
  };

  const cartProducts = async () => {
    await cartCount().then((res) => dispatch(cartCounts(res))).catch((err) => console.log('Error: ', err));
  };

  useEffect(() => {
    handleGetStores();
    cartProducts();
  }, [])


  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.inputText}>Search</Text>
        <CartBox navigation={navigation} quantity={productQuantity} />
        <TouchableOpacity onPress={() => navigation.navigate("ordersList")}>
          <Image
            // @ts-ignore
            source={require("../../assets/orderIcon.png")}
            style={styles.orderImage}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={{ uri: 'https://www.iconsdb.com/icons/preview/gray/logout-xxl.png' }}
              style={styles.productImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search store"
        onChangeText={text => handleSearchStore(text)}
        placeholderTextColor="#9B9B9B"
      />
      <Text style={styles.subTitle}>Select store</Text>

      {
        isLoading ? <Loader></Loader> : <View>
          {vendors && vendors.map((store, index) =>
            <Pressable style={styles.cardWrapper} key={index} onPress={() => navigation.navigate("products", store)}>
              <View style={styles.walletCard}>
                <View style={styles.walletInner}>
                  <Image
                    source={{ uri: store?.cover || "cover" }}
                    style={styles.image}
                  />
                  <View style={styles.walletCarder}>
                    <Text style={styles.userText}>{store?.is_open ? 'Open' : 'Close'}</Text>
                    <Text style={styles.eventName}>{store?.name}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )
          }

        </View>
      }
      {vendors.length === 0 && !isLoading && <Text style={styles.noVendors}>No Stores Found!</Text>}

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 10 },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112",
    marginVertical: 10,
    width: '60%'
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },

  walletCard: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 10
  },
  cardWrapper: {
    paddingBottom: 5,
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  userText: { fontSize: 10, color: "#939396", marginLeft: 15 },
  eventName: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
    width: 115
  },
  image: {
    height: 33, width: 33, borderRadius: 30,
    overflow: "hidden",
  },
  subTitle: { fontSize: 18, fontWeight: "bold", color: "#26292A", marginLeft: 5, marginTop: 30, marginBottom: 20 },
  topContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 },
  productImage: { height: 20, width: 20, resizeMode: 'contain' },
  orderImage: { height: 24, width: 24, resizeMode: 'contain' },
  noVendors: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', color: "#7d8087" }
});

export default StoreList;
