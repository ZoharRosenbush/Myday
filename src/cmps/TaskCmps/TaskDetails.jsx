import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'
import { BeatLoader } from 'react-spinners'
import { setTaskModal, saveTask } from '../../store/board.action.js'
import { TaskUpdates } from "./TaskUpdates.jsx";
import { TaskActivity } from './TaskActivity.jsx'
import { TaskFiles } from './TaskFiles.jsx'
import { utilService } from '../../services/utils.service'


export class _TaskDetails extends React.Component {
    state = {
        task: null,

        buttonClicked: "updates"
    }
    loaderCSS = {
        marginTop: "30vh",
        position: "fixed",
        left: "50vw"
    }



    componentDidMount() {
        this.loadTask()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
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

    setClassName = (btnClicked) => {
        const { buttonClicked } = this.state
        const className = (btnClicked === buttonClicked) ? 'active-details' : ''
        return className
    }

    onUpdateTaskTitle = ({ target }) => {
        const { board, saveTask } = this.props
        const { groupId } = this.props.match.params
        const { task } = this.state
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
            buttonClicked: "updates"

        })
    }
    goToActivity = () => {
        this.setState({
            buttonClicked: "activity"
        })
    }
    goToFiles = () => {
        this.setState({
            buttonClicked: "files"

        })
    }

    render() {
        const { board } = this.props;
        const { buttonClicked, task } = this.state
        const { groupId } = this.props.match.params
        // const className = isTaskDetailsOpen ? "task-details" : "task-details task-details-closed"
        if (!task || !board)
            return <BeatLoader loading size={34} css={this.loaderCSS} color={"#ff3d57"} />

        return <React.Fragment>
            {/* {isTaskDetailsOpen && <div className="main-screen"></div>} */}
            <section className="task-details">
                <Link className="clean-link" to={`/2day/board/${board._id}`}>
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
                    <button onClick={this.goToUpdates} className="details-features"><span className={`details-span ${this.setClassName("updates")}`}>Updates</span></button><span> |</span>
                    <button onClick={this.goToFiles} className="details-features"><span className={`details-span ${this.setClassName("files")}`}>Files</span></button> <span> |</span>
                    <button onClick={this.goToActivity} className="details-features"><span className={`details-span ${this.setClassName("activity")}`}> Activity Log</span></button> <span> |</span>
                </div>
                {buttonClicked === "updates" && <TaskUpdates task={task} groupId={groupId} />}
                {buttonClicked === "activity" && <TaskActivity task={task} />}
                {buttonClicked === "files" && <TaskFiles task={task} board={board} groupId={groupId} />}

            </section>


        </React.Fragment >

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