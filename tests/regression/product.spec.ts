import { test, expect } from '../../fixtures/pageFixtures';
import productsData from '../../test-data/products.json';
import { Product } from '../../test-data/types';

const products: Product[] = productsData;

test.describe('Product details', () => {

  for (const product of products) {
    test(`TC03 - ${product.name} page shows correct name and price @regression`, async ({ productPage }) => {
      await productPage.goto(product.slug);

      await expect(productPage.title).toHaveText(product.name);
      expect(await productPage.getPrice()).toBe(product.price);
      await expect(productPage.addToCartButton).toBeEnabled();
    });
  }

});