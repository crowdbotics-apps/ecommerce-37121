// @ts-nocheck
import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Pressable, RefreshControl, Dimensions, Image } from "react-native";
import { getOrderList } from "../../store";
import { useDispatch, useSelector } from "react-redux";
const deviceWidth = Dimensions.get("window").width;

const OrderHistoryModal = ({ navigation }) => {
  const dispatch = useDispatch();
  const [orderHistory, setOrderHistory] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // @ts-ignore
  const userOrders = useSelector(state => state?.ecommerce?.orderList);
  useEffect(() => {
    setOrderHistory(userOrders);
  }, [userOrders]);

  useEffect(() => {
    setRefresh(true);
    getOrders();
  }, []);

  const getOrders = async () => {
    await dispatch(getOrderList())
      .then(res => {
        setRefresh(false);
      }).catch((error) => { console.log("Error: ", error); setRefresh(false); });
  };

  const handleViewOrder = (item) => {
    navigation.navigate("orderDetails", { item });
  }

  const renderItem = ({ item }) => {
    if (!item) return;
    const dateTime = item?.date_placed.split("T")
    const splitTime = dateTime[1].split(":");
    return (
      <Pressable onPress={() => handleViewOrder(item)}>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.mainText}>Order# {item?.number}</Text>
              <Text style={styles.subText}>
                {dateTime[0]} | {splitTime[0]}:{splitTime[1]}
              </Text>
              <Text>{item.shipping_method}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.mainText}>
              {item?.lines?.length.toString()} Item | ${item?.total_incl_tax}
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
        <View style={styles.flexRow}>
          <Text style={styles.fnt16}>Orders List</Text>
          <Pressable onPress={() => navigation.navigate("storeList")}>
            <Image
              // @ts-ignore
              source={require("../../assets/home.png")}
              style={styles.homeIcon} />
          </Pressable>
        </View>
        {orderHistory.length === 0 && !refresh && <Text style={styles.noProduct}>No Orders Found</Text>}
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
  homeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain"
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
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  fnt16: {
    fontSize: 16,
    color: "#7C7C7C",
    fontWeight: "bold"
  },
  noProduct: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginTop: "20%", color: "#7d8087" }
});

export default OrderHistoryModal;