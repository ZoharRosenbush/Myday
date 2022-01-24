import React from "react";
import { connect } from "react-redux";
import { AiOutlineLike } from 'react-icons/ai'
import { BsReply } from 'react-icons/bs'

function _TaskUpdates() {
    return (
        <React.Fragment>
            <div className="update-area">
                <form>
                    <input placeholder="Write an update..."></input>
                </form>
            </div>
            <div className="post flex column">
                <div className="post-header"><div className="post-title"></div></div>
                <div className="post-actions flex">
                    <div><AiOutlineLike />Like</div>
                    <div><BsReply />Reply</div>
                </div>
            </div>
        </React.Fragment>
    )
}

function mapStateToProps({ userModule }) {
    return {
        //   user: userModule.user,
    };
}
const mapDispatchToProps = {
}

export const TaskUpdates = connect(mapStateToProps, mapDispatchToProps)(_TaskUpdates);
