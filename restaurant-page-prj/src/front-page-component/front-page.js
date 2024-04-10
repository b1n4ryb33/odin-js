import './front-page.css';
import burgerImg from './Download.jpg';

import { displayControllerFactory } from './../global/displayController';

const frontPageController = (() => {
    const _name = 'Homepage';
    const _frontPageHtmlTemplate = `
        <div id="front-page">
            <section id="header"></section>
            <section id="content"></section>
        </div>`;
    const _frontPageHeaderTemplate = '<h1>The best Restaurant of the World!</h1>';
    const _frontPageContentTemplate = `<h2>About us</h2>
        <p>This cozy restaurant has left the best impressions! Hospitable hosts, delicious dishes, beautiful presentation, wide wine list and wonderful dessert. I recommend to everyone! I would like to come back here again and again.</p>
        <img src="${burgerImg}">`;

    const _displayController = displayControllerFactory('div#content');

    const display = () => {
        console.log('[Log] - Loading front page...');
        _displayController.setNodeContent(_frontPageHtmlTemplate);
        _displayController.setNodeContent(_frontPageHeaderTemplate, 'div section#header');
        _displayController.setNodeContent(_frontPageContentTemplate, 'div section#content');
    }

    const getName = () => {
        return _name;
    }

    return {display, getName};
})();

export {frontPageController};
