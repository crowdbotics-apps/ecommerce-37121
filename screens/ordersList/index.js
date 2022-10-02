import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Pressable, RefreshControl, Dimensions, Image } from "react-native";

import { fetchOrderHistory } from "../../apis";
const deviceWidth = Dimensions.get("window").width;

const OrderHistoryModal = ({ navigation }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);
    getOrders();
  }, []);

  const getOrders = async () => {
    await fetchOrderHistory()
      .then(res => {
        setRefresh(false);
        setOrderHistory(res);
      }).catch((error) => { console.log("Error: ", error); setRefresh(false); });
  };

  const handleViewOrder = (item) => {
    navigation.navigate("orderDetails", { item });
  }

  const renderItem = ({ item }) => {
    if (!item) return;
    const dateTime = item.date_placed.split("T")
    const splitTime = dateTime[1].split(":");
    return (
      <Pressable onPress={() => handleViewOrder(item)}>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" }} style={styles.productImage} />
            <View>
              <Text style={styles.mainText}>Order# {item.number}</Text>
              <Text style={styles.subText}>
                {dateTime[0]} | {splitTime[0]}:{splitTime[1]}
              </Text>
              <Text>{item.shipping_method}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.mainText}>
              {item?.lines?.length.toString()} Item | ${item.total_incl_tax}
            </Text>
            <Pressable style={[styles.button, { backgroundColor: item?.status === "Completed" ? "#63b530" : item?.status === "Pending" ? "#ead00e" : "#f21313" }]}>
              <Text style={styles.btnText}>{item?.status}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };
  return (


    <View style={styles.modalView}>
      <View>
        
        <FlatList
          data={orderHistory}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onRefresh={getOrders}
          refreshing={refresh}
          style={{ width: deviceWidth - 20, paddingTop: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={getOrders}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  modalView: {
    paddingVertical: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25
  },
  modalCloseBtn: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "black",
    borderColor: "transparent",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    zIndex: 10
  },
  modalCloseBtnTxt: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    padding: 0
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginRight: 20
  },
  mainText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 5
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 70
  },
  button: {
    paddingHorizontal: 10,
    height: 30,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 13
  },
});

export default OrderHistoryModal;