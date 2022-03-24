import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCart.module.css";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-context";

const HeaderCart = (props) => {
  const [bumpValue, setBumpValue] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfItemsInCart = cartCtx.items.reduce(
    (prevValue, currentvalue) => {
      return prevValue + currentvalue.amount;
    },
    0
  );

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBumpValue(true);
    const timer=setTimeout(() => {
      setBumpValue(false);
    }, 300);

    return ()=>{
      clearTimeout(timer)
    }
  }, [cartCtx.items]);

  const buttonClass = `${styles.button} ${bumpValue ? styles.bump : ""}`;
  return (
    <button className={buttonClass} onClick={props.onClickAction}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfItemsInCart}</span>
    </button>
  );
};

export default HeaderCart;
