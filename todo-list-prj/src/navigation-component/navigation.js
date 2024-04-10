import './navigation.css';
import logo from './Download.png';

const navigationController = ((navigationSelector) => {
    const _navigationNode = document.querySelector(navigationSelector);
    const _navTemplate = `
                        <img src="${logo}">
                        <ul>
                            <li class="add-todo-btn">Add Todo</li>
                            <li class="homepage-link">Homepage</li>
                            <li class="projects-link">Projects</li>
                            <li class="settings-link">Settings</li>
                        </ul>`;
    _navigationNode.innerHTML = _navTemplate;

})('navigation');

export {navigationController};