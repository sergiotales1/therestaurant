import axios from "axios";
import { drinksDescPrice, platesDescPrice } from "./data";
import { toast } from "react-toastify";

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

export async function handleReservaRequests({ request }) {
  let data = Object.fromEntries(await request.formData());
  const { date } = getIsoString(data.date);
  const formattedData = { ...data, date };
  console.log(formattedData);
  try {
    const response = await axios.post("http://localhost:3000", formattedData);
    toast.success("Reserva efetuada com sucesso!");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return null;
}

function getIsoString(dateString) {
  const [datePart, timePart, period] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  let [hour, minute] = timePart.split(":");

  // Convert hour to 24-hour format
  if (period === "PM" && hour !== "12") {
    hour = parseInt(hour, 10) + 12;
  } else if (period === "AM" && hour === "12") {
    hour = "00";
  }

  // Create the date string in ISO format
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:00`;

  return { date: isoDateString };
}
