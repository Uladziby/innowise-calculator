import './components/ThemeButton/styles.scss';
import { Calculator } from './components/Calculator/Calculator.js';
import { ThemeButton } from './components/ThemeButton/ThemeButton.js';
import { BaseComponent } from './components/BaseComponent.js';
import './styles.scss';

function runApp() {
  const app = document.querySelector('#app');

  if (!app) {
    console.error('App element not found!');
    return;
  }

  const wrapper = BaseComponent({
    parentNode: app,
    tag: 'div',
    className: ['calculator'],
  });

  ThemeButton(wrapper.element);
  Calculator(wrapper.element);
}

runApp();
// decompose logic to anather files
