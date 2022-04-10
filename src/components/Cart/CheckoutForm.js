import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useRef } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveCharsLong = (value) => value.trim().length === 6;

export const CheckoutForm = (props) => {
  const [formInputsValidity, setFormInputsVaildity] = useState({
    name: true,
    street: true,
    pincode: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const pincodeRef = useRef();
  const cityRef = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const nameValue = nameRef.current.value;
    const streetValue = streetRef.current.value;
    const pincodeValue = pincodeRef.current.value;
    const cityValue = cityRef.current.value;

    const nameIsValid = !isEmpty(nameValue);
    const streetIsValid = !isEmpty(streetValue);
    const pincodeIsValid = isFiveCharsLong(pincodeValue);
    const cityIsValid = !isEmpty(cityValue);

    setFormInputsVaildity({
      name: nameIsValid,
      street: streetIsValid,
      pincode: pincodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && pincodeIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    } 

    props.onConfirmOrderSubmission({
        name :nameValue,
        street:streetValue,
        pincode:pincodeValue,
        city:cityValue
    })
  };

  const nameDivStyle = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;

  const streetDivStyle = `${styles.control} ${
    formInputsValidity.street ? "" : styles.invalid
  }`;
  const pincodeDivStyle = `${styles.control} ${
    formInputsValidity.pincode ? "" : styles.invalid
  }`;
  const cityDivStyle = `${styles.control} ${
    formInputsValidity.city ? "" : styles.invalid
  }`;
  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className={nameDivStyle}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formInputsValidity.name && <p>Please provide a valid name</p>}
      </div>
      <div className={streetDivStyle}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef}></input>
        {!formInputsValidity.street && <p>Please provide a valid street</p>}
      </div>
      <div className={pincodeDivStyle}>
        <label htmlFor="pincode">Pincode</label>
        <input type="text" id="pincode" ref={pincodeRef}></input>
        {!formInputsValidity.pincode && (
          <p>Please provide a valid pincode of length 5</p>
        )}
      </div>
      <div className={cityDivStyle}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}></input>
        {!formInputsValidity.city && <p>Please provide a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
