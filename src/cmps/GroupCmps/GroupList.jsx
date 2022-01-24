import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

import { GroupPreview } from "./GroupPreview.jsx";
import { updateBoard } from "../../store/board.action.js";

export class _GroupList extends React.Component {



  // TASK DRAG
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { group, board, updateBoard } = this.props;

    // const groupToMove = board.groups.find(group => group.id === draggableId)
    // if (groupToMove !== -1) {

    //   board.groups.splice(source.index, 1);
    //   board.groups.splice(destination.index, 0, groupToMove);
    //   updateBoard(board);

    // }
    // else {

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const groupSourceIdx = board.groups.findIndex(
        (group) => group.id === source.droppableId
      );
      const task = board.groups[groupSourceIdx].tasks.find(
        (task) => task.id === draggableId
      );
      const groupDestinationIdx = board.groups.findIndex(
        (group) => group.id === destination.droppableId
      );
      board.groups[groupSourceIdx].tasks.splice(source.index, 1);
      board.groups[groupDestinationIdx].tasks.splice(destination.index, 0, task);
      updateBoard(board);
    // }

  };

  render() {
    const { board } = this.props;
    const { groups } = board;

    return (

      <DragDropContext onDragEnd={this.onDragEnd}>
        <section className="group-list">
          {groups && groups.map((group, idx) => {

            return (
              <Droppable droppableId={group.id} key={idx}>
                {(provided) => (
                  <section ref={provided.innerRef}>
                    {provided.placeholder}
                    <GroupPreview group={group} key={idx} idx={idx} board={board} />
                   </section>
                )}
              </Droppable> 
            );
          })}

        </section>
      </DragDropContext>

    );
  }
}
function mapStateToProps({ boardModule }) {
  return {
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
