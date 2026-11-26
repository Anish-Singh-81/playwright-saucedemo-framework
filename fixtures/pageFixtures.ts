import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

type PageFixtures = {
  homePage: HomePage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    console.log('SETUP: creating HomePage');
    const homePage = new HomePage(page);
    console.log('TEARDOWN: test finished');
    await use(homePage);
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
    cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});



export { expect } from '@playwright/test';