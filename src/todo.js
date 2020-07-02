import { format } from 'date-fns';

export default function toDo(title, description = "", dueDate, priority = 1, notes = "", checkList = [], checkListDone = []){
    let _title, _description, _dueDate, _priority, _notes, _checkList, _checkListDone;

    const createToDo = function(){
        _title = title;
        _description = description;
        _dueDate = dueDate;
        _priority = priority;
        _notes = notes;
        _checkList = checkList;
        _checkListDone = checkListDone ? checkListDone : _checkList.map(v => false);
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
        _checkListDone.push(false);
    };

    const removeItemFromCheckList = function(index){
        _checkList.splice(index, 1);
        _checkListDone.splice(index, 1);
    };

    const changeItemFromCheckList = function(index, newValue){
        _checkList[index] = newValue;
    };

    const getCheckListItemDoneStatus = function(index){
        return _checkListDone[index];
    };

    const changeCheckListItemDoneStatus = function(index){
        _checkListDone[index] = !_checkListDone[index];
    };

    const stringableObject = function(){
        return {
            Otitle: getTitle(),
            Odescription: getDescription(),
            OdueDate: format(getDueDate(), 'yyyy/MM/dd'),
            Opriority: getPriority(),
            Onotes: getNotes(),
            Ochecklist: getCheckList(),
            OchecklistDoneStatus: getCheckList().map((v, i) => getCheckListItemDoneStatus(i)),
        };
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
        changeItemFromCheckList,
        getCheckListItemDoneStatus,
        changeCheckListItemDoneStatus,
        stringableObject,
    };
};