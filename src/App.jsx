import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";

import HomeLayout from "./pages/HomeLayout";
import Drinks from "./pages/Drinks";
import Cardapio from "./pages/Cardapio";
import {
  drinksRqParams,
  handleLoginRequests,
  handleReservaRequests,
  handleSignupRequests,
  mealsRqParams,
  reservasRqParams,
} from "./js/utils";
import Reserva from "./pages/Reserva";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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
        loader: async () => {
          // Refetch the data if we don't have it already
          await queryClient.ensureQueryData(drinksRqParams());
          return null;
        },
      },
      {
        path: "/cardapio",
        element: <Cardapio />,
        loader: async () => {
          await queryClient.ensureQueryData(mealsRqParams());
          return null;
        },
      },
      {
        path: "/reserva",
        element: <Reserva />,
        action: async ({ request }) => {
          await handleReservaRequests({ request });
          await queryClient.invalidateQueries({
            queryKey: ["reservas", "user"],
            refetchType: "inactive",
          });
          return null;
        },
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
        loader: async () => {
          await queryClient.ensureQueryData(reservasRqParams());
          return null;
        },
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-center" autoClose={2500} />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
