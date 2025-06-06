import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import NavBar from "./components/Header";

const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <NavBar /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
