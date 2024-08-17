import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";

import HomeLayout from "./pages/HomeLayout";
import Drinks from "./pages/Drinks";
import Cardapio from "./pages/Cardapio";
import { fetchDrinks, fetchPlates } from "./js/utils";
import Reserva from "./pages/Reserva";
import Sobre from "./pages/Sobre";

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
      },
      {
        path: "/sobre",
        element: <Sobre />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
