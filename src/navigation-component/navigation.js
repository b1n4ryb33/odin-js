import './navigation.css';

function navigationController (selector, components = []) {
    const _navigationNode = document.querySelector(selector);
    const _components = components;

    const _addToNavigation = (component) => {
        const navItm = document.createElement('div');
        navItm.innerHTML = `<div class="nav-itm">${component.getName()}</div>`;
        navItm.addEventListener('click', component.display);
        _navigationNode.appendChild(navItm);
    }

    const displayNavigation = () => {
        console.log('[Log] - Loading navigation...');    
        _components.forEach(component => {
            _addToNavigation(component);
        });
    }

    return {displayNavigation};
};

export {navigationController};
