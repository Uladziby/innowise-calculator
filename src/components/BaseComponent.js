export function BaseComponent({
  parentNode = null,
  tag = 'div',
  className = [],
  styles = '',
  content = '',
  id,
}) {
  const element = document.createElement(tag);
  element.classList.add(...className);
  element.innerHTML = `${content}`;
  if (id) element.id = id;

  if (parentNode) {
    parentNode.appendChild(element);
  }

  const setContent = (newContent) => {
    element.innerHTML = `${newContent}`;
  };

  const destroy = () => {
    element.innerHTML = '';
  };

  return {
    element,
    setContent,
    destroy,
  };
}
