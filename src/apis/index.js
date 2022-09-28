import { getGlobalOptions } from "@options"
import { getItem } from "../utils"

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

export const getProductsList = async () => {
  const response = await fetch(`${BASE_URL}/api/products/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

export const getProduct = async url => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

export const getPrice = async url => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

export const productAvailability = async url => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

export const addToBasket = async obj => {
  const token = await getItem("token")
  const response = await fetch(`${BASE_URL}/api/basket/add-product/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token" + token
    },
    body: JSON.stringify(obj)
  });
  const data = await response.json();
  return data;
};

export const getBasket = async () => {
  const token = await getItem("token")
  const response = await fetch(`${BASE_URL}/api/baskets/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token" + token
    }
  });
  const data = await response.json();
  return data;
};

export const removeFromBasket = async url => {
  const token = await getItem("token")
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token" + token
    }
  });
  const data = await response.json();
  return data;
};

export const getUserAddress = async () => {
  const token = await getItem("token")
  const response = await fetch(`${BASE_URL}/api/useraddresses/`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Token" + token
    }
  });
  const data = await response.json();

  return data;
};
