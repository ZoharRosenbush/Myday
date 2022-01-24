import React from "react";
import { connect } from "react-redux";
import { AiOutlineLike } from 'react-icons/ai'
import { BsReply, BsBell } from 'react-icons/bs'
import { HiOutlineClock } from 'react-icons/hi'

import { saveTask } from '../../store/board.action.js'


class _TaskUpdates extends React.Component {
    state = {
        commentValue: ""
    }
    timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " m";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " d";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " h";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " min";
        }
        return Math.floor(seconds) + " sec";
    }
    onHandleChange = ({ target }) => {
        const value = target.value;
        this.setState({ commentValue: value });
    };
    onAddComment = (ev) => {
        ev.preventDefault();
        const { groupId, task, board } = this.props
        const newComment = {
            createdAt: Date.now(),
            txt: this.state.commentValue
        }
        saveTask(task, groupId, board._id, null, newComment)
        this.setState({ commentValue: "" });
    };
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
                            {(!!task.comments.length) && task.comments.map((comment) => {
                                return (
                                    <div key={comment.id} className="post flex column">

                                        <div className="post-header flex">
                                            <div className="header-container flex">
                                                <div className="avatar">{comment.byMember.acronyms}</div>
                                                <div className="user-name">{comment.byMember.fullname}</div>
                                                <div className="active-circle"></div>
                                            </div>
                                            <div className="time-ago"><HiOutlineClock color="#97989a" />{this.timeSince(comment.createdAt)}<BsBell color="#97989a" /></div>
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





function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    };
}
const mapDispatchToProps = {
}

export const TaskUpdates = connect(mapStateToProps, mapDispatchToProps)(_TaskUpdates);
