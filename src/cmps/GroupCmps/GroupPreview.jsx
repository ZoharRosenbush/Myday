import React from "react";
import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { connect } from "react-redux";
import { addTask, saveGroup, deleteGroup } from "../../store/board.action.js";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosColorFilter } from "react-icons/io";
import { GrCircleAlert } from "react-icons/gr";

export class _GroupPreview extends React.Component {
  state = {
    taskValue: "",
    isGroupModalOpen: false,
    isModalToDelete: false,
    isAddTaskActive: false
  };

  toggleAddTask = () => {
    this.setState((prevState) => ({ ...prevState, isAddTaskActive: !prevState.isAddTaskActive }), console.log('changing active', this.state));
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

  deleteGroup = () => {
    const { deleteGroup, group, board } = this.props;
    deleteGroup(group.id, board._id);
  };

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskValue: value });
  };

  onAddTask = (ev) => {
    console.log('adding task')
    ev.preventDefault();
    const { group, board, addTask } = this.props;
    addTask(this.state.taskValue, group.id, board._id);
    this.setState({ taskValue: "Add Task +" });
  };

  cmpTitle = (cmpType) => {
    if (cmpType === "member-picker") return "Owners";
    else if (cmpType === "priority-picker") return "Priority";
    else if (cmpType === "date-picker") return "Timeline";
    else return "Status";
  };

  render() {
    const { group, board } = this.props;
    const cmpsOrder = board.cmpsOrder;
    const { isGroupModalOpen, isModalToDelete, isAddTaskActive } = this.state;
    return (
      <section className="group-preview">
        {isGroupModalOpen && (
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
            <div className="flex modal-group-items">
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

        <div className="div-headline-container">
          <div className="group-title-container first-column">
            <IoMdArrowDropdownCircle
              style={{
                color: `${group.style.groupColor}`,
                fontSize: "1.1em",
                cursor: "pointer",
                transform: "translateY(4.8px)",
              }}
              onClick={this.toggleGroupModal}
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
          </div>
          {cmpsOrder.map((cmp, idx) => {
            return (
              <div className={this.cmpTitle(cmp)} key={idx}>
                {this.cmpTitle(cmp)}
              </div>
            );
          })}
        </div>


        {
          group.tasks.map((task, idx) => {
            return <TaskPreview key={idx} task={task} groupId={group.id} />;
          })
        }
        <div className="add-task-container first-column flex">

          <div className="add-task-div justify-between first-column flex">
            <div
              className="group-color"
              style={{ backgroundColor: `${group.style.groupColor}` }}
            ></div>
            {" "}
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
      </section >
    );
  }
}
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}
const mapDispatchToProps = {
  saveGroup,
  addTask,
  deleteGroup,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
