import React from "react";
import { connect } from "react-redux";
import { HiOutlineClock } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { utilService } from '../../services/utils.service'
function _TaskActivity({ task }) {


    return (


        <React.Fragment>
            <div>
                <div className="posts-container">
                    {(!!task.activities.length) && task.activities.map((activity) => {
               

                        return (
                            <div key={activity.id} className="flex post-container">
                                <div className="time-ago"><HiOutlineClock /><span>{utilService.timeSince(activity.createdAt)}</span></div>
                                {/* <div className="member-name">{activity.byMember.fullname}</div> */}
                                {activity.byMember.fullname !== 'Guest' ? <div className="avatar" style={{ backgroundColor: `${activity.byMember.userColor}` }} > {activity.byMember.acronyms}</div>
                                    : <CgProfile color="grey" style={{
                                        fontSize: "27px", marginLeft: "3px", marginTop: "-2px", maxWidth: "27px", minWidth: "27px"
                                    }} />}
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



function mapStateToProps({userModule }) {
    return {
        user: userModule.user,
    };
}
const mapDispatchToProps = {
}

export const TaskActivity = connect(mapStateToProps, mapDispatchToProps)(_TaskActivity);
