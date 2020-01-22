import React, {Component} from 'react';
import {TextArea, Form, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';


export default class Task extends Component {
    static propTypes = {
        task: PropTypes.object.isRequired,
        editTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
    };

    state = {
        editing: false,
        name: ''
    };

    onNameChange = (event, {value}) => {
        this.setState({name: value});
    };

    onKeyPress = (event, task) => {
        if (event.which === 13) {
            this.handleSave(task);
        }
    };

    handleSave(task) {
        const name = this.state.name.trim();
        if (name.length === 0) {
            this.props.deleteTask(task);
            return;
        }

        this.props.editTask({id: task.id, name});
        this.setState({editing: false, name: ''});
    };

    handleDoubleClick() {
        this.setState({
            editing: true,
            name: this.props.task.name
        });
    };

    onDragStart = (ev, task) => {
        ev.dataTransfer.setData("task", JSON.stringify(task));
    };

    render() {
        const {editing, name} = this.state;
        const {task} = this.props;

        let element;
        if (editing || (task && task.newTask)) {
            element = (
                <Form>
                    <TextArea
                        ref={(input) => {
                            input && input.ref.current.focus()
                        }}
                        onChange={this.onNameChange}
                        onKeyPress={(e) => this.onKeyPress(e, task)}
                        value={name}
                        onBlur={() => this.handleSave(task)}
                    />
                </Form>
            );
        } else {
            element = (
                <div className='task'
                     draggable
                     onDragStart={(ev) => this.onDragStart(ev, task)}
                     onDoubleClick={this.handleDoubleClick.bind(this)}
                >
                    <div className='del-icon'>
                        <Icon name='close'
                              color='red'
                              onClick={() => this.props.deleteTask(task)}
                        />
                    </div>
                    <p>
                        {task && task.name}
                    </p>
                </div>
            );
        }

        return (
            <div>
                {element}
            </div>
        );
    }
}
