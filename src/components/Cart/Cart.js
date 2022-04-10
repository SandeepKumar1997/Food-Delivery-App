import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../store/Cart-context";
import CartItem from "./CartItem";
import { CheckoutForm } from "./CheckoutForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const sendDataHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://test-react-http-580c1-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cart_dish = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalContents = (
    <React.Fragment>
      {cart_dish}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm
          onConfirmOrderSubmission={sendDataHandler}
          onCancel={props.onClose}
        ></CheckoutForm>
      )}
      {!isCheckout && modalButtons}
    </React.Fragment>
  );

  const submittingModal = <p>Sending Order Data ........</p>;

  const submittedModal = (
    <React.Fragment>
      <p>Order submitted succesfully !!</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onClose}>
      {!isSubmitting && !didSubmit && modalContents}
      {isSubmitting && submittingModal}
      {!isSubmitting && didSubmit && submittedModal}
    </Modal>
  );
};

export default Cart;
