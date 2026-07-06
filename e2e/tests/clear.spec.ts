import { test, expect } from '../fixtures';

test.describe('Clear', () => {
  test('resets the display to "0" when C is pressed', async ({ calculator }) => {
    await calculator.pressDigit(9);
    await calculator.pressClear();

    await expect(calculator.display).toHaveText('0');
  });

  test('cancels any pending operation when C is pressed', async ({ calculator }) => {
    // Start an operation (2 +) then clear before finishing it.
    await calculator.pressDigit(2);
    await calculator.pressOperator('add');
    await calculator.pressDigit(9);
    await calculator.pressClear();

    // If the pending "+2" had survived, this would compute 5 + 2 = 7 instead of 5.
    await calculator.pressDigit(5);
    await calculator.pressEquals();

    await expect(calculator.display).toHaveText('5');
  });
});
