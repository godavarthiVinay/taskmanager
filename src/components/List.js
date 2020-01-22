import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';
import Task from "./Task";

class List extends React.Component {

    onAddTask() {
        const {actions} = this.props;
        actions.addTask(this.props.list.id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    };

    onDrop = (ev, toListId) => {
        let task = ev.dataTransfer.getData("task");
        task = JSON.parse(task);
        this.props.actions.moveTask(toListId, task);
    };

    render() {
        const {list, actions} = this.props;

        const tasks = list.tasks;

        return (
            <div className="task-list">
                <div className='list-head'>
                    <label>{list.name}</label>
                </div>
                <div className='list-content droppable'
                     onDragOver={(ev) => this.onDragOver(ev)}
                     onDrop={(ev) => this.onDrop(ev, list.id)}
                >
                    {tasks && tasks.map(task => {
                        const taskProps = {
                            task,
                            editTask: (value) => actions.editTask(list.id, value),
                            deleteTask: (task) => actions.deleteTask(task),
                        };

                        return (<Task key={task.id} {...taskProps}/>);
                    })}
                </div>
                <div className='list-foot'>
                    <Button icon='plus'
                            content='Add Task'
                            onClick={this.onAddTask.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

List.propTypes = {
    list: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default List;
