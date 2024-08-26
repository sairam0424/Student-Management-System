import React from "react";
// import Login from './pages/Login'
// import Signup from './pages/Signup'
import NavBar from "./components/Navbar";
// import Home from "./pages/Home";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
function App() {
  const element = useRoutes(routes);
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;
