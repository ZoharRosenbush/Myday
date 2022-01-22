import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

import { GroupPreview } from "./GroupPreview.jsx";
import { updateBoard } from "../../store/board.action.js";

export class _GroupList extends React.Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { group, board, updateBoard } = this.props;

    console.log("destination:", destination);
    console.log("source:", source);

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
  };

  render() {
    const { board } = this.props;
    const { groups } = board;
    return (
      // <DragDropContext onDragEnd={onDragEnd}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <section className="group-list">
          {
            // <Droppable droppableId={task.id}>
            //   {(provided) =>
            // groups &&
            groups.map((group, idx) => {
              return (
                <Droppable droppableId={group.id} key={idx}>
                  {(provided) => (
                    <section ref={provided.innerRef}>
                      <GroupPreview
                        // {...provided.droppableProps}

                        group={group}
                        board={board}
                      />
                    </section>
                  )}
                </Droppable>
              );
            })
            //   }
          }
        </section>
      </DragDropContext>
    );
  }
}
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    // activeModal: boardModule.activeModal,
  };
}
const mapDispatchToProps = {
  updateBoard,
  // addTask,
  // deleteGroup,
  // setActiveModal,
};

export const GroupList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupList);
