import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import { Checkbox, RadioButton } from "react-native-paper"
import { getCountry, getUserAddress, startCheckout } from "../../apis"
import Button from "../../components/Button"
import DetailsCard from "../../components/DetailCard"
import Input from "../../components/TextInput"

const ShippingAddress = ({ navigation, route }) => {
  const [address, setAddress] = useState({});
  const [checked, setChecked] = useState(true);
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [shippingCharge, setShippingCharge] = useState({
    currency: "USD",
    excl_tax: "0.0",
    tax: "0.0"
  });
  const [shippingAddress, setShippingAddress] = useState({});
  const [basketDataObj, setBasketDataObj] = useState({})

  const handleGetAddress = async () => {
    const res = await getUserAddress();
    setAddress(res[0]);
    setShippingAddress(res[0]);
    const response = await getCountry(res[0].country);
    setCountry(response.name)
  }
  
  // @ts-ignore
  useEffect(async () => {
    handleGetAddress();
    if (route?.params?.basketData) {
      const { basketData } = route?.params;
      setBasketDataObj(basketData);
      setShippingCharge({...shippingCharge, currency: basketData.currency, excl_tax: basketData.delivery_fee, tax: basketData.total_tax})
    }
  }, [])

  const handleCheckout = async () => {
    const obj = {
      basket: basketDataObj?.url,
      guest_email: "foo@example.com",
      total: basketDataObj?.total,
      shipping_charge: shippingCharge,
      shipping_method_code: "no-shipping-required",
      shipping_address: shippingAddress,
      payment: {
        stripe: {
          enabled: true,
          amount: basketDataObj?.total
        }
      }
    }
    try {
      const checkout = await startCheckout(obj);
      navigation.navigate('orderComplete', {userInfo: checkout?.shipping_address});

    } catch (error) {
      console.log("Error: ", error)
    }


  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={{ ...styles.inputText, fontWeight: "bold" }}>Payment options</Text>
            <View style={styles.paymentContainer}>
              <RadioButton
                value="first"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />
              <Text>Cash on delivery</Text>
            </View>
          </View>
        </View>
        <DetailsCard
          basketData={basketDataObj}
        />
        <View style={styles.mapHeader}>
          <Text style={styles.mapHeaderText}>Map</Text>
          <Image source={require("../../assets/locationIcon.png")} />
        </View>
        <View style={styles.mapImageContainer}>
          <Image
            source={require('../../assets/map.png')}
            style={styles.mapImage}
          />
        </View>
        <View style={styles.halfInputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>City</Text>
            <Input
              style={styles.input}
              onChangeText={text => setCity(text)}
              value={shippingAddress?.line4}
              placeholder="Enter"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Country</Text>
            <Input
              style={styles.input}
              onChangeText={text => setCountry(text)}
              value={country}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.halfInputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>State</Text>
            <Input
              style={styles.input}
              onChangeText={text => setState(text)}
              value={shippingAddress?.state}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Confirmation</Text>
            <View style={[styles.input, styles.confirmationBox]}>
              <Text style={styles.placeholderText}>Confitmation</Text>
              {/* <Image source={require("../assets/checkbox.png")} />
               */}
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                disabled={true}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            buttonText={'Continue'}
            onPress={handleCheckout}
          >
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.arrow}
            />
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    paddingHorizontal: 20
  },
  paletteContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    height: 45,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5
  },
  selected: {
    backgroundColor: "#fff",
    height: "80%",
    flex: 1,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginHorizontal: 5
  },
  unSelected: {
    height: "80%",
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#12D790",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  threeDots: {
    alignSelf: "center",
    marginTop: 20
  },
  inputs: {
    marginHorizontal: 15
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 15
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  placeholderText: {
    color: "#9B9B9B"
  },
  dropdownIcon: {
    position: "absolute",
    right: 30,
    top: 50
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 10
  },
  mapHeaderText: {
    fontSize: 16,
    color: "#111112",
    fontWeight: "bold"
  },
  mapImageContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  mapImage: {
    width: "100%",
    borderRadius: 10
  },
  halfInputs: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  confirmationBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  arrow: {
    marginLeft: 10,
    marginTop: 2
  },
  btnContainer: {
    marginVertical: 20,
    paddingHorizontal: "10%"
  }
});
export default ShippingAddress;
