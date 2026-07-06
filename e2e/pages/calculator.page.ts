import { Locator, Page } from '@playwright/test';

export type Operator = 'add' | 'subtract' | 'multiply' | 'divide';

const OPERATOR_TESTID: Record<Operator, string> = {
  add: 'btn-op-add',
  subtract: 'btn-op-subtract',
  multiply: 'btn-op-multiply',
  divide: 'btn-op-divide',
};

/**
 * Page Object for the calculator UI. Encapsulates locators and
 * user-facing actions so specs only describe *what* a user does,
 * never *how* to find an element on the page.
 */
export class CalculatorPage {
  readonly calculator: Locator;
  readonly display: Locator;
  readonly themeToggle: Locator;
  readonly clearButton: Locator;
  readonly toggleSignButton: Locator;
  readonly percentButton: Locator;
  readonly decimalButton: Locator;
  readonly equalsButton: Locator;

  constructor(private readonly page: Page) {
    this.calculator = page.getByTestId('calculator');
    this.display = page.getByTestId('display-value');
    this.themeToggle = page.getByTestId('theme-toggle');
    this.clearButton = page.getByTestId('btn-clear');
    this.toggleSignButton = page.getByTestId('btn-toggle-sign');
    this.percentButton = page.getByTestId('btn-percent');
    this.decimalButton = page.getByTestId('btn-decimal');
    this.equalsButton = page.getByTestId('btn-equals');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async pressDigit(digit: number | string): Promise<void> {
    await this.page.getByTestId(`btn-digit-${digit}`).click();
  }

  async pressDigits(value: string): Promise<void> {
    for (const char of value) {
      if (char === '.') {
        await this.pressDecimal();
      } else {
        await this.pressDigit(char);
      }
    }
  }

  async pressDecimal(): Promise<void> {
    await this.decimalButton.click();
  }

  async pressOperator(operator: Operator): Promise<void> {
    await this.page.getByTestId(OPERATOR_TESTID[operator]).click();
  }

  async pressEquals(): Promise<void> {
    await this.equalsButton.click();
  }

  async pressClear(): Promise<void> {
    await this.clearButton.click();
  }

  async pressToggleSign(): Promise<void> {
    await this.toggleSignButton.click();
  }

  async pressPercent(): Promise<void> {
    await this.percentButton.click();
  }

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
  }
}
