import React, { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"

function CartBox({navigation, quantity}) {

    return (
    <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate("cart")}>
        <Image
            style={styles.cart}
            source={{ uri: "https://img.icons8.com/officexs/344/shopping-cart.png" }}
        />
        <Text style={styles.text}>{quantity ? quantity : "0"}</Text>
    </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    cartContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center",},
    cart: { height: 20, width: 20, resizeMode: "contain" },
    text: { fontSize: 12, fontWeight: "bold", marginTop: -10 , backgroundColor: "#000", color: "#FFF", paddingHorizontal: 4, paddingVertical: 0, borderRadius: 8}
})

export default CartBox;