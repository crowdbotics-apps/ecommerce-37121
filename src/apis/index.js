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


  export const addToBasket = async (obj) => {
    const response = await fetch(
      `${BASE_URL}/api/basket/add-product/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: "Token bc1b3be1257f4a2739031f35730d1ea622b84a61",
        body: JSON.stringify(obj)    
      }
    );
    const data = await response.json();
    return data;
  };
  
  export const getBasket = async () => {
    const response = await fetch(
      `${BASE_URL}/api/baskets/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: "Token bc1b3be1257f4a2739031f35730d1ea622b84a61"      
      }
    );
    const data = await response.json();
    return data;
  };

  export const removeFromBasket = async (url) => {
    const response = await fetch(
      url,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: "Token bc1b3be1257f4a2739031f35730d1ea622b84a61"      
      }
    );
    const data = await response.json();
    return data;
  };


  export const getUserAddress = async () => {
    const response = await fetch(
      `${BASE_URL}/api/useraddresses/`,
      {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
          Authorization: "Token bc1b3be1257f4a2739031f35730d1ea622b84a61",
        },
        
      }
    );
    const data = await response.json();

    return data;
  };