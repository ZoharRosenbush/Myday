import React from "react";
import { connect } from "react-redux";

import { TaskDetails } from "./TaskDetails.jsx";
import { DynamicCmp } from "../DynamicCmps/DynamicCmp.jsx";

export class _TaskPreview extends React.Component {
  state = {};

  updateTask = (cmpType, data) => {
    console.log("updateTask");
    // Switch
    // task.members = data;
    // task.status = data;
  };

  task = { status: "Done" };

  //GET FROM STORE

  cmpInfo = (cmpType) => {
    console.log('cmpType:', cmpType);
    
    const { task, board } = this.props;
    switch (cmpType) {
      case "status-picker":
        return {
          type: "status-picker",
          info: {
            selectedStatus: task.status,
            statuses: board.statuses,
          },
        };
      case "member-picker":
        return {
          type: "member-picker",
          info: {
            selectedMembers: task.owner,
            members: board.members,
          },
        };
      case "date-picker":
        return {
          type: "date-picker",
          info: {
            selectedDate: task.timeline,
          },
        };

      case "priority-picker":
        return {
          type: "priority-picker",
          info: {
            selectedStatus: task.priority,
            priorities: board.priorities,
          },
        };
      default:
    }
  };

  render() {
    const { board } = this.props;
   const cmpsOrder = board.cmpsOrder;
    return (
      <section>
        {cmpsOrder.map((cmp, idx) => {
          return (
            <DynamicCmp
              cmpData={this.cmpInfo(cmp)}
              key={idx}
              updateTask={this.updateTask}
            />
          );
        })}
        <h1>TaskPreview</h1>
        <TaskDetails />
      </section>
    );
  }
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    //   currFilterBy: toyModule.currFilterBy
  };
}
const mapDispatchToProps = {};

export const TaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreview);

// for monday

// function category(cmpsOrder){
//     return{
//         {cmpsOrder.map(cmp, idx)=>{
//            if{cmp===="status-picker" } return {

//         }}

//     }
// }

// const cmp1 = {
//     type: 'status-picker',
//     info: {
//         selectedStatus: 'Done',
//         statuses: [{ "value": 'Done', "color": 'green' }, {}]
//     }
// }

// const cmp2 = {
//     type: 'member-picker',
//     info: {
//         selectedMembers: ['m1', 'm2'],
//         members: ['m1', 'm2', 'm3']
//     }
// }

// const cmp3 = {
//     type: 'date-picker',
//     info: {
//         selectedDate: '2022-09-07',
//     }
// }
// const cmp4 = {
//     type: 'priority-picker',
//     info: {
//         selectedStatus: 'High',
//         priorities: [{}, {}]
//     }
// }
