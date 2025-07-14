import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/Profile";
import { MainBanner } from "./components/MainBanner";
import { Books } from "./components/books/index";
import { BookDetailPage } from "./components/BookDetailPage";

const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/profile", element: <Profile /> },
  { path: "/", element: <MainBanner /> },
  { path: "/books", element: <Books /> },
  { path: "/details/:id", element: <BookDetailPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
