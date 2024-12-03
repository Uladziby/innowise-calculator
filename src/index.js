import { BaseComponent } from './components/BaseComponent.js';
import { DisplayComponent } from './components/DisplayComponent/DisplayComponent.js';
import { Button } from './components/Button.js';
import './styles.scss';

export const Calculator = () => {
  const calculator = document.getElementById('calculator');

  const container = BaseComponent({
    parentNode: calculator,
    tag: 'div',
    className: ['container'],
  });

  const display = DisplayComponent(container);

  const buttonsContainer = BaseComponent({
    parentNode: container.element,
    tag: 'div',
    className: ['buttons-container'],
  });

  const operationsButtons = [
    { content: 'AC', type: 'button', className: ['button', 'btn_fun'] },
    { content: '%', type: 'button', className: ['button', 'btn_fun'] },
    { content: '+/-', type: 'button', className: ['button', 'btn_fun'] },
    { content: '/', type: 'button', className: ['button', 'btn_fun'] },
    { content: '*', type: 'button', className: ['button', 'btn_fun'] },
    { content: '-', type: 'button', className: ['button', 'btn_fun'] },
    { content: '+', type: 'button', className: ['button', 'btn_fun'] },
    { content: '=', type: 'button', className: ['button', 'btn_fun'] },
  ];

  const numbersButtons = [
    { content: '1', type: 'button', className: ['button', 'btn_num'] },
    { content: '2', type: 'button', className: ['button', 'btn_num'] },
    { content: '3', type: 'button', className: ['button', 'btn_num'] },
    { content: '4', type: 'button', className: ['button', 'btn_num'] },
    { content: '5', type: 'button', className: ['button', 'btn_num'] },
    { content: '6', type: 'button', className: ['button', 'btn_num'] },
    { content: '7', type: 'button', className: ['button', 'btn_num'] },
    { content: '8', type: 'button', className: ['button', 'btn_num'] },
    { content: '9', type: 'button', className: ['button', 'btn_num'] },
    { content: '0', type: 'button', className: ['button', 'btn_num'] },
  ];

  const renderButtons = (buttons, container) => {
    buttons.forEach((button) => {
      const btn = Button({
        parentNode: container.element,
        ...button,
        onClick: () => {
          display.setContent(button.content);
        },
      });
    });
  };

  renderButtons(numbersButtons, buttonsContainer);
  renderButtons(operationsButtons, buttonsContainer);
};

Calculator();
