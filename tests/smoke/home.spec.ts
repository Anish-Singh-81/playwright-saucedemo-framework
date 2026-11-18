import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home page', () => {

  test('TC01 - home page shows logo, header links and featured products @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.logo).toBeVisible();
    await expect(homePage.catalogLink).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.signupLink).toBeVisible();
    expect(await homePage.getCartCount()).toBe(0);

    const featuredProducts = ['Grey jacket', 'Noir jacket', 'Striped top'];
    for (const product of featuredProducts) {
      await expect(homePage.productLink(product)).toBeVisible();
    }
  });

  test('TC01b - Catalog link opens the product catalog @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.goToCatalog();

    await expect(page).toHaveURL(/\/collections\/all/);
  });

});