import project from './project';

export default function createProjectsTab(doc, container, clearMainScreen, exhibitProject, projectList){

    function createNewProject(project){
        const projectElement = doc.createElement('div');
        projectElement.classList.add('project-pv');
        const projectElementTitle = doc.createElement('h3');
        projectElementTitle.textContent = project.getTitle();

        projectElementTitle.addEventListener('click', e => {
            const tD = doc.querySelector('.todo-details');
            if (!tD){

                clearMainScreen();
                exhibitProject(project);

                const projectElements = Array.from(doc.querySelectorAll('.project-pv'));
                for (let j = 0; j < projectElements.length; j++){
                    if (j != projectElements.indexOf(projectElement)){
                        projectElements[j].classList.remove('highlighted');
                        break;
                    }
                }

                projectElement.classList.add('highlighted');
            }else{
                tD.classList.add('alert');
                setTimeout(function(){
                    tD.classList.remove('alert');
                }, 1000);
            }
        });
        projectElement.appendChild(projectElementTitle);
        
        if (project.getTitle() != "Default"){
            const deleteProjectButton = doc.createElement('button');
            deleteProjectButton.classList.add('delete-project-button');
            deleteProjectButton.textContent = '✕';
            deleteProjectButton.addEventListener('click', e => {
                const tD = doc.querySelector('.todo-details');
                if (!tD){
                    projectList.removeItemFromProjectList(project);

                    projectElement.parentNode.removeChild(projectElement);
                    if (projectElement.classList.contains('highlighted')){
                        clearMainScreen();
                        const defaultProjectDiv = doc.querySelector('.project-pv');
                        defaultProjectDiv.classList.add('highlighted');
                        exhibitProject(projectList.getProjectList()[0]);
                    }
                }else{
                    tD.classList.add('alert');
                    setTimeout(function(){
                        tD.classList.remove('alert');
                    }, 1000);
                }
            });
            projectElement.appendChild(deleteProjectButton);
        }

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
    projectElements.classList.add('project-elements');

    for (let i = 0; i < projectList.getProjectList().length; i++){
        projectElements.appendChild(createNewProject(projectList.getProjectList()[i]));
    }

    const newProjectButton = doc.createElement('button');
    newProjectButton.textContent = '+';
    newProjectButton.id = 'new-project-button';
    newProjectButton.addEventListener('click', e => {
        const tD = doc.querySelector('.todo-details');
        if (!tD){
            const titleInput = doc.createElement('input');
            titleInput.type = 'text';
            titleInput.id = 'project-title-input';
            titleInput.addEventListener('keydown', e => {
                if (e.key == "Enter"){
                    //const projectElementsDiv = doc.querySelector('#project-elements');
                    const addProjectButton = doc.querySelector('#new-project-button');
                    const projectTitleInput = doc.querySelector('#project-title-input');

                    const newProject = project(titleInput.value, []);
                    projectList.appendItemToProjectList(newProject);

                    projectElements.insertBefore(createNewProject(newProject), addProjectButton);
                    projectElements.removeChild(projectTitleInput);
                }
            });
            projectElements.appendChild(titleInput);
        }else{
            tD.classList.add('alert');
            setTimeout(function(){
                tD.classList.remove('alert');
            }, 1000);
        }
    });
    projectElements.appendChild(newProjectButton);

    projectsTab.appendChild(projectElements);
    container.appendChild(projectsTab);

};