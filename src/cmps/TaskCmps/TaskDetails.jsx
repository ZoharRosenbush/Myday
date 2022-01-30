import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'
import { setTaskModal, saveTask } from '../../store/board.action.js'
import { TaskUpdates } from "./TaskUpdates.jsx";
import { TaskActivity } from './TaskActivity.jsx'
import { TaskFiles } from './TaskFiles.jsx'
import { utilService } from '../../services/utils.service'

export class _TaskDetails extends React.Component {
    state = {
        task: null,
        isUpdates: true,
        isActivity: false,
        isFiles: false
    }

    componentDidMount() {
        this.loadTask()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            console.log('componentDidUpdate in task details')
            this.loadTask()
        }
    }

    loadTask = () => {
        const { groupId } = this.props.match.params
        const { taskId } = this.props.match.params;
        const { board } = this.props
        if (!board) return
        const currGroup = board.groups.find((group) => group.id === groupId)
        const currTask = currGroup.tasks.find((task) => task.id === taskId)
        this.setState((prevState) => ({ ...prevState, task: { ...currTask } }))
    }

    // getCurrTask = () => {
    //     const { groupId } = this.props.match.params
    //     const { taskId } = this.props.match.params;
    //     const { board } = this.props
    //     const currGroup = board.groups.find((group) => group.id === groupId)
    //     const currTask = currGroup.tasks.find((task) => task.id === taskId)
    //     return currTask
    // };

    onUpdateTaskTitle = ({ target }) => {
        const { board, saveTask } = this.props
        let { user } = this.props
        if (!user) {
            user = {
                "fullname": "Guest",
                "acronyms": "G",
                "_id": utilService.makeId(),
                "username": "guest",
                "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
                "userColor": "transparent"
            }
        }
        const task = this.getCurrTask()
        const { groupId } = this.props.match.params
        const value = target.textContent;
        if (!value) return;
        const activity = {
            "txt": `Changed task title to ${value}`,
            "createdAt": Date.now(),
        }
        task.title = value;
        try {
            saveTask(task, groupId, board, user, activity);
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
        const { isTaskDetailsOpen, board } = this.props;
        const { isUpdates, isActivity, isFiles, task } = this.state
        const { groupId } = this.props.match.params
        const className = isTaskDetailsOpen ? "task-details" : "task-details task-details-closed"
        console.log('board in task details', board)
        if (!task || !board) return <div>Loading...</div>
        return <React.Fragment>
            {/* {isTaskDetailsOpen && <div className="main-screen"></div>} */}
            <section className="task-details">
                <Link className="clean-link" to={`/myday/board/${board._id}`}>
                    <div className="close-details" onClick={this.onCloseTaskDetails}>
                        <AiOutlineClose size='19px' color="rgb(122 122 122)" />
                    </div>
                </Link>
                <div><h2 className="task-header-title"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={this.onUpdateTaskTitle}
                >
                    {task.title}
                </h2></div>

                <div className="btns-container flex">
                    <button className="details-features" onClick={this.goToUpdates}>Updates</button><span> |</span>
                    <button className="details-features" onClick={this.goToFiles}>Files</button> <span> |</span>
                    <button className="details-features" onClick={this.goToActivity}>Activity Log</button> <span> |</span>
                </div>
                {isUpdates && <TaskUpdates task={task} groupId={groupId} />}
                {isActivity && <TaskActivity task={task} />}
                {isFiles && <TaskFiles task={task} board={board} groupId={groupId} />}

            </section>


        </React.Fragment>

    }
}



function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        user: userModule.user,
        isTaskDetailsOpen: boardModule.isTaskDetailsOpen

    };
}
const mapDispatchToProps = {
    setTaskModal,
    saveTask
}
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);


