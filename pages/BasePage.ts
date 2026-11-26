import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  // Header elements shared by every page
  readonly logo: Locator;
  readonly catalogLink: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly cartLink: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('img', { name: 'Sauce Demo' });
    this.catalogLink = page.getByRole('link', { name: 'Catalog', exact: true });
    this.loginLink = page.getByRole('link', { name: 'Log In', exact: true });
    this.signupLink = page.getByRole('link', { name: 'Sign up', exact: true });
    this.cartLink = page.getByRole('link', { name: /My Cart/ });
    this.checkoutLink = page.getByRole('link', { name: 'Check Out', exact: true });
  }

  async open(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async goToCatalog(): Promise<void> {
    await this.catalogLink.click();
  }

  async goToLogin(): Promise<void> {
    await this.loginLink.click();
  }

    async goToCart(): Promise<void> {
    await this.checkoutLink.click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartLink.innerText();
    const match = text.match(/\((\d+)\)/);
    return match ? Number(match[1]) : 0;
  }

    productLink(productName: string): Locator {
    return this.page.getByRole('link').filter({ hasText: productName }).first();
  }

  async openProduct(productName: string): Promise<void> {
    await this.productLink(productName).click();
  }
}