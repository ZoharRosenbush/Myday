import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

import { GroupPreview } from "./GroupPreview.jsx";
import { updateBoard } from "../../store/board.action.js";

export class _GroupList extends React.Component {



  // TASK DRAG


  render() {
    const { board } = this.props;
    const { groups } = board;
    return (

      <section className="group-list"  >
        {groups && groups.map((group, idx) => {
          return (
            <Draggable draggableId={group.id} index={idx} key={group.id}>
              {({ draggableProps, dragHandleProps, placeholder, innerRef }) => (

                <div
                  className="group-draggable-wrapper"
                  {...draggableProps}
                  {...dragHandleProps}
                  ref={innerRef}
                >
                  <GroupPreview group={group} key={idx} idx={idx} board={board} />
                  {placeholder}
                </div>
              )}
            </Draggable>

          );
        })}
      </section>
    )
  }
}
function mapStateToProps({ boardModule }) {
  return {
    // No Need for the board here
    board: boardModule.board,
  };
}
const mapDispatchToProps = {
  updateBoard,
};

export const GroupList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupList);
