import { BaseComponent } from '../BaseComponent.js';
import { DisplayComponent } from '../DisplayComponent/DisplayComponent.js';
import {
  numbersButtons,
  operationsButtons,
  functionsButtons,
  resultButton,
} from '../../constants.js';
import { renderButtons } from '../../helpers/renderButtons.js';
import { calculateResult } from '../../helpers/calculateResult.js';
import { updateInputRemoveZeroBefore } from '../../helpers/updateInputRemoveZeroBefore.js';
import './styles.scss';

export function Calculator(appContainer) {
  let currentInput = '';
  let currentValue = 0;
  let operator = null;
  let calculationInput = '';

  const displayElement = DisplayComponent(appContainer, currentValue);

  const buttonsContainer = BaseComponent({
    parentNode: appContainer,
    tag: 'div',
    className: ['buttons_container'],
  });

  const numbersButtonsContainer = BaseComponent({
    parentNode: buttonsContainer.element,
    tag: 'div',
    className: ['buttons_container__left'],
  });

  const functionsButtonsContainer = BaseComponent({
    parentNode: buttonsContainer.element,
    tag: 'div',
    className: ['buttons_container__right'],
  });

  const render = () => {
    renderButtons(operationsButtons, numbersButtonsContainer, handleEvent);
    renderButtons(numbersButtons, numbersButtonsContainer, handleEvent);
    renderButtons(functionsButtons, functionsButtonsContainer, handleEvent);
    renderButtons(resultButton, buttonsContainer, handleEvent);
  };

  const handleEvent = (value) => {
    switch (true) {
      case !isNaN(value): {
        currentInput += value;
        calculationInput += value;
        const updatedValue = updateInputRemoveZeroBefore(currentInput);
        displayElement.updateResult(updatedValue);
        displayElement.updateCalculation(calculationInput);
        break;
      }

      case ['+', '-', '*', '/'].includes(value):
        if (currentInput !== '') {
          currentValue = parseFloat(currentInput);
        }
        operator = value;
        calculationInput = currentValue + ' ' + operator + ' ';
        currentInput = '';
        displayElement.updateResult(currentValue);
        displayElement.updateCalculation(calculationInput);
        break;

      case value === '=':
        if (currentInput !== '' && operator) {
          const result = calculateResult(currentValue, currentInput, operator);
          calculationInput += ' =';
          displayElement.updateCalculation(calculationInput);
          displayElement.updateResult(result);
          currentValue = result;
          currentInput = '';
          operator = null;
          calculationInput = result.toString();
        }
        break;

      case value === 'AC':
        currentInput = '';
        currentValue = 0;
        operator = null;
        calculationInput = '';
        displayElement.updateResult(currentValue);
        displayElement.updateCalculation('');
        break;

      case value === '+/-':
        if (currentInput !== '') {
          currentInput = (parseFloat(currentInput) * -1).toString();
          calculationInput =
            calculationInput.slice(0, -currentInput.length) + currentInput;
          displayElement.updateResult(currentInput);
          displayElement.updateCalculation(calculationInput);
        } else if (currentValue !== 0) {
          currentValue *= -1;
          calculationInput = currentValue.toString();
          displayElement.updateResult(currentValue);
          displayElement.updateCalculation(calculationInput);
        }
        break;

      case value === '%':
        if (currentInput !== '') {
          currentInput = (
            (parseFloat(currentInput) / 100) *
            currentValue
          ).toString();
          calculationInput += ' %';
          displayElement.updateResult(currentInput);
          displayElement.updateCalculation(calculationInput);
        } else if (currentValue !== 0) {
          currentValue /= 100;
          calculationInput = currentValue.toString();
          displayElement.updateResult(currentValue);
          displayElement.updateCalculation(calculationInput);
        }
        break;

      case value === ',':
        if (currentInput !== '' && !currentInput.includes('.')) {
          currentInput += '.';
          calculationInput += '.';
          displayElement.updateResult(currentInput);
          displayElement.updateCalculation(calculationInput);
        }
        break;

      default:
        console.warn(`Unhandled input: ${value}`);
    }
  };

  render();
}
