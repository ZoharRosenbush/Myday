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
    // console.log('the groups in grouplist',groups)
    
    return (
    
        <DragDropContext onDragEnd={this.onDragEnd}> 
        <section className="group-list">
          {groups.map((group, idx) => {
            
  
            return (
             
              <Draggable key={group.id} draggableId={group.id} index={idx}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  // style={getItemStyle(
                  //   snapshot.isDragging,
                  //   provided.draggableProps.style
                  // )}
                >




              <Droppable droppableId={group.id} key={idx}> 
                {(provided) => (
                  <section ref={provided.innerRef}>
                    {provided.placeholder}
                    <GroupPreview group={group} key={idx} board={board} />
                 </section>
               )}
              </Droppable>

              </div>
                  )}
                </Draggable>

        
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
