import React, { useState } from 'react'
import { Text, Image, StyleSheet, View, ScrollView, LogBox } from 'react-native'
import Button from '../../components/Button'
import DetailsCard from '../../components/DetailCard'
import { modules } from '@modules'
import { useEffect } from 'react'
// import { getUserAddress } from '../apis';

const Billing = ({ navigation, route }) => {
  const [address, setAddress] = useState({ line1: "", state: "", line4: "" })
  const AddressAutoComplete = modules[0].value.navigator //module_index : position of the module in modules folder
  const [cartProducts, setCartProducts] = useState([]);
  const [basketData, setBasketData] = useState({});

  const onSelectAddress = address => {
    setAddress(address.formatted_address)
    const arr = address.formatted_address.split(',')
    const reverse = arr.reverse()
    setAddress({
      line1: reverse[reverse.length - 1],
      state: reverse[1],
      line4: reverse[2]
    })
  }

  const handleAddAddresses = async () => {
    // const res = await addUserAddress({
    //   title: 'Mr',
    //   first_name: 'Saad',
    //   last_name: "Abid",
    //   line1: 'Satellite Town',
    //   line2: '',
    //   line3: '',
    //   line4: '',
    //   line4: "Bwp",
    //   state: "Punjab",
    //   postcode: '',
    //   phone_number: '',
    //   notes: '',
    //   is_default_for_shipping: false,
    //   is_default_for_billing: false,
    //   country: 'https://drone-express-36671.botics.co/api/countries/US/',
    //   lat: null,
    //   lng: null,
    // })
    // console.log('Address: ', res);
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    if (route?.params?.basketData) {
      const { line_details } = route?.params?.basketData
      setCartProducts(line_details);
      setBasketData(route?.params?.basketData)
    }
  }, []);

  return (
    <View style={{ backgroundColor: '#FFF', width: '100%', height: "100%" }}>
      <DetailsCard basketData={basketData} />
      <View style={styles.container}>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.deliveryDetails}>Delivery details</Text>
          <Text style={styles.label}>Address</Text>
          <View style={{ zIndex: 100 }}>
            <AddressAutoComplete
              onAddressSelect={(data, address) => onSelectAddress(address)}
            />
          </View>
        </View>
        <View style={styles.cardContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cartProducts &&
              cartProducts.map((product, index) => (
                <OrderCard item={product} key={index} />
              ))}
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <Button
            buttonText={"Proceed"}
            onPress={() => navigation.navigate("shipping", { basketData })}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    height: 250,
  },
})

export default Billing

const OrderCard = ({ item }) => {
  const { product } = item
  console.log('images', product?.images[0].original);
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
        <Text style={orderStyles.orderPrice}>{product?.price?.excl_tax}</Text>
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
