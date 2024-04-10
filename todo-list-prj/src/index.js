/**
 * Global CSS imports
 */
 import './reset.css';
 import './main.css';

/**
 * Font Awesome
 */
 import '@fortawesome/fontawesome-free/js/fontawesome'
 import '@fortawesome/fontawesome-free/js/solid'
 import '@fortawesome/fontawesome-free/js/regular'
 import '@fortawesome/fontawesome-free/js/brands'

 /**
 * JS Imports 
 */
import { project } from './project-component/project';
import { todoItem } from './todo-item-component/todo-item';
import { homepageController } from './homepage-component/homepage';
import { navigationController } from './navigation-component/navigation';
import { createTodoItemController } from './create-todo-item-component/create-todo-item';

/**
 * Test Data
 */
import projects from './test-data/projects.json';

console.log('Loaded Testdata');

const _projects = [];

// init test data
projects['projects'].forEach(proj => {
    const tempProject = project(proj.name, proj.description);
    proj.todos.forEach(todo => {
        tempProject.getTodoList().addTodo(
            todoItem(
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority,
                todo.notes,
                todo.checklist)
            );
    });
    _projects.push(tempProject);
});

// Display Homepage as first page
homepageController.displayProjectOverview(_projects);

document.querySelector('body > navigation > ul > li.add-todo-btn')
.addEventListener('click',()=>{
    createTodoItemController.displayFormular(_projects);
});

document.querySelector('body > navigation > ul > li.homepage-link')
.addEventListener('click',()=>{
    homepageController.displayProjectOverview(_projects);
});

document.querySelector('body > navigation > img')
.addEventListener('click',()=>{
    homepageController.displayProjectOverview(_projects);
});

// const mailProject = project('Mail Project', 'Manage m2w tasks.');
// let test = todoItem('Test Todo', 'A description', '12.12.2022', 'high');
// let test1 = todoItem('Test Todo 1', 'A description', '12.12.2022', 'high');

// mailProject.getTodoList().addTodo(test);
// mailProject.getTodoList().addTodo(test1);
// console.dir(mailProject.getTodoList());
// console.dir(mailProject.getTodoList().getTodos());

// mailProject.getTodoList().deleteTodo(test);
// test = test.updateProperty('title', 'a new new title');
// mailProject.getTodoList().addTodo(test);
// console.dir(mailProject.getTodoList().getTodos());