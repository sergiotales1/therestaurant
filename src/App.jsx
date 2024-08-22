import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";

import HomeLayout from "./pages/HomeLayout";
import Drinks from "./pages/Drinks";
import Cardapio from "./pages/Cardapio";
import {
  fetchDrinks,
  fetchPlates,
  handleDashboardRequests,
  handleLoginRequests,
  handleReservaRequests,
  handleSignupRequests,
} from "./js/utils";
import Reserva from "./pages/Reserva";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/drinks",
        element: <Drinks />,
        loader: fetchDrinks,
      },
      {
        path: "/cardapio",
        element: <Cardapio />,
        loader: fetchPlates,
      },
      {
        path: "/reserva",
        element: <Reserva />,
        action: handleReservaRequests,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      },
      {
        path: "/login",
        element: <Login />,
        action: handleLoginRequests,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: handleSignupRequests,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: handleDashboardRequests,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
