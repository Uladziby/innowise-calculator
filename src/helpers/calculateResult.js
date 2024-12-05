export const calculateResult = (firstOperand, currentValue, operator) => {
  let result = firstOperand;
  const secondOperand = parseFloat(currentValue);

  switch (operator) {
    case '+':
      result += secondOperand;
      break;
    case '-':
      result -= secondOperand;
      break;
    case '*':
      result *= secondOperand;
      break;
    case '/':
      result /= secondOperand;
      break;
  }

  return result;
};
