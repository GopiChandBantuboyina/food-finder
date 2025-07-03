import { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const apiKey = "ad33e3c54ab14a399752ed2d41d6e2fa"; //but usually store inside the environment variables donexpose.

  useEffect(() => {
    async function fetchFood() {
      const resp = await fetch(`${URL}?apiKey=${apiKey}`);
      const data = await resp.json();

      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  if (isLoading) {
  return <h1>Check the Internet connection please!!!</h1>; // or you can show a spinner here if needed
}

return (
  <div className={styles.recipeCard}>
    <div>
      <h1 className={styles.recipeName}>{food.title}</h1>
      <img className={styles.recipeImage} src={food.image} alt={food.title} />
      <div className={styles.recipeDetails}>
        <span>
          <strong>⌚{food.readyInMinutes} Minutes</strong>
        </span>
        <span>
          <strong>👩‍👧‍👦Serves {food.servings}</strong>
        </span>
        <span>
          <strong>
            {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}
          </strong>
        </span>
        <span>
          <strong>{food.vegan ? "🐄 Vegen" : ""}</strong>
        </span>
      </div>
      <div>
        <span>₹ {food.pricePerServing} Per Serving</span>
      </div>
    </div>

    <h2>Ingredients</h2>
    <ItemList food={food} isLoading={isLoading} />

    <h2>Instructions</h2>
    <div className={styles.recipeInstructions}>
      <ol>
        {food.analyzedInstructions?.[0]?.steps?.map((step) => (
          <li key={step.number}>{step.step}</li>
        ))}
      </ol>
    </div>
  </div>
);

}
