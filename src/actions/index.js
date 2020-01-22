import * as types from '../constants/ActionTypes';

export const addTaskList = name => ({type: types.ADD_TASK_LIST, name});
export const addTask = id => ({type: types.ADD_TASK, id});
export const deleteTask = task => ({type: types.DELETE_TASK, task});
export const editTask = (id, value) => ({type: types.EDIT_TASK, id, value});
export const moveTask = (toListId, task) => ({type: types.MOVE_TASK, toListId, task});
