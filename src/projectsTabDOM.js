import project from './project';

export default function createProjectsTab(doc, container, clearMainScreen, exhibitProject){
    let projectList = [project("Default")];

    function createNewProject(project){
        const projectElement = doc.createElement('div');
        projectElement.classList.add('project-pv');
        const projectElementTitle = doc.createElement('h3');
        projectElementTitle.textContent = project.getTitle();
        projectElement.appendChild(projectElementTitle);

        projectElement.addEventListener('click', e => {
            clearMainScreen();
            exhibitProject(project);

            for (j = 0; j < projectList.length; j++){
                if (j != projectList.indexOf(project) && projectList[j].classList.includes('highlighted')){
                    projectList[j].classList = projectList[j].classList.filter( v => v != 'highlighted');
                    break;
                }
            }

            project.classList.add('highlighted');
        });

        return projectElement;
    }
    
    const projectsTab = doc.createElement('div');
    projectsTab.id = 'projects-tab';

    const projectsTabTitle = doc.createElement('div');
    projectsTabTitle.id = 'projects-tab-title';
    const projectsTabTitleH2 = doc.createElement('h2');
    projectsTabTitleH2.textContent = 'Projects';
    projectsTabTitle.appendChild(projectsTabTitleH2);
    projectsTab.appendChild(projectsTabTitle);

    const projectElements = doc.createElement('div');
    projectElements.id = 'project-elements';

    for (let i = 0; i < projectList.length; i++){
        projectElements.appendChild(createNewProject(projectList[i]));
    }

    const newProjectButton = doc.createElement('button');
    newProjectButton.textContent = '+';
    newProjectButton.id = 'new-project-button';
    newProjectButton.addEventListener('click', e => {
        const titleInput = doc.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'project-title-input';
        titleInput.addEventListener('keydown', e => {
            if (e.key == "Enter"){
                const projectElementsDiv = doc.querySelector('#project-elements');
                const addProjectButton = doc.querySelector('#new-project-button');
                const projectTitleInput = doc.querySelector('#project-title-input');

                const newProject = project(titleInput.value, []);
                projectList.push(newProject);

                projectElementsDiv.insertBefore(createNewProject(newProject), addProjectButton);
                projectElementsDiv.removeChild(projectTitleInput);
            }
        });
        projectElements.appendChild(titleInput);
    });
    projectElements.appendChild(newProjectButton);

    projectsTab.appendChild(projectElements);
    container.appendChild(projectsTab);

};