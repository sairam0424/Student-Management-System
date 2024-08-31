import { useRoutes } from "react-router-dom";
import NavBar from "./components/Navbar";
import { routes } from "./routes";

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
