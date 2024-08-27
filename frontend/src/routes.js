import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
//   { path: "/dashboard", element: <Dashboard /> },
{path:'/userdashboard',element:<UserDashboard/>},
{path:'/admindashboard',element:<AdminDashboard/>}
];
