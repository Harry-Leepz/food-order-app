import { useEffect, useState } from "react";
import Card from "../Ui/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-customhooks-87d57-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      // error handling
      if (!response.ok) {
        throw new Error("Something went wrong! :(");
      }

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
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading Meals</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.loading}>
        <p>{error}</p>
      </section>
    );
  }

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
