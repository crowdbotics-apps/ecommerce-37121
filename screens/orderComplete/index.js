import React from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";


const OrderComplete = ({navigation, route}) => {
  // @ts-ignore
  const user = useSelector(state => state?.ecommerce?.user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hi {user.first_name ? user.first_name : user.username},</Text>
        <Text style={styles.subHeading}>Your order has been completed.</Text>
      </View>
      <Image
        // @ts-ignore
        source={require("../../assets/orderCompleted.png")}
        style={styles.image}
      />
       <Text style={styles.inputText}>Your Order List</Text>
       <TouchableOpacity style={styles.inputContainer} onPress={()=>{navigation.replace('ordersList')}}>  
        <Text style={styles.input}>Click to see</Text>
     
        <Image
          // @ts-ignore
          source={require("../../assets/dropdownIcon.png")}
          style={styles.searchIcon}
        />
         </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold"
  },
  subHeading: {
    fontSize: 16
  },
  image: {
    alignSelf: "center",
    marginVertical: 30
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    height: 50
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
   
  },
  searchIcon: {
    position: "absolute",
    right: 30,
  }
});
export default OrderComplete;
