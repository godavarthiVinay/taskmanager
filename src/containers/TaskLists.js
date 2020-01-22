import {connect} from 'react-redux';
import * as Actions from '../actions';
import {bindActionCreators} from 'redux';
import {getTaskLists} from '../selectors';
import TaskList from "../components/TaskLists";

const mapStateToProps = state => ({
    taskLists: getTaskLists(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);
