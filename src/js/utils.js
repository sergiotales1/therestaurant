import axios from "axios";
import { drinksDescPrice, platesDescPrice } from "./data";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

// NOTE: we are fetching only margaritas!
const cocktailDbURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

// NOTE: we are fetching only plates with "v" as starter letter!
const mealDbUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=v";

export async function fetchDrinks() {
  //NOTE: Here we are fetching drinks and at the same time formatting
  //everyting!!
  try {
    // if we dont have the response into 5s...
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Fetch timed out")), 5000);
    });

    const response = await Promise.race([
      axios.get(cocktailDbURL),
      timeoutPromise,
    ]);
    const drinks = response.data.drinks.map((drink, index) => {
      const { idDrink: id, strDrink: name, strDrinkThumb: img } = drink;
      const { desc, price } = drinksDescPrice[index];
      return { id, name, img, desc, price };
    });
    return { drinks };
  } catch (error) {
    toast.error("Não temos acesso ao menu Drinks no momento...");
    return redirect("/");
  }
}
export async function fetchPlates() {
  //NOTE: Here we are fetching drinks and at the same time formatting
  //everyting!!
  try {
    // if we dont have the response into 5s...
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Fetch timed out")), 5000);
    });

    const response = await Promise.race([axios.get(mealDbUrl), timeoutPromise]);
    const meals = response.data.meals.map((meal, index) => {
      const { idMeal: id, strMeal: name, strMealThumb: img } = meal;
      const { desc, price } = platesDescPrice[index];
      return { id, name, img, desc, price };
    });
    return { meals };
  } catch (error) {
    toast.error("Não temos acesso ao Cardápio no momento...");
    return redirect("/");
  }
}

async function fetchReservas() {
  let reservas = [];
  try {
    const response = await axios.get(
      "https://therestaurantbackend.onrender.com/reservas",
      // "http://localhost:3000/reservas"
    );
    if (response.data.reservas) {
      reservas = response.data.reservas;
    }
  } catch (err) {
    console.error("handled on fetchReservas: " + err);
  }

  return { reservas };
}

export async function handleReservaRequests({ request }) {
  let data = Object.fromEntries(await request.formData());
  const { date } = getDate(data.date);
  let { reservas } = await fetchReservas();
  let sameTimeTakenTables = filterReservasByTime(date, reservas).map(
    (reserva) => {
      return reserva.table;
    },
  );
  if (sameTimeTakenTables.includes(parseInt(data.table))) {
    toast.error(
      "Já temos uma reserva na mesma hora e mesa...  Mesas ocupadas: " +
        sameTimeTakenTables.join(", "),
    );
    return null;
  }

  const formattedData = { ...data, date };
  try {
    const response = await axios.post(
      "https://therestaurantbackend.onrender.com/reservas",
      // "http://localhost:3000/reservas",
      formattedData,
    );
    toast.success("Reserva efetuada com sucesso!");
    console.log(response);
  } catch (error) {
    console.log(error);
    toast.error("Algo deu errado! " + error.message);
  }
  return null;
}

export async function handleLoginRequests({ request }) {
  let data = Object.fromEntries(await request.formData());
  try {
    const response = await axios.post(
      "https://therestaurantbackend.onrender.com/login",
      // "http://localhost:3000/login",

      data,
      {
        withCredentials: true,
        credentials: "include",
      },
    );
    toast.success("Login efetuado com sucesso!");
    console.log(response);
    if (response) {
      Cookies.set("jwt", response.data.token);
      return redirect("/");
    }
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      toast.error("Não foi possível conectar-se com o servidor!");
    } else {
      toast.error(error.response.data);
    }
    return null;
  }
  return null;
}

export async function handleSignupRequests({ request }) {
  let data = Object.fromEntries(await request.formData());
  console.log(data);
  try {
    const response = await axios.post(
      // "http://localhost:3000/signup"

      "https://therestaurantbackend.onrender.com/signup",
      data,
      {
        withCredentials: true,
        credentials: "include",
      },
    );
    toast.success("Conta criada com sucesso!");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      toast.error("Não foi possível conectar-se com o servidor!");
    } else {
      toast.error(error.response.data);
    }
  }
  return null;
}

export async function handleDashboardRequests() {
  const token = Cookies.get("jwt");
  let user = {};
  let reservas = [];
  if (token) {
    try {
      const response = await axios.post(
        // "http://localhost:3000/dashboard",

        "https://therestaurantbackend.onrender.com/dashboard",
        {
          token,
        },
        {
          withCredentials: true,
          credentials: "include",
        },
      );
      if (response.data.user) {
        user = response.data.user;
      }
      if (response.data.reservas) {
        reservas = response.data.reservas;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    }
  } else {
    toast.error("No token found into cookies");
  }
  return { user, reservas };
}

export function handleLogout() {
  Cookies.set("jwt", "", { expires: 1 / 48 });

  // Don't need anymore since we're doing it on navbar with href
  // window.location.replace("/");
}

function getDate(dateString) {
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
  const date = new Date(year, month - 1, day, hour, minute);

  return { date };
}
export function getDashboardDates({ reservas, date }) {
  const initialDate = new Date();
  const initialDateFormat = getDateFormat(initialDate);
  const initialValidReservas = filterReservasByTime(date, reservas);
  const InitialTablesTaken = getTablesTaken(initialValidReservas);

  // Next hour
  const oneHourLater = new Date(); // Get the current date and time
  oneHourLater.setHours(oneHourLater.getHours() + 1);

  // Next 2 hours
  const twoHoursLater = new Date(); // Get the current date and time
  twoHoursLater.setHours(twoHoursLater.getHours() + 2);

  // Next 3 hours
  const threeHoursLater = new Date(); // Get the current date and time
  threeHoursLater.setHours(threeHoursLater.getHours() + 3);

  // Next day
  const nextOneDayDate = new Date();
  nextOneDayDate.setDate(nextOneDayDate.getDate() + 1);

  // Two next days
  const nextTwoDaysDate = new Date();
  nextTwoDaysDate.setDate(nextTwoDaysDate.getDate() + 2);

  // Three next days
  const nextThreeDaysDate = new Date();
  nextThreeDaysDate.setDate(nextThreeDaysDate.getDate() + 3);

  return {
    initialDate,
    initialDateFormat,
    initialValidReservas,
    InitialTablesTaken,
    nextOneDayDate,
    nextTwoDaysDate,
    nextThreeDaysDate,
    oneHourLater,
    twoHoursLater,
    threeHoursLater,
  };
}

export function getDateFormat(date) {
  const today = new Date();
  const day = date.getDate();
  const zeroedDay = day > 10 ? day : `0${day}`;
  const month = date.getMonth() + 1; // 0 is january
  const zeroedMonth = month > 10 ? month : `0${month}`;
  const hour = date.getHours();
  const zeroedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
  let dateFormat = `${zeroedDay}/${zeroedMonth} - ${zeroedHour}`;

  if (date.getDate() === today.getDate()) {
    dateFormat = `Hoje ${dateFormat}`;
  }

  return dateFormat;
}

export function getTablesTaken(validReservas) {
  let tablesTaken = validReservas.map((reserva) => {
    return reserva.table;
  });
  return tablesTaken;
}

export function filterReservasByTime(date, reservas) {
  // return valid dates and tables taken
  const month = date.getMonth(); // 0 is january
  const day = date.getDate();
  const hour = date.getHours();

  let validReservas = reservas.filter((reserva) => {
    let reservaDate = new Date(reserva.date);
    const reservaDay = reservaDate.getDate();
    const reservaMonth = reservaDate.getMonth(); // 0 is january
    const reservaHour = reservaDate.getHours();

    if (reservaDay === day && reservaMonth === month) {
      if (reservaHour + 1 >= hour) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  });

  return validReservas;
}
