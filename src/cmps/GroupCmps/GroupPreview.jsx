import React from "react";
import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { connect } from "react-redux";
import { saveGroup } from "../../store/board.action.js";

export class GroupPreview extends React.Component {
  onUpdateTitleContent = ({ target }) => {
    console.log(" onUpdateTitleContent");
    console.log("this.props:", this.props);

    const { task, board, groupId, saveTask } = this.props;
    const value = target.textContent;
    console.log("value:", value);

    if (!value) return;
    task.title = value;
    // saveGroup(task, groupId, board._id);
    // updateTitleContent(value, todo);
  };

  render() {
    const { group } = this.props;
    const { tasks } = group;
    return (
      <section className="group-preview">
        <h1
          className="group-title"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={this.onUpdateTitleContent}
        >
          New Group
        </h1>
        {tasks.map((task, idx) => {
          return <TaskPreview key={idx} task={task} groupId={group.id} />;
        })}
      </section>
    );
  }
}
