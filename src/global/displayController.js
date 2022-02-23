const displayControllerFactory = (rootSelector) => {
    const _rootSelector = rootSelector;
    // const _rootNode = document.querySelector(rootSelector);
        
    const setNodeContent = (template, selector='') => {
        const insertNode = document.querySelector(`${_rootSelector} ${selector}`);
        insertNode.innerHTML = template;
    }

    return {setNodeContent};
}

export {displayControllerFactory};