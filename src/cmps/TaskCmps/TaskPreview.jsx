import React from "react";
import { connect } from "react-redux";

import { TaskDetails } from "./TaskDetails.jsx";
import { DynamicCmp } from "../DynamicCmps/DynamicCmp.jsx";
import {saveTask} from '../../store/board.action.js';

 class _TaskPreview extends React.Component {
  state = {};

  componentDidMount() {
    console.log('this.props in task preview', this.props);
  }
  

  onUpdateTask = (cmpType, data) => {
  const {task, saveTask, groupId, board} = this.props
    console.log("board", board);
    switch (cmpType) {
      case "status-picker":
        task.status = data
        saveTask(task, groupId, board._id )
         break;
  };
}

  cmpInfo = (cmpType) => {
    console.log('cmpType:', cmpType);
    
    const { task, board } = this.props;
    console.log('task:',task );
    
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
    console.log('this.props in render preview:', this.props);
    
    const { board } = this.props;
    console.log('board:', board);
    
   const cmpsOrder = board.cmpsOrder;
    return (
      <section>
        {cmpsOrder.map((cmp, idx) => {
          return (
            <DynamicCmp
              cmpData={this.cmpInfo(cmp)}
              key={idx}
              onUpdateTask={this.onUpdateTask}
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
const mapDispatchToProps = {
  saveTask
};

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
