// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  stores: [],
  userAddress: {},
  myBasket: [],
  cartItems: 0,
  country: "",
  orderList: [],
  user: null,
  api: { 
  loading: "idle",
  error: null }
};


const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState: initialState,
  reducers: {
    getVendorsList: (state, action) => {
      state.stores = action.payload;
    },
    cartCounts: (state, action) => {
      state.cartItems = action.payload;
    },
    getMyBasket: (state, action) => {
      state.myBasket = action.payload;
    },
    getUserAddresses: (state, action) => {
      state.userAddress = action.payload;
    },
    getUserInfo: (state, action) => {
      state.user = action.payload;
    },
    getUserCountry: (state, action) => {
      state.country = action.payload;
    },
    getOrdersList: (state, action) => {
      state.orderList = action.payload;
    },

  }
});

export const {
  getVendorsList,
  cartCounts,
  getUserAddresses,
  getMyBasket,
  getUserInfo,
  getUserCountry,
  getOrdersList } = ecommerceSlice.actions
export default ecommerceSlice.reducer;








// import storeSlices from "./*/*.slice.js"

// // Minimal check to see if imported slice has all properties of an actual slice
// const isValid = (slice) => {
//   const sliceProps = ["actions", "caseReducers", "name", "reducer"]
//   return Object.keys(slice).every(prop => sliceProps.includes(prop))
// }

// export const slices = storeSlices.filter(slice =>
//   slice.value.slice && isValid(slice.value.slice)
// ).map(slice => slice.value.slice);

// export const connectors = slices.reduce((acc, slice) => {
//   let name = slice.name.charAt(0).toUpperCase() + slice.name.slice(1)
//   acc[name] = slice.reducer
//   return acc
// }, {})

