import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import NavBar from "./components/Navbar";
import { routes } from "./routes"; // Ensure routes is defined correctly

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <NavBar />
      {element}
    </>
  );
}

export default App;
