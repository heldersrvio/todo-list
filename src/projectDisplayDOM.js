import toDo from "./todo";
import { format, isValid, isAfter, isSameDay } from "date-fns";

export default function projectDisplay(doc, container, projectListObject){

    function createChecklistItem(todo, title, i, parentDiv){
        const checkitemContainer = doc.createElement('div');
        checkitemContainer.classList.add('checkitem-container');
        checkitemContainer.id = `checkitem-container-${i}`;

        const checkbox = doc.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `checkitem-${i}`;
        checkbox.id = `checkitem-${i}`;
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
        const newDueDate = new Date(doc.querySelector('.year-input').value, doc.querySelector('.month-input').value - 1, doc.querySelector('.day-input').value);
        if (isValid(newDueDate) && (isAfter(newDueDate, new Date()) || isSameDay(newDueDate, new Date()))){
            todo.setDueDate(newDueDate);
        }
        todo.setPriority(doc.querySelector('.priority').value);
        todo.setDescription(doc.querySelector('.todo-details-description-container textarea').value);
        todo.setNotes(doc.querySelector('.todo-details-notes-container textarea').value);
        const currentChecklist = todo.getCheckList();
        const newCheckList = Array.from(document.querySelectorAll('.checkitem-container input[type = "text"]')).map(v => v.value);
        for (let i = 0; i < currentChecklist.length; i++){
            todo.changeItemFromCheckList(i, newCheckList[i]);
        }
        projectListObject.update();
    }

    function createToDoDetailsDiv(project, index){
        const tD = doc.querySelector('.todo-details');

        if (!tD){
            const todo = project.getToDoList()[index];
            const mainScreen = doc.querySelector('#project-display');

            const toDoDetailsContainer = doc.createElement('div');
            toDoDetailsContainer.classList.add('todo-details');

            const titleAndDateDiv = doc.createElement('div');

            titleAndDateDiv.classList.add('todo-details-title-and-date');
            const titleDiv = doc.createElement('div');
            titleDiv.classList.add('todo-details-title-container');
            const title = doc.createElement('input');
            title.type = 'text';
            title.value = todo.getTitle();
            titleDiv.appendChild(title);
            titleAndDateDiv.appendChild(titleDiv);
            
            const dateDiv = doc.createElement('div');
            dateDiv.classList.add('todo-details-date-container');
            const dateYear = doc.createElement('input');
            dateYear.classList.add('year-input');
            dateYear.type = 'number';
            dateYear.value = todo.getDueDate().getFullYear();
            dateYear.min = (new Date()).getFullYear();
            dateYear.max = dateYear.min + 10;
            dateDiv.appendChild(dateYear);
            let spcb = doc.createElement('p');
            spcb.textContent = '\\';
            dateDiv.appendChild(spcb);
            const dateMonth = doc.createElement('input');
            dateMonth.classList.add('month-input');
            dateMonth.type = 'number';
            dateMonth.value = todo.getDueDate().getMonth() + 1;
            dateMonth.min = 1;
            dateMonth.max = 12;
            dateDiv.appendChild(dateMonth);
            spcb = doc.createElement('p');
            spcb.textContent = '\\';
            dateDiv.appendChild(spcb);
            const dateDay = doc.createElement('input');
            dateDay.classList.add('day-input');
            dateDay.type = 'number';
            dateDay.value = todo.getDueDate().getDate();
            dateDay.min = 1;
            dateDay.max = 31;
            dateDiv.appendChild(dateDay);
            spcb = doc.createElement('p');
            spcb.textContent = '\\';
            dateDiv.appendChild(spcb);
            titleAndDateDiv.appendChild(dateDiv);

            toDoDetailsContainer.appendChild(titleAndDateDiv);

            const priorityDiv = doc.createElement('div');
            priorityDiv.classList.add('todo-details-priority-container');
            const priorityLabel = doc.createElement('label');
            priorityLabel.classList.add('priority-label');
            priorityLabel.for = `priority-of-${index}`;
            priorityLabel.textContent = 'Priority: ';
            priorityDiv.appendChild(priorityLabel);
            const priority = doc.createElement('input');
            priority.classList.add('priority');
            priority.id = `priority-of-${index}`;
            priority.type = 'number';
            priority.value = todo.getPriority();
            priority.min = 1;
            priority.max = 5;
            priorityDiv.appendChild(priority);
            toDoDetailsContainer.appendChild(priorityDiv);

            const descriptionDiv = doc.createElement('div');
            descriptionDiv.classList.add('todo-details-description-container');
            const description = doc.createElement('textarea');
            description.classList.add('description');
            description.cols = '15';
            description.rows = '5';
            description.placeholder = 'Description';
            description.textContent = todo.getDescription();
            descriptionDiv.appendChild(description);
            toDoDetailsContainer.appendChild(descriptionDiv);

            const notesDiv = doc.createElement('div');
            notesDiv.classList.add('todo-details-notes-container');
            const notes = doc.createElement('textarea');
            notes.classList.add('notes');
            notes.cols = '15';
            notes.rows = '10';
            notes.placeholder = 'Notes';
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
                projectListObject.update();
                clearMainScreen();
                createProjectDisplay(project);
            });
            bottomButtons.appendChild(deleteButton);
            toDoDetailsContainer.appendChild(bottomButtons);

            mainScreen.appendChild(toDoDetailsContainer);
        }else{
            tD.classList.add('alert');
            setTimeout(function(){
                tD.classList.remove('alert');
            }, 1000);
        }
    }

    function createToDo(mS, project, i){
        const checkboxContainer = doc.createElement('div');
        checkboxContainer.classList.add('checkbox-container');
        const checkbox = doc.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `todo-${i}`;
        checkbox.id = `todo-${i}`;
        if (project.getToDoDoneStatus(i)){
            checkbox.checked = 'on';
        }
        checkbox.addEventListener('change', e => {
            const currentCheckbox = doc.querySelector(`#todo-${i}`);
            const checkboxLabel = doc.querySelector(`#label-for-todo-${i}`);
            if (currentCheckbox.checked){
                checkboxLabel.classList.add('checked');
            }else{
                checkboxLabel.classList.remove('checked');
            }
            project.changeToDoDoneStatus(i);
            projectListObject.update();
        });
        checkboxContainer.appendChild(checkbox);
        const label = doc.createElement('label');
        label.for = `todo-${i}`;
        label.id = `label-for-todo-${i}`;
        label.textContent = project.getToDoList()[i].getTitle();
        label.addEventListener('click', e => {
            createToDoDetailsDiv(project, i);
        });
        checkboxContainer.appendChild(label);

        const toDoDate = doc.createElement('p');
        toDoDate.classList.add('toDo-date-pv');
        toDoDate.textContent = format(project.getToDoList()[i].getDueDate(), 'yyyy/MM/dd');
        checkboxContainer.appendChild(toDoDate);

        checkboxContainer.classList.add(`priority-${project.getToDoList()[i].getPriority()}`);

        mS.appendChild(checkboxContainer);
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
            createToDo(mainScreen, project, i);
        }

        const newToDoButton = doc.createElement('button');
        newToDoButton.id = 'new-todo-button';
        newToDoButton.textContent = '+';
        newToDoButton.addEventListener('click', e => {
            const tD = doc.querySelector('.todo-details');
            if (!tD){
                const date = (new Date());
                const newToDo = toDo("", "", date, 1, "", []);
                project.addToDo(newToDo);
                projectListObject.update();
                createToDoDetailsDiv(project, project.getToDoList().length - 1);
            }else{
                tD.classList.add('alert');
                setTimeout(function(){
                    tD.classList.remove('alert');
                }, 1000);
            }
        });
        mainScreen.appendChild(newToDoButton);

        container.appendChild(mainScreen);
    };

    const todayDisplay = function(){
        const projectList = projectListObject.getProjectList();
        const tD = doc.querySelector('.todo-details');

        if (!tD){
            const mainScreen = doc.querySelector('#project-display') ? doc.querySelector('#project-display') : doc.createElement('div');
            mainScreen.id = 'project-display';
            const today = new Date();

            for (let i = 0; i < projectList.length; i++){
                const todos = projectList[i].getToDoList();
                for (let j = 0; j < todos.length; j++){
                    const currentTodo = todos[j];
                    if (isSameDay(currentTodo.getDueDate(), today)){
                        createToDo(mainScreen, projectList[i], j);
                    }
                }
            }
        }else{
            tD.classList.add('alert');
            setTimeout(function(){
                tD.classList.remove('alert');
            }, 1000);
        }
    };

    return {
        clearMainScreen,
        createProjectDisplay,
        todayDisplay,
    };
};