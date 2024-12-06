import './styles.scss';

export const Button = ({
  parentNode,
  className = 'button',
  content,
  onClick,
  type,
}) => {
  const element = document.createElement('button');
  element.classList.add(...className);
  element.innerHTML = `${content}`;
  element.onclick = onClick;
  element.type = type;

  if (parentNode) {
    parentNode.appendChild(element);
  }

  return element;
};
