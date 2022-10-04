import { useContext } from "react";
import CartContext from "../../context/cart-context";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);

  const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${classes.bump}`;

  return (
    <button onClick={props.onClick} className={buttonClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
