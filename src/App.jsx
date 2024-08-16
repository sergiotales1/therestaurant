import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";

import HomeLayout from "./pages/HomeLayout";
import Drinks from "./pages/Drinks";
import { fetchDrinks } from "./js/utils";

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
