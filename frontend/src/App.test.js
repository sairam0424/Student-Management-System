  // // import { fireEvent, render, screen } from "@testing-library/react";
  // // import App from "./App";
  // // import { BrowserRouter } from "react-router-dom";

  // // test("renders stiudent mgmt", () => {
  // //   render(
  // //     <BrowserRouter>
  // //       <App />
  // //     </BrowserRouter>
  // //   );
  // //   // const linkElement = screen.getByText(
  // //   //   /Show features/i
  // //   // );
  // //   // expect(linkElement).toBeInTheDocument();

  // //   // Find the button and click it
  // //   // const button = screen.getByText(/show features/i);
  // //   // fireEvent.click(button);

  // //   // // Check if the message is updated
  // //   // expect(screen.getByText(/hide features/i)).toBeInTheDocument();

  // //   // const button = screen.getByText(/login/i);
  // //   // fireEvent.click(button);

  // //   // Check if the message is updated
  // //   //expect(screen.getByText(/email address/i)).toBeInTheDocument();
  // //   fireEvent.click(screen.getByText("Login"));
  // //   // expect(screen.getByText(/Login/i)).toBeInTheDocument();

  // //   // expect(screen.getByText(/Login/i)).toBeInTheDocument();
  // // });

  // import { test, expect } from '@playwright/test';

  // test('SMS for the role', async ({ page }) => {
  //   await page.goto('http://localhost:3000/');
  //   // eslint-disable-next-line testing-library/prefer-screen-queries
  //   await page.getByRole('link', { name: 'Signup' }).click();
  //   await page.getByPlaceholder('Enter your first name').click();
  //   await page.getByPlaceholder('Enter your first name').fill('user1');
  //   await page.getByPlaceholder('Enter your last name').click();
  //   await page.getByPlaceholder('Enter your last name').fill('last');
  //   await page.getByPlaceholder('Enter your email').click();
  //   await page.getByPlaceholder('Enter your email').fill('usermail.gmail.com');
  //   await page.getByPlaceholder('Enter your password').click();
  //   await page.getByPlaceholder('Enter your password').fill('1234');
  //   await page.getByRole('button', { name: 'User' }).click();
  //   await page.getByRole('button', { name: 'User' }).press('ControlOrMeta+-');
  //   await page.getByRole('button', { name: 'User' }).press('ControlOrMeta+-');
  //   await page.getByRole('button', { name: 'User' }).press('ControlOrMeta+-');
  //   await page.getByRole('button', { name: 'User' }).click();
  //   await page.getByRole('button', { name: 'User' }).press('ControlOrMeta+-');
  //   await page.getByRole('button', { name: 'User' }).press('ControlOrMeta+-');
  //   await page.getByRole('button', { name: 'Submit' }).click();
  //   await page.getByPlaceholder('Enter your email').click();
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').press('ArrowLeft');
  //   await page.getByPlaceholder('Enter your email').fill('usermail@gmail.com');
  //   await page.getByRole('button', { name: 'Submit' }).click();
  //   await page.getByRole('button', { name: 'Already have an account? Login' }).click();
  //   await page.getByPlaceholder('Enter your email').click();
  //   await page.getByPlaceholder('Enter your email').fill('yaa@gmail.com');
  //   await page.getByPlaceholder('Enter your password').click();
  //   await page.getByPlaceholder('Enter your password').fill('1234');
  //   await page.getByRole('button', { name: 'Login' }).click();
  //   await page.getByText('aaasAge: 131Email: tfe1st@').click();
  //   await page.locator('.d-flex > .btn').first().click();
  //   await page.getByRole('dialog').getByRole('button').first().click();
  //   await page.getByRole('dialog').getByRole('button').first().click();
  //   await page.getByRole('button', { name: 'Close' }).click();
  //   await page.getByPlaceholder('Search students by name...').click();
  //   await page.getByPlaceholder('Search students by name...').fill('');
  //   await page.getByRole('button', { name: 'Logout' }).click();
  //   await page.getByPlaceholder('Enter your email').click();
  //   await page.getByPlaceholder('Enter your email').fill('yayaya@gmail.com');
  //   await page.getByPlaceholder('Enter your email').press('Tab');
  //   await page.getByPlaceholder('Enter your password').fill('1234');
  //   await page.getByRole('button', { name: 'Login' }).click();
  //   await page.getByText('aaasAge: 131Email: tfe1st@').click();
  //   await page.getByText('ssdAge: 32Email: ysaaaa@gmail').click();
  //   // await page.getByText('Email: yaataa@gmail.com').click();
  //   await page.getByText('11Age: 11Email: yaataa@gmail.').click();
  //   await page.locator('div:nth-child(9) > div > .d-flex > button:nth-child(2)').click();
  //   await page.locator('div:nth-child(3) > div > .d-flex > button').first().click();
  //   await page.getByPlaceholder('Enter student name').click();
  //   await page.getByPlaceholder('Enter student name').fill('wweee');
  //   await page.getByRole('button', { name: 'Update Student' }).click();
  //   await page.getByRole('button', { name: 'Add New Student' }).click();
  //   await page.getByPlaceholder('Enter student name').click();
  //   await page.getByPlaceholder('Enter student name').fill('newtest');
  //   await page.getByPlaceholder('Enter student age').click();
  //   await page.getByPlaceholder('Enter student age').fill('21');
  //   await page.getByPlaceholder('Enter student email').click();
  //   await page.getByPlaceholder('Enter student email').fill('new@gmail.com');
  //   await page.getByPlaceholder('Enter student marks').click();
  //   await page.getByPlaceholder('Enter student marks').fill('23');
  //   await page.getByPlaceholder('Enter attendance percentage').click();
  //   await page.getByPlaceholder('Enter attendance percentage').fill('43');
  //   await page.getByPlaceholder('Enter image URL').click();
  //   await page.getByPlaceholder('Enter image URL').fill('new');
  //   await page.getByRole('button', { name: 'Add Student' }).click();
  //   await page.getByText('newtestAge: 21Email: new@').click();
  //   await page.getByPlaceholder('Search students by name...').click();
  //   await page.getByPlaceholder('Search students by name...').fill('');
  //   await page.getByRole('button', { name: 'Logout' }).click();
  //   await page.getByRole('link', { name: 'Home SMS' }).click();
  //   await page.getByRole('button', { name: 'Show Features' }).click();
  //   await page.getByRole('button', { name: 'Hide Features' }).click();
  //   await page.getByRole('button', { name: 'Show Info' }).click();
  //   await page.getByRole('button', { name: 'Hide Info' }).click();
  // });
