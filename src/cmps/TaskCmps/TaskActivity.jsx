import React from "react";
import { connect } from "react-redux";


function _TaskActivity({ board, task }) {
    // const board = this.props;
    console.log('board:', board);
    console.log('task:', task);

    const currActivities = board.groups.map((group) => {
        return group.activities.map((activity) => {
            console.log('activity:', activity);
            return activity
        })
    })

    const activity = currActivities[0]
    console.log('activity:', activity);
    // activity.map((activity) => {
    return (
        <React.Fragment>

            <div>
                <ul>
                    {board.groups.map((group) => {
                        return group.activities.map((activity) => {
                            return (
                                <div className="flex">
                                    <li>
                                        <div className="time-ago">{activity[0].createdAt}</div>
                                    </li>
                                    <li>
                                        {activity[0].fullname}
                                        <div className="avatar"></div>
                                    </li>
                                    <li>
                                        <div className="task-name"><span>{activity[0].txt}</span></div>
                                        {/* <div className="owner"><span></span></div> */}
                                    </li>

                                </div>

                            )
                        }
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
