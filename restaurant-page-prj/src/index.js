/**
 * Global CSS imports
 */
import './global/reset.css';
import './global/main.css';

/**
 * JS Imports 
 */
import { frontPageController } from './front-page-component/front-page';
import { contactController } from './contact-component/contact';
import { menueController } from './menue-component/menue';
import { navigationController } from './navigation-component/navigation';
const noControllerTest = {};

const navController = navigationController('navigation',
    [frontPageController, contactController, menueController, noControllerTest]);

try{
    navController.displayNavigation();
}catch(e){
    console.error(e);
};

// w/o routing no access from e.g. searchengines through uris  
// set frontpage as inital page
frontPageController.display();