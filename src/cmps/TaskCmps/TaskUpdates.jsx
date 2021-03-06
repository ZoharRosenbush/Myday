import React from "react";
import { connect } from "react-redux";
import { AiOutlineLike, AiOutlineClose } from 'react-icons/ai'
import { BsReply, BsBell } from 'react-icons/bs'
import { HiOutlineClock } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'

import { utilService } from "../../services/utils.service.js";
import { saveTask } from '../../store/board.action.js'
import noUpdates from '../../assets/imgs/noupdates.PNG'

class _TaskUpdates extends React.Component {
    state = {
        commentValue: ""
    }

    onHandleChange = ({ target }) => {
        const value = target.value;
        this.setState({ commentValue: value });
    };
    onAddComment = (ev) => {
        ev.preventDefault();
        const { groupId, task, board, saveTask } = this.props
        let { user } = this.props
        if (!user) {
            user = {
                "fullname": "Guest",
                "acronyms": "G",
                "_id": utilService.makeId(),
                "username": "guest",
                "userColor": "transparent"
            }
        }
        const newComment = {
            createdAt: Date.now(),
            txt: this.state.commentValue
        }
        saveTask(task, groupId, board, user, null, newComment)
        this.setState({ commentValue: "" });
    };

    onRemoveUpdate = (id) => {
        console.log('id:', id);
        const { groupId, task, board, saveTask } = this.props
        console.log('task:', task);
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
        const filteredComments = task.comments.filter((comment) => comment.id !== id)
        task.comments = filteredComments
        const taskToSave = { ...task }
        saveTask(taskToSave, groupId, board, user)
    }
    render() {
        const { task } = this.props
        return (
            <React.Fragment>
                <div className="update-area">

                    <form
                        onSubmit={this.onAddComment}
                        className="flex justify-between align-center"
                    >
                        <input
                            placeholder="Write an update..."
                            onChange={this.onHandleChange}
                            value={this.state.commentValue}
                        />
                    </form>
                </div>
                <React.Fragment>
                    <div>
                        <div className="posts-container">
                            {!task.comments.length && <img src={noUpdates} className="flex no-updates-img" alt=""></img>}
                            {(!!task.comments.length) && task.comments.map((comment) => {
                                return (
                                    <div key={comment.id} className="post flex column">

                                        <div className="post-header flex">
                                            <div className="header-container flex">
                                                {comment.byMember.fullname !== 'Guest' ? <div className="avatar" style={{ backgroundColor: `${comment.byMember.userColor}` }} > {comment.byMember.acronyms}</div>
                                                    : <CgProfile style={{ fontSize: "40px", marginLeft: "13px", marginTop: "-2px", color: "grey" }} />}

                                                <div className="user-name">{comment.byMember.fullname}</div>
                                                <div className="active-circle"></div>
                                            </div>
                                            <div className="flex">
                                                <div className="time-ago"><HiOutlineClock color="#97989a" size="14px" /><span>{utilService.timeSince(comment.createdAt)}</span><BsBell color="#97989a" size="14px" style={{ paddingTop: "2px" }} /></div>
                                                <button onClick={() => this.onRemoveUpdate(comment.id)}><AiOutlineClose size='15px' color="rgb(122 122 122)" /></button>
                                            </div>
                                        </div>
                                        <div className="post-title flex">
                                            {comment.txt}

                                        </div>
                                        <div className="post-actions flex">
                                            <div><AiOutlineLike />Like</div>
                                            <div><BsReply />Reply</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </React.Fragment>
            </React.Fragment>
        )
    }


}





function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        user: userModule.user,
    };
}
const mapDispatchToProps = {
    saveTask
}

export const TaskUpdates = connect(mapStateToProps, mapDispatchToProps)(_TaskUpdates);
