import React from "react";
import { connect } from "react-redux";

import { TaskDetails } from "./TaskDetails.jsx";
import { DynamicCmp } from "../DynamicCmps/DynamicCmp.jsx";
import { saveTask } from "../../store/board.action.js";

class _TaskPreview extends React.Component {
  onUpdateTask = (cmpType, data) => {
    const { task, saveTask, groupId, board } = this.props;
    switch (cmpType) {
      case "status-picker":
        task.status = data;
        saveTask(task, groupId, board._id);
        break;
      case "member-picker":
        const isOwner = task.owner.findIndex((owner) => {
          console.log("owner:", owner);
          return owner._id === data._id;
        });
        if (isOwner !== -1) return;
        task.owner.push(data);
        saveTask(task, groupId, board._id);
        break;
    }
  };

  cmpInfo = (cmpType) => {
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
            selectedOwners: task.owner,
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

  onUpdateTitleContent= ({ target })=> {
    console.log(' onUpdateTitleContent');
    console.log('this.props:', this.props);
    
    const { task, board , groupId,saveTask} = this.props;
    const value = target.textContent;
    console.log("value:", value);

    if (!value) return;
    task.title = value
    saveTask(task, groupId, board._id);
    // updateTitleContent(value, todo);
  }

  render() {
    const { board, groupId } = this.props;
    const group = board.groups.find(group=>{
      return groupId === group.id
    })
    const cmpsOrder = board.cmpsOrder;
    const { task } = this.props;
    return (
      <section className="task-preview">
        <div className="group-color" style={{backgroundColor:`${group.style.groupColor}`}}></div>
        <span
          className="task-title"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={this.onUpdateTitleContent}
        >
          {task.title}
        </span>
        {cmpsOrder.map((cmp, idx) => {
          return (
            <DynamicCmp
              cmpData={this.cmpInfo(cmp)}
              key={idx}
              onUpdateTask={this.onUpdateTask}
            />
          );
        })}
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
  saveTask,
};

export const TaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreview);
