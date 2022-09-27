import React from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";
const DetailsCard = ({orderAmount, deliveryCharges, totalAmount}) => {
    return (
      <View style={detailsCardStyles.detailsCard}>
        <View style={detailsCardStyles.pricing}>
          <Text style={detailsCardStyles.pricingText}>Order</Text>
          <Text style={detailsCardStyles.pricingText}>{orderAmount}$</Text>
        </View>
        <View style={detailsCardStyles.pricing}>
          <Text style={detailsCardStyles.pricingText}>Delivery</Text>
          <Text style={detailsCardStyles.pricingText}>{deliveryCharges}$</Text>
        </View>
        <View style={detailsCardStyles.pricing}>
          <Text style={detailsCardStyles.summaryText}>Summary</Text>
          <Text style={detailsCardStyles.summaryText}>{totalAmount}$</Text>
        </View>
      </View>
    );
};
  
  const detailsCardStyles = StyleSheet.create({
    detailsCard: {
      marginVertical: 10,
      marginHorizontal: 20,
      height: 100,
      borderRadius: 10,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      elevation: 10,
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    pricing: {
      marginHorizontal: 20,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      lineHeight: 20
    },
    pricingText: {
      fontSize: 14,
      lineHeight: 20,
      marginVertical: 1,
      color: "#3E3E3E"
    },
    summaryText: {
      marginVertical: 1,
      fontSize: 14,
      fontWeight: "bold",
      color: "#3E3E3E",
      lineHeight: 20
    }
  });
  
export default DetailsCard;