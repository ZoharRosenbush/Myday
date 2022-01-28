import React from "react";
import { connect } from "react-redux";
import { HiOutlineClock } from 'react-icons/hi'

function _TaskActivity({ board, task }) {

    function timeSince(date) {

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
    var aDay = 24 * 60 * 60 * 1000;
    console.log(timeSince(new Date(Date.now() - aDay)));
    console.log(timeSince(new Date(Date.now() - aDay * 2)));



    return (
        <React.Fragment>
            <div>
                <div className="posts-container">
                    {(!!task.activities.length) && task.activities.map((activity) => {
                        return (
                            <div key={activity.id} className="flex post-container">
                                <div className="time-ago"><HiOutlineClock />{timeSince(activity.createdAt)}</div>
                                <div className="member-name">{activity.byMember.fullname}</div>
                                <div className="avatar"> {activity.byMember.acronyms}</div>
                                <div className="task-name flex"><span>{activity.txt}</span></div>
                                {/* <div className="owner"><span></span></div> */}
                            </div>

                        )

                    })}

                </div>

            </div>

        </React.Fragment>
    )
}



// })



function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        user: userModule.user,
    };
}
const mapDispatchToProps = {
}

export const TaskActivity = connect(mapStateToProps, mapDispatchToProps)(_TaskActivity);
