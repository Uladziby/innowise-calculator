export const updateInputRemoveZeroBefore = (operand) => {
  if (operand[0] === '0' && operand[1] !== '.') {
    return operand.slice(1);
  }
  return operand;
};
