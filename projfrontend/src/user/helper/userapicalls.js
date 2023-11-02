import { API } from "../../backend";
export const getUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
}
export const getUserOrders = (userId) => {
  return fetch(`${API}/orders/${userId}`,{
    method:"GET"
  }).then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
}

export const getUserCart = (userId) => {
  return fetch(`${API}/cart/user/${userId}`,{
    method:"GET"
  }).then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
}
export const addItemToCart = (userId, productId, productCost) => {

  return fetch(`${API}/cart/user/${userId}/${productId}/${productCost}`,{
    method: "PUT"
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
};

export const removeItemfromCart = (userId, productId) => {

  return fetch(`${API}/cart-remove/user/${userId}/${productId}`,{
    method: "PUT"
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
};

export const cartUpdate = (cartId, newProducts, price ) => {

  return fetch(`${API}/cart-update/user/${cartId}/${price}`,{
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(newProducts)
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
};

