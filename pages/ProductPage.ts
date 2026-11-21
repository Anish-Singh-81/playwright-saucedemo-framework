import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePrice } from '../utils/priceUtils';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1[itemprop="name"]');
    this.price = page.getByText(/£\d+\.\d{2}/).first();
    this.quantityInput = page.locator('input[name="quantity"]');
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  async goto(slug: string): Promise<void> {
    await this.open(`/products/${slug}`);
  }

  async getPrice(): Promise<number> {
    const text = await this.price.innerText();
    return parsePrice(text);
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}