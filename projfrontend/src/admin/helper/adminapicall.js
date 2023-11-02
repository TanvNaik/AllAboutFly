import { API } from "../../backend";

// Categoriy Calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
// get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
// get a category
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET"
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


// delete a category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// update category
export const updateCategory = (categoryId, category, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name: category })
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Product Calls

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
// get all products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// get products by category
export const getProductsbyCategory = (categoryId) =>{
  return fetch(`${API}/products/${categoryId}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
} 

// get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// delete a product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Order Calls

// get all orders
export const getAllOrders = (userId, token) => {
  return fetch(`${API}/order/all/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// update an order
export const updateOrderStatus = (orderId, userId, token, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: status
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// get a category
export const getOrder = (orderId) => {
  return fetch(`${API}/order/${orderId}`, {
    method: "GET"
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
