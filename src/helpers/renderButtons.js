import { Button } from '../components/Button/Button.js';

export const renderButtons = (buttons, container, handleEvent) => {
  buttons.forEach((button) => {
    return Button({
      parentNode: container.element,
      ...button,
      onClick: () => {
        handleEvent(button.content);
      },
    });
  });
};
