import { updateInputRemoveZeroBefore } from '../updateInputRemoveZeroBefore';

describe('updateInputRemoveZeroBefore', () => {
  test('removes leading zero if the second character is not a decimal', () => {
    expect(updateInputRemoveZeroBefore('0123')).toBe('123');
  });

  test('does not remove leading zero if the second character is a decimal', () => {
    expect(updateInputRemoveZeroBefore('0.123')).toBe('0.123');
  });

  test('does not modify input if there is no leading zero', () => {
    expect(updateInputRemoveZeroBefore('123')).toBe('123');
  });

  test('handles multiple leading zeros correctly', () => {
    expect(updateInputRemoveZeroBefore('000123')).toBe('00123');
  });

  test('handles an empty string as input', () => {
    expect(updateInputRemoveZeroBefore('')).toBe('');
  });
});
