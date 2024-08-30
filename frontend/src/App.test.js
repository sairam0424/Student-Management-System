import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Home SMS' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await page.getByRole('link', { name: 'Signup' }).click();
  await expect(page.locator('form')).toContainText('First Name');
  await expect(page.locator('form')).toContainText('Last Name');
  await expect(page.locator('form')).toContainText('Email address');
});