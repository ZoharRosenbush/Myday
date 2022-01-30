import React from "react";
import { connect } from "react-redux";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosColorFilter } from "react-icons/io";
import { GrCircleAlert } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { GrDrag } from "react-icons/gr";
import { Droppable } from "react-beautiful-dnd";
import { logDOM } from "@testing-library/react";
import { MdDragIndicator } from "react-icons/md";

import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { ColorInput } from "./ColorInput.jsx";
import { ProgressBarStatus } from "../DynamicCmps/ProgressBarStatus.jsx";
import { ProgressBarPriority } from "../DynamicCmps/ProgressBarPriority.jsx";
import { ProgressBarType } from "../DynamicCmps/ProgressBarType.jsx";
import { ProgressBarRole } from "../DynamicCmps/ProgressBarRole.jsx";
import { ProgressBarCost } from "../DynamicCmps/ProgressBarCost.jsx";

import {
  addTask,
  saveGroup,
  deleteGroup,
  setActiveModal,
  saveBoard
} from "../../store/board.action.js";
import { utilService } from '../../services/utils.service.js'

export class _GroupPreview extends React.Component {
  state = {
    taskValue: "",
    isModalToDelete: false,
    isAddTaskActive: false,
    // isFirstRender: true

  };


  // componentDidMount() {
  //   this.setState((prevState) => ({ ...prevState, isFirstRender: false }), () => { console.log('first render', this.state.isFirstRender) })
  // }


  openModal = (modal) => {
    const { group, setActiveModal } = this.props;
    let activeModal;
    switch (modal) {
      case "colorModal":
        activeModal = {
          cmpType: "ColorInput",
          taskId: null,
          groupId: group.id,
        };
        setActiveModal(activeModal);
        break;
      case "groupEdit":
        activeModal = {
          cmpType: "groupEdit",
          taskId: null,
          groupId: group.id,
        };
        setActiveModal(activeModal);
        break;
      default:
    }
  };

  toggleAddTask = () => {
    this.setState(
      (prevState) => ({
        ...prevState,
        isAddTaskActive: !prevState.isAddTaskActive,
      }),
      () => {
        // console.log("changing active", this.state);
      }
    );
  };


  checkIfTaskSearched = (task) => {
    const { search } = this.props;
    if (!search) return true
    const taskText = search && (task.title.toLowerCase().includes(search.search.toLowerCase()))
    return taskText

  }

  checkIfTaskFiltered = (task) => {
    const { currFilterBy } = this.props
    console.log('currFilterBy:', currFilterBy);
    
    if (!currFilterBy.priority.length &&
      !currFilterBy.status.length &&
      !currFilterBy.type.length &&
      !currFilterBy.role.length &&
      !currFilterBy.member.length) {

      return true
    }
    else {
      const isPriority = (currFilterBy.priority.includes(task.priority))
      const isStatus = (currFilterBy.status.includes(task.status))
      const isType = (currFilterBy.type.includes(task.type))
      const isRole = (currFilterBy.role.includes(task.role))


      let isMember;
      task.owner.map(owner => {
        isMember = (currFilterBy.member.includes(owner.username))
      })

      const isTaskToShow = (isMember || isRole || isType || isStatus || isPriority)
      return isTaskToShow
    }
  }


  toggelModalDelete = () => {
    this.setState({ isModalToDelete: !this.state.isModalToDelete });
  };

  onUpdateTitleContent = ({ target }) => {
    const { group, board, saveGroup } = this.props;
    const value = target.textContent;
    if (!value) return;
    group.title = value;
    const boardCopy = utilService.createDeepCopy(board)
    saveGroup(group, boardCopy)
  };

  onUpdateGroupColor = (color) => {
    const { group, board, saveGroup } = this.props;
    group.style.groupColor = color;
    const boardCopy = utilService.createDeepCopy(board)
    saveGroup(group, boardCopy)
  };

  onDeleteGroup = () => {
    console.log('hellooo')
    this.setState({ isModalToDelete: false });
    const { deleteGroup, group, board } = this.props;
    console.log('board on delete group', board)
    const boardCopy = utilService.createDeepCopy(board)
    deleteGroup(group.id, boardCopy);
  };

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskValue: value });
  };

  onAddTask = (ev) => {

    ev.preventDefault();
    const { group, board, addTask } = this.props;
    let { user } = this.props
    if (!user) {
      user = {

        "fullname": "Guest",
        "acronyms": "G",
        "_id": utilService.makeId(),
        "username": "guest",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
        "userColor": "transparent"
      }
    }
    const activity = {
      "txt": `Created new task ${this.state.taskValue}`,
      "createdAt": Date.now(),
    }
    const boardCopy = utilService.createDeepCopy(board)

    addTask(this.state.taskValue, group.id, boardCopy, user, activity)
    this.setState({ taskValue: "" });
  };

  cmpTitle = (cmpType) => {
    if (cmpType === "member-picker") return "Owners";
    else if (cmpType === "priority-picker") return "Priority";
    else if (cmpType === "role-picker") return "Role";
    else if (cmpType === "date-picker") return "Timeline";
    else if (cmpType === "type-picker") return "Type";
    else if (cmpType === "text") return "Text";
    else if (cmpType === "cost") return "Cost";
    else return "Status";
  };



  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { group, board, saveBoard, goToTaskDetails } = this.props;

    if (!destination) return;
    if (
      destination.index === source.index
    ) {
      return;
    }
  }

  onUpdateGroupColor = (color) => {
    const { group, board, saveGroup } = this.props;
    // const value = target.textContent;
    // if (!value) return;
    group.style.groupColor = color;
    saveGroup(group, board);
  };

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskValue: value });
  };



  cmpTitle = (cmpType) => {
    if (cmpType === "member-picker") return "Owners";
    else if (cmpType === "priority-picker") return "Priority";
    else if (cmpType === "role-picker") return "Role";
    else if (cmpType === "date-picker") return "Timeline";
    else if (cmpType === "type-picker") return "Type";
    else if (cmpType === "text") return "Text";
    else if (cmpType === "cost") return "Cost";
    else return "Status";
  };



  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { group, board, saveBoard } = this.props;

    if (!destination) return;
    if (
      destination.index === source.index
    ) {
      return;
    }

    board.cmpsOrder.splice(source.index, 1);
    board.cmpsOrder.splice(destination.index, 0, draggableId);

    const boardCopy = utilService.createDeepCopy(board)
    saveBoard(boardCopy);
  };

  render() {
    // console.log('rendering!');

    const { group, board, activeModal, idx, goToTaskDetails } = this.props;
    const cmpsOrder = board.cmpsOrder;
    const { isGroupModalOpen, isModalToDelete, isAddTaskActive } = this.state;
    const btnClassName = isAddTaskActive
      ? "add-task-btn-visible"
      : "add-task-btn";
    return (
      <section className="group-preview">
        {activeModal.cmpType === "groupEdit" &&
          activeModal.groupId === group.id && (
            <div className="group-modal">
              <div
                className="flex modal-group-items"
                onClick={this.toggelModalDelete}
              >
                <div>
                  <RiDeleteBinLine color="#323338c2" />{" "}
                </div>
                <span>Delete group</span>
              </div>
              <div
                className="flex modal-group-items"
                onClick={(ev) => {
                  ev.stopPropagation();
                  this.openModal("colorModal");
                }}
              >
                <div>
                  <IoIosColorFilter color="#323338c2" />{" "}
                </div>
                <span>Change color</span>
              </div>
            </div>
          )}
        {isModalToDelete && (
          < section className="modal-delete flex">

            <div className="title-modal-delete">
              {/* <div>
    <GrCircleAlert color="white" />
  </div> */}
              <span>Are you sure you want to delete?</span>
            </div>
            <div className="flex yes-no">
              <button onClick={this.toggleModalDelete} className="no-ans-delete">
                <HiOutlineX color="white" />
              </button>
              <button onClick={this.onDeleteGroup} className="yes-ans-delete">
                <AiOutlineCheck color="white" />
              </button>
            </div>
          </section>

        )}


        {isModalToDelete && <div className="main-screen"></div>}

        <div className="div-headline-container">



          <div className=" group-title-container first-column">

            <div className="drop-down-svg">
              <IoMdArrowDropdownCircle
                style={{
                  color: `${group.style.groupColor}`,
                  fontSize: "19px",
                  cursor: "pointer",
                }}
                onClick={(ev) => {
                  ev.stopPropagation();
                  this.openModal("groupEdit");
                }}
              />

            </div>
            <div className="icon-group-drag">
              <MdDragIndicator
                color="#c4c4c4"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />
            </div>
            <h1
              className="group-title first-column"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={this.onUpdateTitleContent}
              style={{ color: `${group.style.groupColor}` }}
            >
              {" "}
              {group.title}
            </h1>
          </div>
          {activeModal.cmpType === "ColorInput" &&
            activeModal.groupId === group.id && (
              <ColorInput
                onUpdateGroupColor={this.onUpdateGroupColor}
              />
            )}


          <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId={group.id} direction="horizontal">
                {(provided) => (
                  <div className="flex" {...provided.droppableProps}
                    ref={provided.innerRef}>

                    {cmpsOrder.map((cmp, idx) => {

                      return (

                        <Draggable key={cmp} draggableId={cmp} index={idx}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div className={this.cmpTitle(cmp)}>
                                <div className="cmp-title-container">
                                  <div className="drag-icon-cmp">
                                    <MdDragIndicator
                                      color="#6F7080"
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                      }}
                                    />
                                  </div>
                                  <div className={this.cmpTitle(cmp)}><span>{this.cmpTitle(cmp)}</span></div>
                                </div>
                              </div>

                            </div>
                          )}
                        </Draggable>

                        // </div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        <Droppable
          droppableId={group.id}
          key={idx}
          type="group"
        >
          {(provided) => (
            <section
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {group.tasks.map((task, idx) => {
                const isTaskShown = this.checkIfTaskFiltered(task)
                const isTaskSearch = this.checkIfTaskSearched(task)
                return (
                  isTaskSearch && isTaskShown && <Draggable key={task.id} draggableId={task.id} index={idx}>
                    {(provided) => (
                      <section
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TaskPreview task={task} groupId={group.id} goToTaskDetails={goToTaskDetails} />
                      </section>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
        {/* <div
          className="add-task-container first-column flex"
          onFocus={this.toggleAddTask}
          onBlur={this.toggleAddTask}
        > */}
        <div className="add-task-div justify-between first-column flex"
          onFocus={this.toggleAddTask}
          onBlur={this.toggleAddTask}

        >
          <div
            className="group-color"
            style={{
              backgroundColor: `${group.style.groupColor}`,
            }}
          ></div>{" "}
          <form
            onSubmit={this.onAddTask}
            className="flex justify-between align-center"
          >
            {/* <div className="add-task-left"> */}
            <div className="input-container">
              <input
                placeholder="Add task+"
                className="add-task"
                onChange={this.onHandleChange}
                value={this.state.taskValue}
              // onFocus={this.toggleAddTask}
              // onBlur={this.toggleAddTask}
              // contentEditable
              // suppressContentEditableWarning={true}
              />
            </div>
            {/* </div> */}
            {/* <div className="add-task-right flex"> */}
            <button className={btnClassName}>Add</button>
            {/* {isAddTaskActive && <button className="add-task-btn">Add</button>}
              {!isAddTaskActive && <div className="btn-placeholder"></div>} */}
            {/* </div> */}
          </form>
        </div>
        {/* </div> */}
        <div className="bar-container">
          {cmpsOrder.map((cmpType, idx) => {
            switch (cmpType) {
              case "status-picker":
                return <ProgressBarStatus key={idx} groupId={group.id} />;

              case "priority-picker":
                return (
                  <ProgressBarPriority key={idx} groupId={group.id} />
                );

              case "type-picker":
                return <ProgressBarType key={idx} groupId={group.id} />;
              case "role-picker":
                return <ProgressBarRole key={idx} groupId={group.id} />;
              case "member-picker":
                return <div key={idx} className="member-container"></div>;
              case "date-picker":
                return <div key={idx} className="date-container"></div>;
              case "text":
                return <div key={idx} className="text-container"></div>;
              case "cost":
                return <ProgressBarCost key={idx} groupId={group.id} />;
            }
          })}
        </div>
      </section>
    );
  }
}


function mapStateToProps({ boardModule, userModule }) {
  return {
    board: boardModule.board,
    user: userModule.user,
    activeModal: boardModule.activeModal,
    currFilterBy: boardModule.currFilterBy,
    search: boardModule.search,
  };
}
const mapDispatchToProps = {
  saveGroup,
  addTask,
  deleteGroup,
  setActiveModal,
  saveBoard
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
