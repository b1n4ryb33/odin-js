import { project } from '../project-component/project';
import { projectController } from '../project-component/project';

import './homepage.css';


const homepageController = ((homepageSelector) => {
    const _homepageNode = document.querySelector(homepageSelector);

    const displayProjectOverview = (projects) => {
        const _homepageTemplate = `
        <h1>Homepage</h1>
        <p>
            This website is a simple Todo Manager.
            You can add multiple projects and within that projects
            you can manage todo lists.
        </p>
        <h2>Projects</h2>
        <div class="projects-overview"></div>`;
        _homepageNode.innerHTML = _homepageTemplate;
        
        _homepageNode.querySelector('.projects-overview').innerHTML = '';
        projects.forEach(proj => {
            const _projectNode = document.createElement('div');
            const _projectOverviewTemplate = `
                                    <div class="project-overview">
                                        <h3>${proj.getName()}</h3>
                                        <p>${proj.getDescription()}</p>
                                        <p>Open Issues: ${proj.getTodoList().getTodos().length}</p>
                                    </div>`;
            _projectNode.innerHTML = _projectOverviewTemplate;
            _projectNode.addEventListener('click', () => {
                projectController.displayProject(proj);
            });
            _homepageNode.querySelector('.projects-overview').appendChild(_projectNode);
        }); 
    }

    return {displayProjectOverview};

})('body section#content');

export {homepageController};