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
    if (!isNaN(value)) {
      currentInput += value;
      const updatedValue = updateInputRemoveZeroBefore(currentInput);
      displayElement.updateResult(updatedValue);
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput !== '') {
        displayElement.updateCalculation(currentValue);
        currentValue = parseFloat(currentInput);
        currentInput = '';
      }
      operator = value;
      displayElement.updateResult(currentValue + ' ' + operator);
    } else if (value === '=') {
      if (currentInput !== '' && operator) {
        const result = calculateResult(currentValue, currentInput, operator);
        currentInput = '';
        operator = null;
        displayElement.updateResult(result);
      }
    } else if (value === 'AC') {
      currentInput = '';
      currentValue = 0;
      operator = null;
      displayElement.updateResult(currentValue);
    } else if (value === '+/-') {
      if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        displayElement.updateResult(currentInput);
      } else if (currentValue !== 0) {
        currentValue *= -1;
        displayElement.updateResult(currentValue);
      }
    } else if (value === '%') {
      if (operator === null) {
        displayElement.updateResult(0);
        currentInput = 0;
      }
      if (currentInput !== '') {
        currentInput = (
          (parseFloat(currentInput) / currentValue) *
          100
        ).toString();
        displayElement.updateResult(currentInput);
      } else if (currentValue !== 0) {
        currentValue /= 100;
        displayElement.updateResult(currentValue);
      }
    } else if (value === ',') {
      if (currentInput !== '' && !currentInput.includes('.')) {
        currentInput += '.';
        displayElement.updateResult(currentInput);
      }
    }
  };

  render();
}
