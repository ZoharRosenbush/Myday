import React from "react";
import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
import { connect } from "react-redux";
import { saveGroup } from "../../store/board.action.js";

export class _GroupPreview extends React.Component {
  onUpdateTitleContent = ({ target }) => {
    const { group, board, saveGroup } = this.props;

    const value = target.textContent;
    if (!value) return;
    group.title = value;
    saveGroup(group, board._id);
  };

  render() {
    const { group } = this.props;
    console.log('group:',group );
    console.log('group.tasks:', group.tasks);
    
    
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
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);
