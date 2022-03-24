import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/Cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.meals.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meals.id,
      name: props.meals.name,
      amount: amount,
      price: props.meals.price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meals.name}</h3>
        <div className={styles.description}>{props.meals.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props.meals.id}
          onAddCartItem={addToCartHandler}
        ></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
