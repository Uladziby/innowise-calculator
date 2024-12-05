import { BaseComponent } from '../BaseComponent.js';
import './styles.scss';

export const DisplayComponent = (container, value) => {
  const displayContainer = BaseComponent({
    parentNode: container.element,
    tag: 'div',
    className: ['display_container'],
  });

  const displayCalculation = BaseComponent({
    parentNode: displayContainer.element,
    tag: 'div',
    id: 'displayCalculation',
    className: ['display_container__calculation'],
  });

  const display = BaseComponent({
    parentNode: displayContainer.element,
    tag: 'div',
    id: 'display',
    className: ['display_container__result'],
    content: `${value}`,
  });

  const updateResult = (newValue) => {
    display.setContent(newValue);
  };

  const updateCalculation = (calculation) => {
    displayCalculation.setContent(calculation);
  };

  return { display, updateResult, updateCalculation };
};
