import {
  Homepage,
  NotFoundPage,
  Register,
  Login
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/homepage",
      element: <Homepage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
