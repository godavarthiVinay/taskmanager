import {
    ADD_TASK,
    ADD_TASK_LIST,
    DELETE_TASK,
    EDIT_TASK,
    MOVE_TASK,
} from '../constants/ActionTypes';
import _ from 'underscore';

const initialState = {
    taskLists: [],
    newTask: false
};

const addTaskList = (taskLists, name) => {
    return [
        ...taskLists,
        {
            id: taskLists.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1,
            name: name,
            tasks: []
        }
    ];
};


const isNewTaskExists = (list) => {
    const task = _.findWhere(list.tasks, {newList: true});
    return !!task;
};

const addTask = (taskLists, id) => {
    let lists = [...taskLists];
    const _list = _.findWhere({id});
    if (isNewTaskExists(_list))
        return lists;

    lists.map(list =>
        list.id === id ?
            list.tasks = [
                ...list.tasks,
                {
                    id: list.tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
                    name: '',
                    listId: id,
                    newTask: true
                }
            ]
            :
            list
    );
    return lists;
};

const editTask = (taskLists, listId, value) => {
    let lists = [...taskLists];
    lists.map(list => {
        if (list.id === listId) {
            let tasks = [...list.tasks];
            const index = _.findIndex(tasks, {id: value.id});
            tasks[index] = {
                ...tasks[index],
                name: value.name,
                newTask: false
            };
            list.tasks = [...tasks];
            return list;
        }
        return list;
    });
    return lists;
};


const moveTask = (taskLists, toListId, task) => {
    let lists = [...taskLists];

    // Remove 'task' from source list
    lists.map(list =>
        list.id === task.listId ?
            list.tasks = list.tasks.filter(_task =>
                _task.id !== task.id
            )
            :
            list
    );

    // Add 'task' to destination list
    lists.map(list =>
        list.id === toListId ?
            list.tasks = [
                ...list.tasks,
                {
                    ...task,
                    id: list.tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
                    listId: toListId
                }
            ]
            :
            list
    );

    return lists;
};

const deleteTask = (taskLists, task) => {
    let lists = [...taskLists];
    lists.map(list =>
        list.id === task.listId ?
            list.tasks = list.tasks.filter(_task => _task.id !== task.id)
            :
            list
    );
    return lists;
};

export default function taskLists(state = initialState, action) {
    let taskLists;
    switch (action.type) {
        case ADD_TASK_LIST:
            taskLists = addTaskList(state.taskLists, action.name);
            return {
                ...state,
                taskLists
            };

        case ADD_TASK:
            if (state.newTask)
                return state;

            taskLists = addTask(state.taskLists, action.id);
            return {
                ...state,
                taskLists,
                newTask: false
            };

        case EDIT_TASK:
            taskLists = editTask(state.taskLists, action.id, action.value);
            return {
                ...state,
                taskLists,
                newTask: false
            };

        case DELETE_TASK:
            taskLists = deleteTask(state.taskLists, action.task);
            return {
                ...state,
                taskLists
            };

        case MOVE_TASK:
            taskLists = moveTask(state.taskLists, action.toListId, action.task);
            return {
                ...state,
                taskLists,
            };

        default:
            return state
    }
}
