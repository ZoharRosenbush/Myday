import React from "react";
import { connect } from "react-redux";
import { AiOutlineClose } from 'react-icons/ai'
import { setTaskModal, loadBoard, saveTask } from '../../store/board.action.js'
import { TaskUpdates } from "./TaskUpdates.jsx";
import { TaskActivity } from './TaskActivity.jsx'
import { TaskFiles } from './TaskFiles.jsx'
export class _TaskDetails extends React.Component {
    state = {
        isUpdates: true,
        isActivity: false,
        isFiles: false
    }

    getCurrTask = () => {
        const { taskId } = this.props.match.params;
        const { board } = this.props
        const task = board.groups.map((group) => {
            return group.tasks.filter((task) => task.id === taskId)
        }).flat()
        if (task.length !== 1) {
            console.error('invalid tasks count', task.length)
        }
        return task[0]
    };

    getCurrGroup = () => {
        const { taskId } = this.props.match.params;
        const task = this.getCurrTask()
        const { board } = this.props

        const currGroup = board.groups.map((group) => {
            console.log('group:', group);
            return group.tasks.filter((t) => (t === task))
            // group.tasks.find((task) => {
            //     return task.id === taskId
            // })
        })

        if (currGroup.length !== 1) {
            console.error('invalid tasks count', currGroup.length)
        }
        console.log('currGroup[0]:', currGroup[0]);

        return currGroup[0]
    };


    onUpdateTaskTitle = ({ target }) => {
        const { board, loadBoard, saveTask } = this.props
        const task = this.getCurrTask()
        const groupId = this.getCurrGroup().id
        const value = target.textContent;
        if (!value) return;
        task.title = value;
        console.log('task:', task);
        console.log('groupId:', groupId);
        console.log('board._id:', board._id);
        try {
            saveTask(task, groupId, board._id);
            loadBoard()
        } catch (err) {
            console.log('error in updating board', err);
        }
    }

    onCloseTaskDetails = () => {
        const { setTaskModal } = this.props;
        setTaskModal(false)
    }

    goToUpdates = () => {
        this.setState({
            isUpdates: true,
            isActivity: false,
            isFiles: false

        })
    }
    goToActivity = () => {
        this.setState({
            isUpdates: false,
            isActivity: true,
            isFiles: false
        })
    }
    goToFiles = () => {
        this.setState({
            isUpdates: false,
            isActivity: false,
            isFiles: true

        })
    }

    render() {
        // const { taskId } = this.props.match.params;
        // console.log('taskId:', taskId);
        // console.log('this.props:', this.props);
        const { isTaskDetailsOpen } = this.props;
        const { isUpdates, isActivity, isFiles } = this.state
        // const { isTaskDetailsOpen } = this.state
        const className = isTaskDetailsOpen ? "task-details" : "task-details task-details-closed"
        return <section className={`${className}`}>

            <div className="close-details" onClick={this.onCloseTaskDetails}>
                <AiOutlineClose size='19px' color="rgb(122 122 122)" />
            </div>

            <div><h2 className="task-header-title"
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={this.onUpdateTaskTitle}
            >
                {this.getCurrTask().title}
            </h2></div>

            <div className="btns-container flex">
                <button className="details-features" onClick={this.goToUpdates}>Updates</button><span> |</span>
                <button className="details-features" onClick={this.goToFiles}>Files</button> <span> |</span>
                <button className="details-features" onClick={this.goToActivity}>Activity Log</button> <span> |</span>
            </div>


            {isUpdates && <TaskUpdates />}
            {isActivity && <TaskActivity task={this.getCurrTask()} />}
            {isFiles && <TaskFiles />}
        </section>
    }
}



function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        isTaskDetailsOpen: boardModule.isTaskDetailsOpen

    };
}
const mapDispatchToProps = {
    setTaskModal,
    loadBoard,
    saveTask
}
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);


