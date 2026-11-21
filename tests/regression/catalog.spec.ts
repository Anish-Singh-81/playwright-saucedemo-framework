import { test, expect } from '../../fixtures/pageFixtures';
import productsData from '../../test-data/products.json';
import { Product } from '../../test-data/types';

const products: Product[] = productsData;

test.describe('Catalog', () => {

  test('TC02 - catalog lists all expected products @regression', async ({ catalogPage, page }) => {
    await catalogPage.goto();

    await expect(page).toHaveURL(/\/collections\/all/);
    for (const product of products) {
      await expect(catalogPage.productLink(product.name)).toBeVisible();
    }
  });

});