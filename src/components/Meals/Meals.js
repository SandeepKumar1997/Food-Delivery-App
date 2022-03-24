import React from "react";
import MealsAvailable from "./MealsAvailable";
import MealsDescription from "./MealsDescription";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsDescription></MealsDescription>
      <MealsAvailable></MealsAvailable>
    </React.Fragment>
  );
};


export default Meals;