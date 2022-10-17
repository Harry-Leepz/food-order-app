import React from "react";

// initialize Cart context
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItemToCart: (item) => {},
  rmoveItemFromCart: (id) => {},
  clearCart: () => {},
});

export default CartContext;
