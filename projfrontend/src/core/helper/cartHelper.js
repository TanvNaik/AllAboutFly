export const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      if(cart.length === 0){
        cart.push({
          ...item,
          count: 1
        });
        }
        else{
          cart.map((prod) => {
            if(prod._id === item._id){
              prod.count++;
            }else{
              cart.push({
                ...item,
                count: 1
              });
            }
          })
        }
      
      
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  


  export const loadCart = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
  };
  
  export const removeItemFromCart = productId => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === productId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const cartEmpty = next => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  