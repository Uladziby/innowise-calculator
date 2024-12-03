import { BaseComponent } from '../BaseComponent.js';
import './styles.scss';

export const DisplayComponent = (container) => {
  const displayContainer = BaseComponent({
    parentNode: container.element,
    tag: 'div',
    className: ['display_container'],
  });

  const display = BaseComponent({
    parentNode: displayContainer.element,
    tag: 'div',
    id: 'display',
    className: ['display'],
    content: '0',
  });

  return display;
};
