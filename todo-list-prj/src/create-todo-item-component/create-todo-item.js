import './create-todo-item.css';
import { todoItem } from '../todo-item-component/todo-item';
import { homepageController } from '../homepage-component/homepage';

const createTodoItemController = (() => {
    const displayFormular = (projects) => {
        let projectsTemplate = '';
        projects.forEach((project)=>{
            projectsTemplate += `<option value="${project.getName()}">${project.getName()}</option>`;
        });

        const priorityTemplate = `
            <option value="critical">critical</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
        `;

        const formularTemplate = `
            <form class="create-todo-item" action="#">
                <span class="close">&times;</span>
                <h2>Create Todo</h2>
                <legend>Inputs marked with (*) are required.</legend>
                <label for="projects">Choose a Project:(*)</label>
                <select id="projects" name="projects" required>
                    ${projectsTemplate}
                </select>
                <label for="title">Title(*)</label> 
                <input id="title" name="title" maxlength="150" required>
                <label for="description">Description(*)</label> 
                <textarea id="description" name="description"
                    rows="6" cols="30" required></textarea>
                <label for="dueDate">Due date:(*)</label>
                <input type="date" id="dueDate" name="due-date"
                    value="202-07-22"
                    min="2022-01-01" max="2024-12-31" required>
                <label for="priority">Priority:(*)</label>
                <select id="priority" name="priority" required>
                    ${priorityTemplate}
                </select>
                <label for="notes">Notes</label> 
                <textarea id="notes" name="notes"
                    rows="10" cols="30">
                </textarea>
                <fieldset class="controls">
                    <button type="submit" id="createBtn" name="create">Create Todo</button>
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
            const requiredFields = modalNode.querySelectorAll('form input[required], form select[required], form textarea[required]');
            requiredFields.forEach(field => {
                field.addEventListener('invalid', (e) => {
                    field.style.border = '2px solid red';
                    field.style.backgroundColor = "red";
                });
            });
        }

        const modalNode = document.createElement('div');
        modalNode.innerHTML = formularTemplate;
        modalNode.classList.add('modal');

        const _submitBtn = modalNode.querySelector('#createBtn');

        _submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let todo;
            while (true) {
                let selectedProject = modalNode.querySelector('#projects').value;
                let title = modalNode.querySelector('#title').value;
                let description = modalNode.querySelector('#description').value;
                let dueDate = modalNode.querySelector('#dueDate').value;
                let priority = modalNode.querySelector('#priority').value;
                let notes = modalNode.querySelector('#notes').value;
                try {   
                    todo = todoItem(title, description, dueDate, priority, notes);
                    projects.find(proj => proj.getName() == selectedProject).getTodoList().addTodo(todo);
                    break;
                } catch (e) {
                    console.log('[Warning] - Could not create Todo because of missing inputs.');
                    throw e;
                }
              }            
            modalNode.style.display = 'none';
            homepageController.displayProjectOverview(projects);
        })

        _addControlEventListener();

        document.querySelector('body').appendChild(modalNode);
    }
    return {displayFormular};
})();

export {createTodoItemController};