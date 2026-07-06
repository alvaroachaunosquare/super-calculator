import { test as base } from '@playwright/test';
import { CalculatorPage } from './pages/calculator.page';

type Fixtures = {
  calculator: CalculatorPage;
};

export const test = base.extend<Fixtures>({
  calculator: async ({ page }, use) => {
    const calculator = new CalculatorPage(page);
    await calculator.goto();
    await use(calculator);
  },
});

export { expect } from '@playwright/test';
