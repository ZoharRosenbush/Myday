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




    //if group is dragged
    // const groupToMove = board.groups.find(group => group.id === draggableId)
    // if (groupToMove) {
    //   if (!destination) return;
    //   console.log('group:', groupToMove);

    //   board.groups.splice(source.index, 1);
    //   board.groups.splice(destination.index, 0, groupToMove);
    //   updateBoard(board);

    // }
    //if task is dragged
    // else {

      if (!destination) return;
      // if (
      //   destination.droppableId === source.droppableId &&
      //   destination.index === source.index
      // ) {
      //   return;
      // }

      console.log('destination:', destination);
console.log('source:', source);
console.log('draggableId:', draggableId);

      const groupSourceIdx = board.groups.findIndex(
        (group) => group.id === source.droppableId
      );
      console.log('groupSourceIdx:',groupSourceIdx );
      
      const task = board.groups[groupSourceIdx].tasks.find(
        (task) => task.id === draggableId
      );
      const groupDestinationIdx = board.groups.findIndex(
        (group) => group.id === destination.droppableId
      );

      console.log('groupDestinationIdx:', groupDestinationIdx);

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
       {/* <Droppable droppableId="droppable">
        {(provided) => (
          <div
             {...provided.droppableProps}
           ref={provided.innerRef}

            > */}
              <section className="group-list"  
              // {...provided.droppableProps}
              //   ref={provided.innerRef}
              >
                {groups && groups.map((group, idx) => {
                  console.log('group: ', group)
                  return (

                    // <Draggable key={group.id} draggableId={group.id} index={idx}>
                    //   {(provided) => (
                    //     <div
                    //       ref={provided.innerRef}
                    //       {...provided.draggableProps}
                    //       {...provided.dragHandleProps}

                    //     >
                          <Droppable droppableId={group.id} key={idx}>
                            {(provided) => (
                              <section ref={provided.innerRef} {...provided.droppableProps}>
                                <GroupPreview group={group} key={idx} idx={idx} board={board} />
                                {provided.placeholder}

                              </section>
                            )}
                          </Droppable>
                    //       {provided.placeholder}
                    //     </div>
                    //   )}
                    // </Draggable>
                  );
                })}

              </section>
              {/* {provided.placeholder}


            </div>
          )}
        </Droppable> */}
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
