import React from "react";
import foodImg from "../../assets/food.jpg";
import styles from "./Header.module.css";
import HeaderCart from "./HeaderCart";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1> Food Delivery App </h1>
        <HeaderCart onClickAction={props.onShow}></HeaderCart>
      </header>

      <div className={styles["main-image"]}>
        <img src={foodImg} alt="A treat of food">
          
        </img>
      </div>

    </React.Fragment>
  );
};

export default Header;
