import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { Header } from "./components/Header";

const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/profile", element: <Header /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
