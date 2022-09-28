import React from "react"
// @ts-ignore
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

import ProductListingScreen from "../screens/products"
import ProductDetails from "../screens/productDetails"
import ShoppingCart from "../screens/myCart"
import Billing from "../screens/billing"
import ShippingAddress from "../screens/shipping"
import OrderComplete from "../screens/orderComplete"

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Products"
          component={ProductListingScreen}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="Billing" component={Billing} />
        <Stack.Screen name="Shipping" component={ShippingAddress} />
        <Stack.Screen name="OrderComplete" component={OrderComplete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
