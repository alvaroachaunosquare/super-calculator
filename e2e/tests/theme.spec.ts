import { test, expect } from '../fixtures';

test.describe('Theme toggle', () => {
  test('starts in dark mode by default', async ({ calculator }) => {
    await expect(calculator.calculator).not.toHaveClass(/light/);
    await expect(calculator.themeToggle).toContainText('Dark');
  });

  test('switches to light mode when the toggle is clicked', async ({ calculator }) => {
    await calculator.toggleTheme();

    await expect(calculator.calculator).toHaveClass(/light/);
    await expect(calculator.themeToggle).toContainText('Light');
  });

  test('switches back to dark mode on a second click', async ({ calculator }) => {
    await calculator.toggleTheme();
    await calculator.toggleTheme();

    await expect(calculator.calculator).not.toHaveClass(/light/);
    await expect(calculator.themeToggle).toContainText('Dark');
  });

  test('theme selection persists while using the calculator', async ({ calculator }) => {
    await calculator.toggleTheme();
    await calculator.pressDigit(3);
    await calculator.pressOperator('add');
    await calculator.pressDigit(4);
    await calculator.pressEquals();

    await expect(calculator.calculator).toHaveClass(/light/);
    await expect(calculator.display).toHaveText('7');
  });
});
