import toDo from './todo';
import createProject from './project';
import { parse } from 'date-fns';

export default function createProjectList(){
    const pLFromLocalStorage = JSON.parse(localStorage.getItem('projectList'));
    let projectList = [createProject("Default")];
    if (pLFromLocalStorage){
        projectList = [];
        for (let i = 0; i < pLFromLocalStorage.length; i++){
            const todos = pLFromLocalStorage[i].OtoDoList;
            let todosArray = [];
            for (let j = 0; j < todos.length; j++){
                const todo = toDo(todos[j].Otitle, todos[j].Odescription, parse(todos[j].OdueDate, 'yyyy/MM/dd', new Date()), todos[j].Opriority, todos[j].Onotes, todos[j].Ochecklist, todos[j].OchecklistDoneStatus);
                todosArray.push(todo);
            }
            const project = createProject(pLFromLocalStorage[i].Otitle, todosArray, pLFromLocalStorage[i].OtoDoDoneStatus);
            projectList.push(project);
        }
    }

    const update = function(){
        localStorage.setItem('projectList', JSON.stringify(projectList.map(v => v.stringableObject())));
    }

    update();

    const getProjectList = function(project){
        return projectList;
    };

    const appendItemToProjectList = function(project){
        projectList.push(project);
        update();
    };

    const removeItemFromProjectList = function(project){
        let index = projectList.indexOf(project);
        if (index === 0){
            return;
        }
        projectList.splice(index, 1);
        update();
    };

    return {
        getProjectList,
        appendItemToProjectList,
        removeItemFromProjectList,
        update,
    };
};