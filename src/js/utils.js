import axios from "axios";
import { drinksDescPrice, platesDescPrice } from "./data";

// NOTE: we are fetching only margaritas!
const cocktailDbURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

// NOTE: we are fetching only plates with "v" as starter letter!
const mealDbUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=v";

export async function fetchDrinks() {
  //NOTE: Here we are fetching drinks and at the same time formatting
  //everyting!!
  const response = await axios.get(cocktailDbURL);
  const drinks = response.data.drinks.map((drink, index) => {
    const { idDrink: id, strDrink: name, strDrinkThumb: img } = drink;
    const { desc, price } = drinksDescPrice[index];
    return { id, name, img, desc, price };
  });

  return { drinks };
}
export async function fetchPlates() {
  //NOTE: Here we are fetching drinks and at the same time formatting
  //everyting!!
  const response = await axios.get(mealDbUrl);
  const meals = response.data.meals.map((meal, index) => {
    const { idMeal: id, strMeal: name, strMealThumb: img } = meal;
    const { desc, price } = platesDescPrice[index];
    return { id, name, img, desc, price };
  });

  return { meals };
}
