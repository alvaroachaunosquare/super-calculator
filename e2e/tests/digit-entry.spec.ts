import { test, expect } from '../fixtures';

test.describe('Digit entry', () => {
  test('shows "0" as the initial display value', async ({ calculator }) => {
    await expect(calculator.display).toHaveText('0');
  });

  test('updates the display when a single digit is pressed', async ({ calculator }) => {
    await calculator.pressDigit(5);

    await expect(calculator.display).toHaveText('5');
  });

  test('replaces the initial "0" instead of appending to it', async ({ calculator }) => {
    await calculator.pressDigit(7);

    await expect(calculator.display).toHaveText('7');
  });

  test('concatenates multiple digits into one number', async ({ calculator }) => {
    await calculator.pressDigit(1);
    await calculator.pressDigit(2);
    await calculator.pressDigit(3);

    await expect(calculator.display).toHaveText('123');
  });

  test('appends a decimal point to the display', async ({ calculator }) => {
    await calculator.pressDigit(1);
    await calculator.pressDecimal();
    await calculator.pressDigit(5);

    await expect(calculator.display).toHaveText('1.5');
  });

  test('does not allow more than one decimal point', async ({ calculator }) => {
    await calculator.pressDigit(1);
    await calculator.pressDecimal();
    await calculator.pressDecimal();
    await calculator.pressDigit(5);

    await expect(calculator.display).toHaveText('1.5');
  });
});
