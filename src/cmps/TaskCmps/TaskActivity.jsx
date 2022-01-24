import React from "react";
import { connect } from "react-redux";


function _TaskActivity({ board, task }) {
    return (
        <React.Fragment>
            <div>
                <ul>
                    {task.activities.map((activity) => {
                        return (
                            <div className="flex">
                                <li>
                                    <div className="time-ago">{activity.createdAt}</div>
                                </li>
                                <li>
                                    {activity.byMember.fullname}
                                    <div className="avatar"></div>
                                </li>
                                <li>
                                    <div className="task-name"><span>{activity.txt}</span></div>
                                    {/* <div className="owner"><span></span></div> */}
                                </li>

                            </div>

                        )

                    })}

                </ul>

            </div>

        </React.Fragment>
    )
}



// })



function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
    };
}
const mapDispatchToProps = {
}

export const TaskActivity = connect(mapStateToProps, mapDispatchToProps)(_TaskActivity);
