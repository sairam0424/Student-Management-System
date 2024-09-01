/* This JavaScript code snippet is defining routes for a web application using React Router. Here's a
breakdown of what it's doing: */
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/userdashboard",
    element: <ProtectedRoute element={UserDashboard} allowedRoles={["user"]} />,
  },
  {
    path: "/admindashboard",
    element: (
      <ProtectedRoute element={AdminDashboard} allowedRoles={["admin"]} />
    ),
  },
];
