import toDo from './todo';
import createProject from './project';
import { isSameDay, isAfter, parse } from 'date-fns';

export default function createProjectList(userDocumentData = null, userDocument = null){
    let storedPL = null;
    const loadProjectList = function() {
        if (storedPL) {
            projectList = [];
            for (let i = 0; i < storedPL.length; i++){
                const todos = storedPL[i].OtoDoList;
                let todosArray = [];
                for (let j = 0; j < todos.length; j++){
                    const todo = toDo(todos[j].Otitle, todos[j].Odescription, parse(todos[j].OdueDate, 'yyyy/MM/dd', new Date()), todos[j].Opriority, todos[j].Onotes, todos[j].Ochecklist, todos[j].OchecklistDoneStatus);
                    if (isAfter(todo.getDueDate(), new Date()) || isSameDay(todo.getDueDate(), new Date())){
                        todosArray.push(todo);
                    }
                }
                const project = createProject(storedPL[i].Otitle, todosArray, storedPL[i].OtoDoDoneStatus);
                projectList.push(project);
            }
        }
    }

    const update = function(){
        localStorage.setItem('projectList', JSON.stringify(projectList.map(v => v.stringableObject())));
        if (userDocument !== null) {
            console.log('Updating database...');
            userDocument.set({
                projectList: JSON.stringify(projectList.map(v => v.stringableObject())),
            }, {merge: true});
        }
    }

    let projectList = [createProject("Default")];
    if (userDocumentData !== null && userDocumentData.projectList !== undefined) {
        console.log('Loading from database...');
        storedPL = JSON.parse(userDocumentData.projectList);
        loadProjectList();
        update();
    } else {
        storedPL = JSON.parse(localStorage.getItem('projectList'));
        loadProjectList();
        update();
    }

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