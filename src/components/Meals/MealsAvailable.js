import styles from "./MealsAvailable.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const MealsAvailable = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const fetchItems = await fetch(
        "https://test-react-http-580c1-default-rtdb.firebaseio.com/meals.json"
      );

      if (!fetchItems.ok) {
        throw new Error("Something went wrong !!!");
      }
      const mealsData = await fetchItems.json();

      const mealsList = [];
      for (const key in mealsData) {
        mealsList.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }
      setAllMeals(mealsList);
      setIsLoading(false);
    };

    fetchMeals().catch((error)=>{
      setIsLoading(false)
      setHttpError(error.message)
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loadingMeals}>
        <p>Loading.......</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.loadingMeals}>
        <p>{httpError}</p>
      </section>
    );
  }

  const meals = allMeals.map((item) => (
    <MealItem id={item.id} key={item.id} meals={item}></MealItem>
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;
