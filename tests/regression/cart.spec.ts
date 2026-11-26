import { test, expect } from '../../fixtures/pageFixtures';
import { step, businessInfo } from '../../utils/reportUtils';
import { formatPrice } from '../../utils/priceUtils';
import productsData from '../../test-data/products.json';
import { Product } from '../../test-data/types';

const products: Product[] = productsData;

function getProduct(slug: string): Product {
  const found = products.find((p) => p.slug === slug);
  if (!found) {
    throw new Error(`Product "${slug}" not found in products.json`);
  }
  return found;
}

const greyJacket = getProduct('grey-jacket');
const noirJacket = getProduct('noir-jacket');

test.describe('Shopping cart', () => {

  test('TC04 - adding a product updates the cart count @smoke', async ({ productPage, cartPage, page }) => {
    await businessInfo({
      feature: 'Shopping cart',
      story: 'Customer adds a product to the cart',
      severity: 'blocker',
      description: `Customer adds ${greyJacket.name} to the cart and sees it in the cart with a count of 1`,
    });

    await step(page, `Open "${greyJacket.name}" and add it to the cart`, async () => {
      await productPage.goto(greyJacket.slug);
      await productPage.addToCart();
    }, [productPage.addToCartButton]);

    await step(page, 'Open the cart', async () => {
      await cartPage.goto();
      await expect(cartPage.heading).toBeVisible();
    });

    await step(page, 'Verify the cart count is 1', async () => {
      await expect(cartPage.cartLink).toHaveText(/My Cart \(1\)/);
    }, [cartPage.cartLink]);

    await step(page, `Verify "${greyJacket.name}" is in the cart`, async () => {
      await expect(cartPage.rows).toHaveCount(1);
      await expect(cartPage.row(greyJacket.name)).toBeVisible();
    }, [cartPage.row(greyJacket.name)]);
  });

  test('TC05 - cart total is the sum of all products @regression', async ({ productPage, cartPage, page }) => {
    const expectedTotal = greyJacket.price + noirJacket.price;

    await businessInfo({
      feature: 'Shopping cart',
      story: 'Cart calculates the order total',
      severity: 'critical',
      description: `Customer adds ${greyJacket.name} and ${noirJacket.name}; the cart total equals the sum of both prices`,
    });

    for (const product of [greyJacket, noirJacket]) {
      await step(page, `Add "${product.name}" to the cart`, async () => {
        await productPage.goto(product.slug);
        await productPage.addToCart();
      });
    }

    await step(page, 'Open the cart', async () => {
      await cartPage.goto();
    });

    for (const product of [greyJacket, noirJacket]) {
      await step(page, `Verify "${product.name}" line total is ${formatPrice(product.price)}`, async () => {
        await expect(cartPage.lineTotal(product.name)).toHaveText(formatPrice(product.price));
      }, [cartPage.row(product.name)]);
    }

    await step(page, `Verify the cart total is ${formatPrice(expectedTotal)}`, async () => {
      await expect(cartPage.total).toContainText(formatPrice(expectedTotal));
    }, [cartPage.total]);
  });

  test('TC06 - updating quantity recalculates line and cart totals @regression', async ({ productPage, cartPage, page }) => {
    const quantity = 2;
    const expectedTotal = greyJacket.price * quantity;

    await businessInfo({
      feature: 'Shopping cart',
      story: 'Customer changes the quantity',
      severity: 'critical',
      description: `Customer changes ${greyJacket.name} quantity to ${quantity}; line total and cart total become price × quantity`,
    });
   

    await step(page, `Add "${greyJacket.name}" to the cart and open the cart`, async () => {
      await productPage.goto(greyJacket.slug);
      await productPage.addToCart();
      await cartPage.goto();
    });

    await step(page, `Change quantity to ${quantity} and click Update`, async () => {
      await cartPage.setQuantity(greyJacket.name, quantity);
    }, [cartPage.quantityInput(greyJacket.name)]);

    await step(page, `Verify the line total is ${formatPrice(expectedTotal)}`, async () => {
      await expect(cartPage.quantityInput(greyJacket.name)).toHaveValue(String(quantity));
      await expect(cartPage.lineTotal(greyJacket.name)).toHaveText(formatPrice(expectedTotal));
    }, [cartPage.lineTotal(greyJacket.name)]);

    await step(page, `Verify the cart total is ${formatPrice(expectedTotal)}`, async () => {
      await expect(cartPage.total).toContainText(formatPrice(expectedTotal));
    }, [cartPage.total]);
  });

  test('TC07 - removing the only product empties the cart @regression', async ({ productPage, cartPage, page }) => {
    await businessInfo({
      feature: 'Shopping cart',
      story: 'Customer removes a product',
      severity: 'normal',
      description: `Customer removes ${greyJacket.name} from the cart; the cart becomes empty`,
    });

    await step(page, `Add "${greyJacket.name}" to the cart and open the cart`, async () => {
      await productPage.goto(greyJacket.slug);
      await productPage.addToCart();
      await cartPage.goto();
    }, [cartPage.row(greyJacket.name)]);

    await step(page, `Remove "${greyJacket.name}"`, async () => {
      await cartPage.removeProduct(greyJacket.name);
    });

    await step(page, 'Verify the cart is empty', async () => {
      await expect(cartPage.rows).toHaveCount(0);
      await expect(cartPage.cartLink).toHaveText(/My Cart \(0\)/);
    }, [cartPage.cartLink]);
  });

});