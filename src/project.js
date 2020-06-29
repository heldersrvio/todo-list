export default function project(title, toDoList = []){
    let _title, _toDoList;

    const createProject = function(){
        _title = title;
        _toDoList = toDoList;
    }();

    const getTitle = function(){
        return _title;
    };

    const getToDoList = function(){
        return _toDoList;
    };

    const setTitle = function(newTitle){
        _title = newTitle;
    };

    const addToDo = function(newToDo){
        _toDoList.push(newToDo);
    };

    const removeToDo = function(index){
        _toDoList = _toDoList.splice(index, 1);
    };

    return {
        getTitle,
        getToDoList,
        setTitle,
        addToDo,
        removeToDo,
    };
};