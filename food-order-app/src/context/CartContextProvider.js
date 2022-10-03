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
    // find the index of the item added to the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // find if an item in the cart exists with the matching id
    const existingCartItem = state.items[existingCartItemIndex];

    /* 
      Check to see if an item is already in the cart, 
      if so, update the quantity and price of cart
      else, add the item to the cart
    */
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

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
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

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
