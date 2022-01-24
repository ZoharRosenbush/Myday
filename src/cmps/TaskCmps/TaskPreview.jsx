import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import { MdArrowDropDownCircle } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgArrowDownR } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsChat } from "react-icons/bs";
import { IoIosColorFilter } from "react-icons/io";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";
import { makeId } from '../../services/board.service'
import { TaskDetails } from "./TaskDetails.jsx";
import { DynamicCmp } from "../DynamicCmps/DynamicCmp.jsx";
import {
  saveTask,
  setActiveModal,
  deleteTask,
  setTaskModal,
} from "../../store/board.action.js";



class _TaskPreview extends React.Component {
  state = {
    isModalTaskOpen: false,
  };


  openModal = (taskId) => {
    const activeModal = { cmpType: 'taskEdit', taskId: taskId }
    this.props.setActiveModal(activeModal)
  };

  deleteTask = () => {
    const { task, groupId, board, deleteTask } = this.props;
    this.setState({ isModalTaskOpen: !this.state.isModalTaskOpen });
    deleteTask(task.id, groupId, board._id);
  };

  openTaskDetails = () => {
    const { setTaskModal } = this.props;
    setTaskModal(true)
  }

  onUpdateTask = (cmpType, data) => {
    const { task, saveTask, groupId, board } = this.props;
    let activity;
    switch (cmpType) {
      case "status-picker":
        task.status = data
        activity = {
          "txt": `Changed task status to ${data}`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "priority-picker":
        task.priority = data;
        activity = {
          "txt": `Changed task priority to ${data}`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "member-picker":
        const isOwner = task.owner.findIndex((owner) => {
          return owner._id === data._id;
        });
        if (isOwner !== -1) return;
        task.owner.push(data);
        activity = {
          "txt": `Added ${data.fullname} as the task member`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "role-picker":
        task.role = data
        activity = {
          "txt": `Changed task role to ${data}`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "type-picker":
        task.type = data;
        activity = {
          "txt": `Changed task type to ${data}`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "date-picker":
        task.timeline = data;
        activity = {
          "txt": `Changed dates`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "text":
        task.text = data;
        activity = {
          "txt": `Changed text to ${data}}`,
          "createdAt": Date.now(),
        }
        saveTask(task, groupId, board._id, activity);
        break;
      case "text":
        task.cost = data;
        saveTask(task, groupId, board._id);
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
      case "text":
        return {
          type: "text",
          info: {
            // selectedStatus: task.status,
            text: task.text,
          },
        };
      case "cost":
        return {
          type: "cost",
          info: {
            // selectedStatus: task.status,
            text: task.cost,
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
      case "role-picker":
        return {
          type: "role-picker",
          info: {
            selectedStatus: task.role,
            roles: board.roles,
          },
        };
      case "type-picker":
        return {
          type: "type-picker",
          info: {
            selectedStatus: task.type,
            types: board.types,
          },
        };
      default:
    }
  };

  onUpdateTitleContent = ({ target }) => {
    const { task, board, groupId, saveTask, activeModal } = this.props;
    const value = target.textContent;
    if (!value) return;
    task.title = value;
    saveTask(task, groupId, board._id);
    // updateTitleContent(value, todo);
  };

  render() {
    const { board, groupId, activeModal, setActiveModal, task } = this.props;
    const group = board.groups.find((group) => {
      return groupId === group.id;
    });
    const groupColor = group.style.groupColor;
    const cmpsOrder = board.cmpsOrder;
    return (


      <section className="task-preview-section">
        <div className="flex task-icon">
          <div className="icon-down-task" onClick={(ev) => {
            ev.stopPropagation()
            this.openModal(task.id)
          }}>
            {/* {activeModal.taskId !== task.id && */}
            <IoMdArrowDropdown
              style={{
                backgroundColor: "#C8E1FA",
                color: "black",
                borderRadius: "5px",
              }}
            />
            {/* {activeModal.cmpType === 'taskEdit' && activeModal.taskId === task.id &&
            <IoMdArrowDropdown
              style={{
                backgroundColor: "#C8E1FA",
                color: "black",
                borderRadius: "5px",
                visibility: 'visible',
                position:'sticky'
              }}
              className="active-arrow-down"
            />} */}
          </div>

          <div className="drag-icon">
            <MdDragIndicator color="#c4c4c4" style={{ height: "1.3em", width: "1.3em" }} />
          </div>
          {activeModal.cmpType === 'taskEdit' && activeModal.taskId === task.id &&
            <div className="task-modal">
              <div className="flex modal-group-items" onClick={this.deleteTask}>
                <div>
                  <RiDeleteBinLine color="#323338c2" />{" "}
                </div>
                <span>Delete task</span>
              </div>
            </div>
          }
          <section className="task-preview flex">
            <div className="task-title-cell flex first-column">
              <div
                className="group-color"
                style={{ backgroundColor: `${group.style.groupColor}` }}
              ></div>
              <div className="task-title-content flex justify-between ">
                <span
                  className="task-title"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={this.onUpdateTitleContent}
                >
                  {task.title}
                </span>

                <Link onClick={() => this.openTaskDetails()} to={`/myday/board/${board._id}/${group.id}/${task.id}`}>
                  <div className="chat-icon-container">
                    <BsChat color="#c5c7d0" />
                  </div>
                </Link>
              </div>
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
            {/* <Route path="/myday/board/:boardId/:taskId" render={() => <TaskDetails group={group} />} /> */}
            <Route path="/myday/board/:boardId/:groupId/:taskId" component={TaskDetails} />

            {/* <Route path="/greeting/:name" render={(props) => <Greeting text="Hello, " {...props} />} /> */}

          </section>
        </div>

        <div className="finish-task">
        </div>
      </section>
      // </section>
      // )}
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
  deleteTask,
  setTaskModal
};

export const TaskPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TaskPreview);
