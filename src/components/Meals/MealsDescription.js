import styles from "./MealsDescription.module.css";

const MealsDescription = () => {
  return (
    <section className={styles.summary}>
      <h2>Delicious Meals!! Now Delivered at your doorstep</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
    </section>
  );
};

export default MealsDescription;
