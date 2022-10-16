import { useContext } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../Ui/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = cartContext.totalAmount.toFixed(2);

  const hasItems = cartContext.items.length > 0;

  const addItemToCartHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const removeItemFromCartHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAddItem={addItemToCartHandler.bind(null, item)}
          onRemoveItem={removeItemFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <Checkout />
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
