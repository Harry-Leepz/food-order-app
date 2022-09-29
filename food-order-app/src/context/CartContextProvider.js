import React from "react";

import CartContext from "./cart-context";

/*
  Component to handle the provision
  of Cart data using the context api
*/
const CartContextProvider = (props) => {
  // add an item to the cart
  const addItemToCartHandler = (item) => {};

  // remove an item from the cart
  const removeItemFromCartHandler = (id) => {};

  // cart content which will be provided and updated
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
