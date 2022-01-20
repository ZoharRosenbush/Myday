import React from "react";
import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { connect } from "react-redux";
import { addTask, saveGroup } from "../../store/board.action.js";

export class _GroupPreview extends React.Component {
  state = {
    taskValue: "Add Task +",
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
    this.setState({taskValue: value})
  };

  onAddTask = (ev) => {
    ev.preventDefault()
    const { group, board, addTask } = this.props;
    addTask(this.state.taskValue, group.id, board._id);
  };

  render() {
    const { group } = this.props;
    return (
      <section className="group-preview">
        <h1
          className="group-title"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={this.onUpdateTitleContent}
        >
          {group.title}
        </h1>
        {group.tasks.map((task, idx) => {
          return <TaskPreview key={idx} task={task} groupId={group.id} />;
        })}
        <div className="add-task-container">
          <div
            className="group-color"
            style={{ backgroundColor: `${group.style.groupColor}` }}
          ></div>
          <div className="add-task-div">
            {" "}
            <form onSubmit={this.onAddTask}>
            <input
              className="task-title"
              placeholder="Add task +"
              onChange={this.onHandleChange}
              // contentEditable
              // suppressContentEditableWarning={true}
              >
            </input>
            <button>Add</button>
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
