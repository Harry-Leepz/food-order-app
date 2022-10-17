import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // get form input values
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredCity = cityInput.current.value;

    // check if values are not empty strings
    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = !isEmpty(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    // conditional to check form is valid
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput} />
        {!formInputsValidity.name && <small> Please enter your name!</small>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput} />
        {!formInputsValidity.street && (
          <small> Please enter your street address!</small>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInput} />
        {!formInputsValidity.postal && (
          <small> Please enter your postal code!</small>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInput} />
        {!formInputsValidity.city && <small> Please enter your city!</small>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
