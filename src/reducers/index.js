import {combineReducers} from 'redux';
import taskLists from './taskLists';

const rootReducer = combineReducers({
    taskLists,
});

export default rootReducer;
