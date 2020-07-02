import projectDisplay from './projectDisplayDOM';
import createProjectsTab from './projectsTabDOM';
import createTopBar from './topBarDOM';
import createProjectList from './projectList';

export default function main(){

    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.id = 'main-container';

    const pL = createProjectList();
    const pd = projectDisplay(document, container, pL);
    createTopBar(document, container, pd.clearMainScreen, pd.todayDisplay);
    createProjectsTab(document, container, pd.clearMainScreen, pd.createProjectDisplay, pL);
    body.appendChild(container);

}