export default function toDo(title, description = "", dueDate, priority = 1, notes = "", checkList = []){
    let _title, _description, _dueDate, _priority, _notes, _checkList;

    const createToDo = function(){
        _title = title;
        _description = description;
        _dueDate = dueDate;
        _priority = priority;
        _notes = notes;
        _checkList = checkList;
    }();

    const getTitle = function(){
        return _title;
    };

    const getDescription = function(){
        return _description;
    };

    const getDueDate = function(){
        return _dueDate;
    };

    const getPriority = function(){
        return _priority;
    };

    const getNotes = function(){
        return _notes;
    };

    const getCheckList = function(){
        return _checkList;
    };

    const setTitle = function(newTitle){
        _title = newTitle;
    };

    const setDescription = function(newDescription){
        _description = newDescription;
    };

    const setDueDate = function(newDueDate){
        _dueDate = newDueDate;
    };

    const setPriority = function(newPriority){
        if (newPriority < 6 && newPriority > 0){
            _priority = newPriority;
        }
    };

    const setNotes = function(newNotes){
        _notes = newNotes;
    };

    const addItemToCheckList = function(newItem){
        _checkList.push(newItem);
    };

    const removeItemFromCheckList = function(index){
        _checkList = _checkList.splice(index, 1);
    };

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getNotes,
        getCheckList,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setNotes,
        addItemToCheckList,
        removeItemFromCheckList,
    };
};