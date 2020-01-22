import React, {Component} from 'react';
import {Button, Input, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';


export default class AddListButton extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired
    };

    state = {
        newList: false,
        name: ''
    };

    onAddList = () => {
        this.setState({newList: true});
    };

    onNameChange = (event, {value}) => {
        this.setState({name: value});
    };

    onKeyPress = (event) => {
        if (event.which === 13) {
            this.handleSave();
        }
    };

    handleSave() {
        const name = this.state.name.trim();
        if (name.length === 0)
            return;

        this.props.onSave(name);
        this.setState({newList: false, name: ''});
    };

    onClose = () => {
        this.setState({newList: false, name: ''});
    };

    render() {
        const {newList, name} = this.state;

        let element;
        if (newList) {
            element = (
                <div className='new-list'>
                    <div>
                        <Input
                            ref={(input) => {
                                input && input.inputRef.current.focus()
                            }}
                            onChange={this.onNameChange}
                            onKeyPress={this.onKeyPress}
                        />
                    </div>
                    <div style={{paddingTop: 10}}>
                        <Button color='teal'
                                content='Add'
                                disabled={!(name && name.length > 0)}
                                onClick={() => this.handleSave()}
                        />
                        <Icon className='close-icon'
                              name='close'
                              size='large'
                              onClick={() => this.onClose()}
                              style={{paddingLeft: 10}}
                        />
                    </div>
                </div>
            )
        } else {
            element = (
                <div>
                    <Button primary
                            icon='plus'
                            labelPosition='left'
                            content='Add Task List'
                            onClick={this.onAddList}
                    />
                </div>
            );
        }

        return (
            <div>
                {element}
            </div>
        )
    }
}
