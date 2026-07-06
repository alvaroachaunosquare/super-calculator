import { test, expect } from '../fixtures';

test.describe('Toggle sign (+/-)', () => {
  test('changes a positive number to negative', async ({ calculator }) => {
    await calculator.pressDigit(5);
    await calculator.pressToggleSign();

    await expect(calculator.display).toHaveText('-5');
  });

  test('changes a negative number back to positive', async ({ calculator }) => {
    await calculator.pressDigit(5);
    await calculator.pressToggleSign();
    await calculator.pressToggleSign();

    await expect(calculator.display).toHaveText('5');
  });

  test('does not turn "0" into "-0"', async ({ calculator }) => {
    await calculator.pressToggleSign();

    await expect(calculator.display).toHaveText('0');
  });
});

test.describe('Percent (%)', () => {
  test('divides the displayed number by 100 (50 -> 0.5)', async ({ calculator }) => {
    await calculator.pressDigits('50');
    await calculator.pressPercent();

    await expect(calculator.display).toHaveText('0.5');
  });

  test('divides the displayed number by 100 (200 -> 2)', async ({ calculator }) => {
    await calculator.pressDigits('200');
    await calculator.pressPercent();

    await expect(calculator.display).toHaveText('2');
  });
});
