import {createSelector} from 'reselect';


const getState = state => state.taskLists;

export const getTaskLists = createSelector(
    [getState],
    state => state.taskLists
);

export const getTasks = createSelector(
    [getState],
    state => state.tasks
);
