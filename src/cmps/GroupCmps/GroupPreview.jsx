import React from "react";
import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { connect } from "react-redux";
import { addTask, saveGroup } from "../../store/board.action.js";

export class _GroupPreview extends React.Component {
  state = {
    taskValue: "",
  };

  onUpdateTitleContent = ({ target }) => {
    const { group, board, saveGroup } = this.props;
    const value = target.textContent;
    if (!value) return;
    group.title = value;
    saveGroup(group, board._id);
  };

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskValue: value });
  };

  onAddTask = (ev) => {
    ev.preventDefault();
    const { group, board, addTask } = this.props;
    addTask(this.state.taskValue, group.id, board._id);
    this.setState({ taskValue: "Add Task +"});
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

    return (
      <section className="group-preview">
        <div className= "div-headline-container">
        <h1
          className="group-title first-column"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={this.onUpdateTitleContent}
          >
          {group.title}
        </h1>
        {cmpsOrder.map((cmp, idx) => {
          return <div key={idx}>{this.cmpTitle(cmp)}</div>;
        })}
        </div>
        {group.tasks.map((task, idx) => {
          return <TaskPreview key={idx} task={task} groupId={group.id} />;
        })}
        <div className="add-task-container">
          <div
            className="group-color first-column"
            style={{ backgroundColor: `${group.style.groupColor}` }}
          ></div>
          <div className="add-task-div">
            {" "}
            <form onSubmit={this.onAddTask} className="first-column">
              <input
                className="task-title first-column"
                placeholder="Add task +"
                onChange={this.onHandleChange}
                value={this.state.taskValue}
                // contentEditable
                // suppressContentEditableWarning={true}
              ></input>
              <button className="add-task-btn">Add</button>
            </form>
          </div>
        </div>
      </section>
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
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
