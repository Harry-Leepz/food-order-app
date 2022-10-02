import React from "react";
import { useReducer } from "react";

import CartContext from "./cart-context";

// default cart state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// cart reducer function
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // rather than modifying the old array, concat returns a new array
    const updatedItems = state.items.concat(action.item);

    // find the index of the item added to the cart
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // calculate the total value of cart items
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

/*
  Component to handle the provision
  of Cart data using the context api
*/
const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // add an item to the cart
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  // remove an item from the cart
  const removeItemFromCartHandler = (id) => {};

  // cart content which will be provided and updated
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
