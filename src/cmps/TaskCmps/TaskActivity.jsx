import React from "react";
import { connect } from "react-redux";
import { HiOutlineClock } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
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
    // var aDay = 24 * 60 * 60 * 1000;
    // console.log(timeSince(new Date(Date.now() - aDay)));
    // console.log(timeSince(new Date(Date.now() - aDay * 2)));

    // const { user } = this.props

    return (


        <React.Fragment>
            <div>
                <div className="posts-container">
                    {(!!task.activities.length) && task.activities.map((activity) => {
                        console.log('activity:', activity);
                        console.log('activity.byMember.userColor:', activity.byMember.userColor);

                        return (
                            <div key={activity.id} className="flex post-container">
                                <div className="time-ago"><HiOutlineClock />{timeSince(activity.createdAt)}</div>
                                {/* <div className="member-name">{activity.byMember.fullname}</div> */}
                                {activity.byMember.fullname !== 'Guest' ? <div className="avatar" style={{ backgroundColor: `${activity.byMember.userColor}` }} > {activity.byMember.acronyms}</div>
                                    : <CgProfile style={{ fontSize: "27px", marginLeft: "3px", marginTop: "-2px" }} />}
                                {/* <div className="user-avatar ME" style={{ backgroundColor: `${activity.byMember.userColor}` }}>{(user) ? user.acronyms : <CgProfile style={{ fontSize: "45px", marginLeft: "-10px", marginTop: "-2px" }} />}</div> */}

                                <div className="task-name flex"><span>{activity.txt}</span></div>
                                {/* <div className="owner"><span></span></div> */}
                            </div>

                        )

                    })}

                </div>

            </div>

        </React.Fragment >
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
