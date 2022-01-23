import React from "react";
import { connect } from "react-redux";


export class _TaskDetails extends React.Component {
    render() {
        return <section className="task-details"></section>
    }
}



function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
    };
}
const mapDispatchToProps = {
    // loadBoards,
    // addBoard,
    // setBoardNav
}
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails);


