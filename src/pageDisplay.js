import projectDisplay from './projectDisplayDOM';
import createProjectsTab from './projectsTabDOM';
import createTopBar from './topBarDOM';

export default function main(){

    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.id = 'main-container';

    const pd = projectDisplay(document, container);
    createTopBar(document, container, pd.clearMainScreen, e => {console.log("Not available yet.")});
    createProjectsTab(document, container, pd.clearMainScreen, pd.createProjectDisplay);
    body.appendChild(container);

}