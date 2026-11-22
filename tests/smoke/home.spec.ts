import { test, expect } from '../../fixtures/pageFixtures';
import { step, businessInfo } from '../../utils/reportUtils';
import productsData from '../../test-data/products.json';
import { Product } from '../../test-data/types';

const featuredProducts: Product[] = productsData;

test.describe('Home page', () => {

  test('TC01 - home page shows logo, header links and featured products @smoke', async ({ homePage, page }) => {
    await businessInfo({
      feature: 'Home page',
      story: 'Customer lands on the store',
      severity: 'blocker',
      description: 'Customer lands on the home page and sees the store logo, main navigation, an empty cart and the featured products',
    });

    await step(page, 'Open the home page', async () => {
      await homePage.goto();
    });

    await step(page, 'Verify the logo and header links are visible', async () => {
      await expect(homePage.logo).toBeVisible();
      await expect(homePage.catalogLink).toBeVisible();
      await expect(homePage.loginLink).toBeVisible();
      await expect(homePage.signupLink).toBeVisible();
    }, [homePage.logo, homePage.catalogLink, homePage.loginLink, homePage.signupLink]);

    await step(page, 'Verify the cart is empty', async () => {
      expect(await homePage.getCartCount()).toBe(0);
    }, [homePage.cartLink]);

    for (const product of featuredProducts) {
      await step(page, `Verify featured product "${product.name}" is shown`, async () => {
        await expect(homePage.productLink(product.name)).toBeVisible();
      }, [homePage.productLink(product.name)]);
    }
  });

  test('TC01b - Catalog link opens the product catalog @smoke', async ({ homePage, page }) => {
    await businessInfo({
      feature: 'Home page',
      story: 'Customer navigates to the catalog',
      severity: 'critical',
      description: 'Customer clicks "Catalog" in the main menu and is taken to the full product list',
    });

    await step(page, 'Open the home page', async () => {
      await homePage.goto();
    }, [homePage.catalogLink]);

    await step(page, 'Click the "Catalog" link in the menu', async () => {
      await homePage.goToCatalog();
    });

    await step(page, 'Verify the catalog page is opened', async () => {
      await expect(page).toHaveURL(/\/collections\/all/);
    });
  });

});