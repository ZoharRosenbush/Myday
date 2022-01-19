import { TaskDetails } from "./TaskDetails.jsx";
import { DynamicCmp } from "../DynamicCmps/DynamicCmp.jsx";
import React from "react";

export class TaskPreview extends React.Component {
  state = {};

  onUpdate = (data) => {
    // console.log("Updating: ", cmp, "with data:", data);
    //Updating "status-peaker " with data: ""
  };

  info = {};
  task={status: "Done" }

  //GET FROM STORE
  cmpsOrder = [
    "status-picker",
    "member-picker",
    "date-picker",
    "priority-picker",
  ];
  render() {
    // const { task } = this.props;
    return (
      <section>
        {this.cmpsOrder.map((cmp, idx) => {
        
          return (
            <DynamicCmp
              task={this.task}
              cmp={cmp}
              key={idx}
              onUpdate={this.onUpdate}
            />
          );
        })}
        <h1>TaskPreview</h1>
        <TaskDetails />
      </section>
    );
  }
}

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
