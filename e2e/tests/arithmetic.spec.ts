import { test, expect } from '../fixtures';

test.describe('Arithmetic', () => {
  test('adds two numbers correctly (3 + 4 = 7)', async ({ calculator }) => {
    await calculator.pressDigit(3);
    await calculator.pressOperator('add');
    await calculator.pressDigit(4);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('7');
  });

  test('subtracts two numbers correctly (9 - 4 = 5)', async ({ calculator }) => {
    await calculator.pressDigit(9);
    await calculator.pressOperator('subtract');
    await calculator.pressDigit(4);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('5');
  });

  test('returns a negative result when the difference is negative (3 - 7 = -4)', async ({ calculator }) => {
    await calculator.pressDigit(3);
    await calculator.pressOperator('subtract');
    await calculator.pressDigit(7);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('-4');
  });

  test('multiplies two numbers correctly (6 x 7 = 42)', async ({ calculator }) => {
    await calculator.pressDigit(6);
    await calculator.pressOperator('multiply');
    await calculator.pressDigit(7);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('42');
  });

  test('returns 0 when multiplying by zero', async ({ calculator }) => {
    await calculator.pressDigit(5);
    await calculator.pressOperator('multiply');
    await calculator.pressDigit(0);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('0');
  });

  test('divides two numbers correctly (10 / 2 = 5)', async ({ calculator }) => {
    await calculator.pressDigits('10');
    await calculator.pressOperator('divide');
    await calculator.pressDigit(2);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('5');
  });

  test('returns a decimal when division is not exact (7 / 2 = 3.5)', async ({ calculator }) => {
    await calculator.pressDigit(7);
    await calculator.pressOperator('divide');
    await calculator.pressDigit(2);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('3.5');
  });

  test('displays "0" when dividing by zero instead of crashing', async ({ calculator }) => {
    await calculator.pressDigit(8);
    await calculator.pressOperator('divide');
    await calculator.pressDigit(0);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('0');
  });

  test('chains operations without pressing "=" in between (2 + 3 * 4 = 20)', async ({ calculator }) => {
    await calculator.pressDigit(2);
    await calculator.pressOperator('add');
    await calculator.pressDigit(3);
    await calculator.pressOperator('multiply');
    await calculator.pressDigit(4);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('20');
  });
});
