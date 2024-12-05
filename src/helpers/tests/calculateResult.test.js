const { calculateResult } = require('../calculateResult');

describe('calculateResult', () => {
  test('should correctly add two numbers', () => {
    const result = calculateResult(10, '5', '+');
    expect(result).toBe(15);
  });

  test('should correctly subtract two numbers', () => {
    const result = calculateResult(10, '5', '-');
    expect(result).toBe(5);
  });

  test('should correctly multiply two numbers', () => {
    const result = calculateResult(10, '5', '*');
    expect(result).toBe(50);
  });

  test('should correctly divide two numbers', () => {
    const result = calculateResult(10, '5', '/');
    expect(result).toBe(2);
  });

  test('should handle division by zero', () => {
    const result = calculateResult(10, '0', '/');
    expect(result).toBe(Infinity);
  });

  test('should handle non-numeric currentValue gracefully', () => {
    const result = calculateResult(10, 'abc', '+');
    expect(result).toBeNaN();
  });

  test('should return the first operand if the operator is not valid', () => {
    const result = calculateResult(10, '5', '%');
    expect(result).toBe(10);
  });
});
