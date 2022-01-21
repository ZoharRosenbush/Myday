import React from "react";
import { connect } from "react-redux";

import { TaskDetails } from "./TaskDetails.jsx";
import { DynamicCmp } from "../DynamicCmps/DynamicCmp.jsx";
import { saveTask, setActiveModal } from "../../store/board.action.js";
import { MdArrowDropDownCircle } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgArrowDownR } from "react-icons/cg";

class _TaskPreview extends React.Component {
  onUpdateTask = (cmpType, data) => {
    const { task, saveTask, groupId, board } = this.props;
    switch (cmpType) {
      case "status-picker":
        task.status = data;
        saveTask(task, groupId, board._id);
        break;
      case "priority-picker":
        task.priority = data;
        saveTask(task, groupId, board._id);
        break;
      case "member-picker":
        const isOwner = task.owner.findIndex((owner) => {
          return owner._id === data._id;
        });
        if (isOwner !== -1) return;
        task.owner.push(data);
        saveTask(task, groupId, board._id);
        break;
      case "date-picker":
        task.timeline = data
        saveTask(task, groupId, board._id)
        break;
      default:
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

  onUpdateTitleContent = ({ target }) => {
    const { task, board, groupId, saveTask } = this.props;
    const value = target.textContent;
    if (!value) return;
    task.title = value;
    saveTask(task, groupId, board._id);
    // updateTitleContent(value, todo);
  }

  render() {
    const { board, groupId, activeModal, setActiveModal, task } = this.props;
    const group = board.groups.find(group => {
      return groupId === group.id
    })
    const groupColor = group.style.groupColor
    const cmpsOrder = board.cmpsOrder;

    return (
      <div className="flex task-icon">
      <div className="icon-down-task"><IoMdArrowDropdown style={{backgroundColor:"#C8E1FA" ,color:"black", borderRadius: "5px"}}/></div>
      <section className="task-preview flex">

        <div className="task-title-cell flex first-column">
          <div
            className="group-color"
            style={{ backgroundColor: `${group.style.groupColor}` }}
            ></div>
          <span
            className="task-title"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={this.onUpdateTitleContent}
            >
            {task.title}
          </span>

        </div>



        {cmpsOrder.map((cmp, idx) => {
          return (
            <DynamicCmp
            cmpData={this.cmpInfo(cmp)}
            key={idx}
            taskId={task.id}
            groupColor={groupColor}
            onUpdateTask={this.onUpdateTask}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            />
            );
          })}
        <TaskDetails />
      </section>
          </div>
    );
  }
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    activeModal: boardModule.activeModal,
    //   currFilterBy: toyModule.currFilterBy
  };
}
const mapDispatchToProps = {
  saveTask,
  setActiveModal,
};

export const TaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreview);
