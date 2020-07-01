import toDo from "./todo";
import { format } from "date-fns";

export default function projectDisplay(doc, container){

    function createChecklistItem(todo, title, i, parentDiv){
        const checkitemContainer = doc.createElement('div');
        checkitemContainer.classList.add('checkitem-container');
        checkitemContainer.id = `checkitem-container-${i}`;

        const checkbox = doc.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `checkitem-${i}`;
        checkbox.id = `checkitem-${i}`;
        console.log(todo.getCheckListItemDoneStatus(i));
        if (todo.getCheckListItemDoneStatus(i)){
            checkbox.checked = `on`;
        }
        checkbox.addEventListener('change', e => {
            const currentCheckbox = doc.querySelector(`#checkitem-${i}`);
            const checkboxLabel = doc.querySelector(`input[name= ${currentCheckbox.name}]`);
            if (currentCheckbox.checked){
                checkboxLabel.classList.add('checked');
            }else{
                checkboxLabel.classList.remove('checked');
            }
            todo.changeCheckListItemDoneStatus(i);
        });
        checkitemContainer.appendChild(checkbox);
        const label = doc.createElement('input');
        label.type = 'text';
        label.name = `checkitem-${i}`;
        label.value = title;
        checkitemContainer.appendChild(label);

        const deleteButton = doc.createElement('button');
        deleteButton.classList.add('checkitem-delete-button');
        deleteButton.textContent = '-';
        deleteButton.addEventListener('click', e => {
            const itemToRemoveDiv = doc.querySelector(`#${checkitemContainer.id}`);

            todo.removeItemFromCheckList(i);
            itemToRemoveDiv.parentNode.removeChild(itemToRemoveDiv);
        });
        checkitemContainer.appendChild(deleteButton);
        parentDiv.appendChild(checkitemContainer);
    }

    function save(todo){
        todo.setTitle(doc.querySelector('.todo-details-title-container input').value);
        todo.setDescription(doc.querySelector('.todo-details-description-container textarea').value);
        todo.setNotes(doc.querySelector('.todo-details-notes-container textarea').value);
        const currentChecklist = todo.getCheckList();
        const newCheckList = Array.from(document.querySelectorAll('.checkitem-container input[type = "text"]')).map(v => v.value);
        console.log(currentChecklist);
        console.log(newCheckList);
        for (let i = 0; i < currentChecklist.length; i++){
            todo.changeItemFromCheckList(i, newCheckList[i]);
        }
    }

    function createToDoDetailsDiv(project, index){
        const todo = project.getToDoList()[index];
        const mainScreen = doc.querySelector('#project-display');

        const toDoDetailsContainer = doc.createElement('div');
        toDoDetailsContainer.classList.add('todo-details');

        const titleDiv = doc.createElement('div');
        titleDiv.classList.add('todo-details-title-container');
        const title = doc.createElement('input');
        title.type = 'text';
        title.value = todo.getTitle();
        titleDiv.appendChild(title);
        toDoDetailsContainer.appendChild(titleDiv);

        const descriptionDiv = doc.createElement('div');
        descriptionDiv.classList.add('todo-details-description-container');
        const description = doc.createElement('textarea');
        description.classList.add('description');
        description.cols = '15';
        description.rows = '5';
        description.textContent = todo.getDescription();
        descriptionDiv.appendChild(description);
        toDoDetailsContainer.appendChild(descriptionDiv);

        const notesDiv = doc.createElement('div');
        notesDiv.classList.add('todo-details-notes-container');
        const notes = doc.createElement('textarea');
        notes.classList.add('notes');
        notes.cols = '15';
        notes.rows = '10';
        notes.textContent = todo.getNotes();
        notesDiv.appendChild(notes);
        toDoDetailsContainer.appendChild(notesDiv);

        const checklistDiv = doc.createElement('div');
        checklistDiv.classList.add('todo-details-checklist-container');
        for (let i = 0; i < todo.getCheckList().length; i++){
            createChecklistItem(todo, todo.getCheckList()[i], i, checklistDiv);
        }
        toDoDetailsContainer.appendChild(checklistDiv);
        const newCheckItemButton = doc.createElement('button');
        newCheckItemButton.id = 'new-checkitem-button';
        newCheckItemButton.textContent = '+';
        newCheckItemButton.addEventListener('click', e => {
            const parentDiv = doc.querySelector('.todo-details-checklist-container');
            todo.addItemToCheckList("");
            createChecklistItem(todo, "", todo.getCheckList().length - 1, parentDiv);
        });
        toDoDetailsContainer.appendChild(newCheckItemButton);

        const bottomButtons = doc.createElement('div');
        bottomButtons.classList.add('todo-details-bottom-buttons');
        const saveButton = doc.createElement('button');
        saveButton.id = 'save-button';
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', e => {
            save(todo);
            clearMainScreen();
            createProjectDisplay(project);
        });
        bottomButtons.appendChild(saveButton);
        const deleteButton = doc.createElement('button');
        deleteButton.id = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', e => {
            project.removeToDo(index);
            clearMainScreen();
            createProjectDisplay(project);
        });
        bottomButtons.appendChild(deleteButton);
        toDoDetailsContainer.appendChild(bottomButtons);

        mainScreen.appendChild(toDoDetailsContainer);
    }

    const clearMainScreen = function(){
        const mainScreen = document.querySelector('#project-display');
        while (mainScreen && mainScreen.firstChild){
            mainScreen.removeChild(mainScreen.lastChild);
        }
    };

    const createProjectDisplay = function(project){
        const mainScreen = doc.querySelector('#project-display') ? doc.querySelector('#project-display') : doc.createElement('div');
        mainScreen.id = 'project-display';
        const todos = project.getToDoList();

        for (let i = 0; i < todos.length; i++){
            const checkboxContainer = doc.createElement('div');
            checkboxContainer.classList.add('checkbox-container');
            const checkbox = doc.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `todo-${i}`;
            checkbox.id = `todo-${i}`;
            console.log(project.getToDoDoneStatus(i));
            if (project.getToDoDoneStatus(i)){
                checkbox.checked = 'on';
            }
            checkbox.addEventListener('change', e => {
                const currentCheckbox = doc.querySelector(`#todo-${i}`);
                const checkboxLabel = doc.querySelector(`#label-for-todo-${i}`);
                console.log(currentCheckbox.name);
                console.log(checkboxLabel);
                console.log(doc.querySelector('label').for);
                if (currentCheckbox.checked){
                    checkboxLabel.classList.add('checked');
                }else{
                    checkboxLabel.classList.remove('checked');
                }
                project.changeToDoDoneStatus(i);
            });
            checkboxContainer.appendChild(checkbox);
            const label = doc.createElement('label');
            label.for = `todo-${i}`;
            label.id = `label-for-todo-${i}`;
            label.textContent = todos[i].getTitle();
            label.addEventListener('click', e => {
                createToDoDetailsDiv(project, i);
            });
            checkboxContainer.appendChild(label);
            mainScreen.appendChild(checkboxContainer);
        }

        const newToDoButton = doc.createElement('button');
        newToDoButton.id = 'new-todo-button';
        newToDoButton.textContent = '+';
        newToDoButton.addEventListener('click', e => {
            const date = format((new Date()).getDate() + 1, 'yyyy/mm/dd');
            const newToDo = toDo("", "", date, 1, "", []);
            project.addToDo(newToDo);
            createToDoDetailsDiv(project, project.getToDoList().length - 1);
        });
        mainScreen.appendChild(newToDoButton);

        container.appendChild(mainScreen);
    };

    return {
        clearMainScreen,
        createProjectDisplay,
    };
};