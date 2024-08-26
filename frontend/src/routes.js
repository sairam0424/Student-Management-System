import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
];
