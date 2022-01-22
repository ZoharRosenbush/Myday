import React from "react";
import { connect } from "react-redux";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosColorFilter } from "react-icons/io";
import { GrCircleAlert } from "react-icons/gr";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { GrDrag } from "react-icons/gr";
import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { ColorInput } from "./ColorInput.jsx";
import {
  addTask,
  saveGroup,
  deleteGroup,
  setActiveModal,
} from "../../store/board.action.js";
import { Droppable } from "react-beautiful-dnd";
import { logDOM } from "@testing-library/react";

export class _GroupPreview extends React.Component {
  state = {
    taskValue: "",
    isModalToDelete: false,
    isAddTaskActive: false,
  };

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
      console.log("changing active", this.state)
    );
  };

  toggleGroupModal = () => {
    this.setState({ isGroupModalOpen: !this.state.isGroupModalOpen });
  };

  toggelModalDelete = () => {
    this.setState({ isGroupModalOpen: false });
    this.setState({ isModalToDelete: !this.state.isModalToDelete });
  };

  onUpdateTitleContent = ({ target }) => {
    const { group, board, saveGroup } = this.props;
    const value = target.textContent;
    if (!value) return;
    group.title = value;
    saveGroup(group, board._id);
  };

  onUpdateGroupColor = (color) => {
    const { group, board, saveGroup } = this.props;
    // const value = target.textContent;
    // if (!value) return;
    group.style.groupColor = color;
    saveGroup(group, board._id);
  };

  deleteGroup = () => {
    this.setState({ isModalToDelete: false });
    const { deleteGroup, group, board } = this.props;
    deleteGroup(group.id, board._id);
  };

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskValue: value });
  };

  onAddTask = (ev) => {
    console.log("adding task");
    ev.preventDefault();
    const { group, board, addTask } = this.props;
    addTask(this.state.taskValue, group.id, board._id);
    this.setState({ taskValue: "" });
  };

  cmpTitle = (cmpType) => {
    if (cmpType === "member-picker") return "Owners";
    else if (cmpType === "priority-picker") return "Priority";
    else if (cmpType === "date-picker") return "Timeline";
    else return "Status";
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { group, board, saveGroup } = this.props;
    console.log('destination:', destination);
    console.log('source:', source);
    
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const task = group.tasks.find((task) => task.id === draggableId);

    group.tasks.splice(source.index, 1);
    group.tasks.splice(destination.index, 0, task);
    saveGroup(group, board._id);
  };

  render() {
    const { group, board, activeModal } = this.props;
    const cmpsOrder = board.cmpsOrder;
    const { isGroupModalOpen, isModalToDelete, isAddTaskActive } = this.state;
    return (
      <Droppable droppableId={group.id} >
      {(provided) => (
        <section ref={provided.innerRef}>
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
          <section className="modal-delete">
            <div className="flex title-modal-delete">
              <div>
                <GrCircleAlert />
              </div>
              <span>Are you sure you want to delete?</span>
            </div>
            <button onClick={this.toggelModalDelete} className="no-ans-delete">
              No
            </button>
            <button onClick={this.deleteGroup} className="yes-ans-delete">
              Yes
            </button>
          </section>
        )}
        {isModalToDelete && <div className="main-screen"></div>}
        <div className="div-headline-container">
          <div className="group-title-container first-column">
            <IoMdArrowDropdownCircle
              style={{
                color: `${group.style.groupColor}`,
                fontSize: "19px",
                cursor: "pointer",
                transform: "translateY(4.5px)",
              }}
              onClick={(ev) => {
                ev.stopPropagation();
                this.openModal("groupEdit");
              }}
            />
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
            {activeModal.cmpType === "ColorInput" &&
              activeModal.groupId === group.id && (
                <ColorInput onUpdateGroupColor={this.onUpdateGroupColor} />
              )}
          </div>
          {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
            {/* <Droppable droppableId="ctg"> */}
              {/* {(provided) => ( */}
                {/* <section ref={provided.innerRef}> */}
                  {cmpsOrder.map((cmp, idx) => {
                    return (
                      // <Draggable key={idx} draggableId={cmp} index={idx}>
                        // {(provided) => (
                          <div key={idx}
                            // {...provided.draggableProps}
                            // {...provided.dragHandleProps}
                            // ref={provided.innerRef}
                            className={this.cmpTitle(cmp)}
                          >
                            {this.cmpTitle(cmp)}
                          </div>
                        // )}
                      // </Draggable>
                    );
                  })}
                {/* </section> */}
              {/* )} */}
            {/* </Droppable> */}
          {/* </DragDropContext> */}
        </div>
        {/* <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="tasks"> */}
            {/* {(provided) => (
              <section ref={provided.innerRef}> */}
                {group.tasks.map((task, idx) => {
                  return (
                    <Draggable key={idx} draggableId={task.id} index={idx}>
                      {(provided) => (
                        <section
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TaskPreview task={task} groupId={group.id} />
                          {/* {provided.placeholder} */}
                        </section>
                      )}
                    </Draggable>
                  );
                })}
              {/* </section> */}
            {/* )} */}
          {/* </Droppable>
        </DragDropContext> */}

        <div className="add-task-container first-column flex">
          <div className="add-task-div justify-between first-column flex">
            <div
              className="group-color"
              style={{ backgroundColor: `${group.style.groupColor}` }}
            ></div>{" "}
            <form
              onSubmit={this.onAddTask}
              className="flex justify-between align-center"
            >
              <input
                placeholder="Add task +"
                className="add-task"
                onChange={this.onHandleChange}
                value={this.state.taskValue}
                onFocus={this.toggleAddTask}
                onBlur={this.toggleAddTask}
                // contentEditable
                // suppressContentEditableWarning={true}
              />
              <button className="add-task-btn">Add</button>
              {/* {isAddTaskActive && <button className="add-task-btn">Add</button>}
              {!isAddTaskActive && <div className="btn-placeholder"></div>} */}
            </form>
          </div>
        </div>
      </section>
      </section>
                  )}
              </Droppable>
    )
    
  }
  
}
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    activeModal: boardModule.activeModal,
  };
}
const mapDispatchToProps = {
  saveGroup,
  addTask,
  deleteGroup,
  setActiveModal,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
