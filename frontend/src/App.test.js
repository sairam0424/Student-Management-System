import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders stiudent mgmt ", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // const linkElement = screen.getByText(
  //   /Show features/i
  // );
  // expect(linkElement).toBeInTheDocument();

  // Find the button and click it
  // const button = screen.getByText(/show features/i);
  // fireEvent.click(button);

  // // Check if the message is updated
  // expect(screen.getByText(/hide features/i)).toBeInTheDocument();

  // const button = screen.getByText(/login/i);
  // fireEvent.click(button);

  // Check if the message is updated
  //expect(screen.getByText(/email address/i)).toBeInTheDocument();
   fireEvent.click(screen.getByText('Login'))
 // expect(screen.getByText(/Login/i)).toBeInTheDocument();





  // expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
