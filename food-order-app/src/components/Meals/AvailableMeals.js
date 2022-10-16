import Card from "../Ui/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-customhooks-87d57-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const data = await response.json();

      // Firebase specific => trasform object data into array.
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
        key={meal.id}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
