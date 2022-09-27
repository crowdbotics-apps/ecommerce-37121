import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

export const getProductsList = async () => {
    const response = await fetch(
      `${BASE_URL}/api/products/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.json();
    return data;
  };


  export const getProduct = async (url) => {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.json();
    return data;
  };

  export const getPrice = async (url) => {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.json();
    return data;
  };

  export const productAvailability = async (url) => {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.json();
    return data;
  };

  export const getBasket = async (url) => {
    const response = await fetch(
      `${BASE_URL}/api/baskets/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
      }
    );
    const data = await response.json();
    return data;
  };
  
  