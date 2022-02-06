import React from "react";
// import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

import { GroupPreview } from "./GroupPreview.jsx";


export function GroupList({ board, goToTaskDetails }) {

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
                <GroupPreview group={group} key={idx} idx={idx} board={board} goToTaskDetails={goToTaskDetails} />
                {placeholder}
              </div>
            )}
          </Draggable>

        );
      })}
    </section>
  )

}


// function mapStateToProps({ boardModule }) {
//   return {
//     // No Need for the board here
//     // board: boardModule.board,
//   };
// }
// const mapDispatchToProps = {

// };

// export const GroupList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_GroupList);
