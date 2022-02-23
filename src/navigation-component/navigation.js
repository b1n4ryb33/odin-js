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
            if(component.getName === undefined || component.display === undefined){
                throw new Error('Component does not have a name or display method.');
            }
            _addToNavigation(component);
        });
    }

    return {displayNavigation};
};

export {navigationController};
