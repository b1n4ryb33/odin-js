import { todoList } from "./../todo-list-component/todo-list";

import './project.css';

function project(name, description = '', newTodoList){
    const _name = name;
    const _todoList = newTodoList || todoList(this);
    const _description = description;

    const setName = (name) => {
        _name = name;
    }
    const setDescription = (description) => {
        _description = description;
    }

    const getName = () => {
        return _name;
    }
    const getDescription = () => {
        return _description;
    }
    const getTodoList = () => {
        return _todoList;
    }

    return {setName, setDescription, getDescription, getName, getTodoList};
}

const projectController = ((projectSelector) => {
    const _projectNode = document.querySelector(projectSelector);

    const displayProject = (proj) => {
        const _projectTemplate = `
        <div class="prj">
            <div class="proj-header">
                <h1>${proj.getName()}</h3>
                <i class="fa-solid fa-gear"></i>
            </div>
            <p>Description: ${proj.getDescription()}</p>
            <p>Open Issues: ${proj.getTodoList().getTodos().length}</p>
        </div>`;
        const _issuesNode = document.createElement('div');
        _issuesNode.innerHTML = '<h2>Issues</h2>';
        _issuesNode.classList.add('issues');
        proj.getTodoList().getTodos().forEach(todo => {
                _issuesNode.innerHTML += todo.toHTML();
        });

        _projectNode.innerHTML = _projectTemplate;
        _projectNode.appendChild(_issuesNode);
    }

    const displayProjectConfig = (proj) => {
        const _template = `
            <form class="proj-config" action="#">
                <span class="close">&times;</span>
                <h2>Update Project - ${proj.getName()}</h2>
                <label for="title">Change Title</label> 
                <input id="title" name="title" maxlength="150" placeholder="${proj.getName()}">
                <label for="description">Change Description</label> 
                <textarea id="description" name="description"
                    rows="6" cols="30">${proj.getDescription()}</textarea>
                
                <fieldset class="controls">
                    <button type="submit" id="updateProj" name="update">Update Project</button>
                    <button type="button" id="deleteProj" name="delete">Delete Project</button>
                    <button type="button" id="closeBtn" name="close class="close">Close</button>
                </fieldset>
            </form>
        `;
        
        const _addControlEventListener = () => {
            modalNode.querySelector('form > span.close')
                .addEventListener('click', () => {
                    modalNode.style.display = 'none';
            });
            modalNode.querySelector('#closeBtn')
                .addEventListener('click', () => {
                    modalNode.style.display = 'none';
            });
        }

        const modalNode = document.createElement('div');
        modalNode.innerHTML = _template;
        modalNode.classList.add('modal');
        _addControlEventListener();
    }

   return {displayProject, displayProjectConfig};
})('body section#content');

export {project, projectController};
