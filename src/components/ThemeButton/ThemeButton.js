import './styles.scss';

export function ThemeButton(appContainer) {
  let isLight = localStorage.getItem('IsDarkTheme') ? false : true;

  const wrapper = document.createElement('div');
  wrapper.classList.add('theme-switcher');
  appContainer.appendChild(wrapper);

  const toggle = document.createElement('button');
  toggle.classList.add('theme-switcher__button');
  isLight ? (toggle.innerText = '🌞') : (toggle.innerText = '🌚');
  wrapper.appendChild(toggle);

  toggle.addEventListener('click', modeSwitch);

  function modeSwitch() {
    let root = document.body;
    isLight = !isLight;
    localStorage.setItem('IsDarkTheme', isLight);
    isLight ? (toggle.innerText = '🌞') : (toggle.innerText = '🌚');

    root.classList.toggle('lightMode');
  }
}
