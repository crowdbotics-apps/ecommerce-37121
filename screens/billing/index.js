// @ts-nocheck
import React, { useContext, useState } from 'react'
import { Text, Image, StyleSheet, View, ScrollView, LogBox } from 'react-native'
import Button from '../../components/Button'
import DetailsCard from '../../components/DetailCard'
import { modules } from '@modules'
import { useEffect } from 'react'
import { addUserAddress } from '../../store'
import Loader from '../../components/Loader'
import { GlobalOptionsContext } from '@options';
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../store'

const Billing = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const gOptions = useContext(GlobalOptionsContext)
  const [address, setAddress] = useState({
    formatted_address: "",
    country: "",
    state: "",
    city: "",
    lat: "",
    lng: ""
  });
  // @ts-ignore
  const user = useSelector(state => state?.ecommerce?.user);
  useEffect(() => {
    setFirstName(user?.first_name || user?.username);
    setLastName(user?.last_name);
  }, [user])

  const AddressAutoComplete = modules[0].value.navigator //module_index : position of the module in modules folder
  const [cartProducts, setCartProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState("");

  const onSelectAddress = data => {
    setAddressError("")
    const arr = data.formatted_address.split(',')
    const reverse = arr.reverse()
    setAddress({
      formatted_address: data.formatted_address,
      country: reverse[0],
      state: reverse[1],
      city: reverse[2],
      lat: data.geometry.location.lat,
      lng: data.geometry.location.lng
    })
  }

  const handleAddAddresses = async () => {
    if (address.city && address.state) {
      setIsLoading(true)
      await dispatch(addUserAddress({
        title: gOptions.title,
        first_name: firstName,
        last_name: lastName,
        line1: address.formatted_address,
        line4: address.city,
        state: address.state,
        is_default_for_shipping: true,
        is_default_for_billing: true,
        country: gOptions.oscar_countries,
        lat: address.lat,
        lng: address.lng,
      })).then((res) => {
        setIsLoading(false)
        navigation.navigate("shipping", { basketData, address })
      }).catch((err) => {
        setIsLoading(false);
        console.log("Error: ", err)
      })
    } else {
      setAddressError("No address is provided!")
    }
  };

  const handleGetUser = async () => {
    await dispatch(getUserInfo()).then((res) => { }).catch((err) => console.log(err))
  }


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    if (route?.params?.basketData) {
      const { line_details } = route?.params?.basketData
      setCartProducts(line_details);
      setBasketData(route?.params?.basketData)
    }
    handleGetUser();
  }, []);

  return (
    <View style={styles.wrapper}>
      {isLoading && <Loader></Loader>}
      <DetailsCard basketData={basketData} />
      <View style={styles.container}>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.deliveryDetails}>Delivery details</Text>
          <Text style={styles.label}>Address</Text>
          <View style={{ zIndex: 100 }}>
            <AddressAutoComplete
              onAddressSelect={(data, address) => onSelectAddress(address)}
            />
            <Text style={styles.errorStyle}>{addressError}</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cartProducts &&
              cartProducts.map((product, index) => (
                <OrderCard item={product} key={index} index={index} />
              ))}
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <Button
            buttonText={"Proceed"}
            onPress={handleAddAddresses}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#FFF', width: '100%', height: "100%" },
  container: {
    paddingTop: 0,
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF'
  },
  headerCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    elevation: 15,
    borderRadius: 8,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  cardTextOne: {
    fontSize: 13,
    color: '#424347'
  },
  cardTextTwo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424347'
  },
  deliveryDetailsContainer: {
    marginBottom: 20,
  },
  deliveryDetails: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1E2022'
  },
  label: {
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  inputIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#C4C4C4',
    borderRadius: 10,
  },
  inputStyle: {
    flex: 1,
    borderWidth: 0,
  },

  icon: {
    height: 18,
    width: 18,
    marginRight: 10,
  },
  btnContainer: {
    marginVertical: 20,
    paddingHorizontal: '10%'
  },
  cardContainer: {
    // height: 250,
  },
  errorStyle: {
    color: "red",
    marginLeft: 20, marginTop: 5
  }
})

export default Billing

const OrderCard = ({ item }) => {
  const { product } = item
  return (
    <View style={orderStyles.container}>
      <View style={orderStyles.order}>
        <View style={orderStyles.image}>
          <Image
            source={{ uri: product?.images[0]?.original }}
            style={orderStyles.productImage}
          />
        </View>
        <View style={orderStyles.description}>
          <Text style={orderStyles.orderName}>{product?.title}</Text>
          <Text style={orderStyles.quantity}>Quantity: {item?.quantity}</Text>
          <Text style={orderStyles.inStock}>In stock</Text>
        </View>
      </View>
      <View>
        <Text style={orderStyles.orderPrice}>${product?.price?.excl_tax}</Text>
      </View>
    </View>
  )
}

const orderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    elevation: 15,
    borderRadius: 10,
  },
  fontWeightBold: {
    fontWeight: 'bold'
  },
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  productImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: 'contain'
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  orderName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  quantity: {
    fontSize: 13,
    color: '#3E3E3E'
  },
  inStock: {
    fontSize: 13,
    color: '#12D790'
  },
  orderPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10,
  },
})
