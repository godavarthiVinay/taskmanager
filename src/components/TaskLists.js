import React from 'react';
import PropTypes from 'prop-types';
import AddListButton from './AddListButton';
import List from "./List";

const TaskLists = ({taskLists, actions}) => {

    return (
        <div className='lists'>
            {taskLists && taskLists.map(list => {
                const listProps = {
                    list,
                    actions
                };
                return (<List key={list.id} {...listProps}/>);
            })}
            <div style={{paddingLeft: 5}}>
                <AddListButton
                    onSave={name => actions.addTaskList(name)}
                />
            </div>
        </div>
    );
};

TaskLists.propTypes = {
    taskLists: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default TaskLists;
