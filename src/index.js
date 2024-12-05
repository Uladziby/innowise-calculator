import { BaseComponent } from './components/BaseComponent.js';
import { DisplayComponent } from './components/DisplayComponent/DisplayComponent.js';
import { Button } from './components/Button/Button.js';
import {
  numbersButtons,
  operationsButtons,
  functionsButtons,
} from './constants.js';
import { calculateResult } from './helpers/calculateResult.js';
import { updateInputRemoveZeroBefore } from './helpers/updateInputRemoveZeroBefore.js';
import './styles.scss';

export const Calculator = () => {
  const calculator = document.getElementById('app');
  let currentInput = '';
  let currentValue = 0;
  let operator = null;
  let calculationInput = '';

  const container = BaseComponent({
    parentNode: calculator,
    tag: 'div',
    className: ['calculator'],
  });

  const displayElement = DisplayComponent(container, currentValue);

  const buttonsContainer = BaseComponent({
    parentNode: container.element,
    tag: 'div',
    className: ['buttons-container'],
  });

  const resultButton = Button({
    parentNode: buttonsContainer.element,
    content: '=',
    className: ['button', 'btn_result'],
    onClick: () => {
      handleEvent('=');
    },
  });

  const renderButtons = (buttons, container) => {
    buttons.forEach((button) => {
      Button({
        parentNode: container.element,
        ...button,
        onClick: () => {
          handleEvent(button.content);
        },
      });
    });
  };

  const numbersButtonsContainer = BaseComponent({
    parentNode: buttonsContainer.element,
    tag: 'div',
    className: ['buttons-container_left'],
  });

  const functionsButtonsContainer = BaseComponent({
    parentNode: buttonsContainer.element,
    tag: 'div',
    className: ['buttons-container_right'],
  });

  const render = () => {
    renderButtons(operationsButtons, numbersButtonsContainer);
    renderButtons(numbersButtons, numbersButtonsContainer);
    renderButtons(functionsButtons, functionsButtonsContainer);
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
};

Calculator();
