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
                        if (projectElements[j].classList.contains('highlighted')){
                            projectElements[j].classList.remove('highlighted');
                            break;
                        }
                    }
                }

                projectElement.classList.add('highlighted');
            }else{
                tD.classList.add('alert');
                setTimeout(function(){
                    tD.classList.remove('alert');
                }, 150);
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
                    }, 150);
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

    const newProjectContainer = doc.createElement('div');
    newProjectContainer.id = 'new-project-container';
    const newProjectButton = doc.createElement('button');
    newProjectButton.textContent = '+';
    newProjectButton.id = 'new-project-button';
    newProjectButton.addEventListener('click', e => {
        const tD = doc.querySelector('.todo-details');
        if (!tD && !doc.querySelector('#project-title-input')){
            const titleInput = doc.createElement('input');
            titleInput.type = 'text';
            titleInput.id = 'project-title-input';
            titleInput.addEventListener('keydown', e => {
                if (e.key == "Enter"){
                    //const projectElementsDiv = doc.querySelector('#project-elements');
                    const addProjectContainer = doc.querySelector('#new-project-container');
                    const projectTitleInput = doc.querySelector('#project-title-input');

                    const newProject = project(titleInput.value, []);
                    projectList.appendItemToProjectList(newProject);

                    projectElements.insertBefore(createNewProject(newProject), addProjectContainer);
                    addProjectContainer.removeChild(projectTitleInput);
                }
            });
            newProjectContainer.appendChild(titleInput);
            titleInput.focus();
        }else if (tD){
            tD.classList.add('alert');
            setTimeout(function(){
                tD.classList.remove('alert');
            }, 150);
        }else{
            doc.querySelector('#project-title-input').focus();
        }
    });
    newProjectContainer.appendChild(newProjectButton);
    projectElements.appendChild(newProjectContainer);

    projectsTab.appendChild(projectElements);
    container.appendChild(projectsTab);

};