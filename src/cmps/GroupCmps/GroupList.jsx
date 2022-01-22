import { GroupPreview } from "./GroupPreview.jsx";
import { DragDropContext } from "react-beautiful-dnd";

export function GroupList({ board }) {
  const { groups } = board;

  function onDragEnd(result) {
    // TODO: render our tasks
  }

  return (
    // <DragDropContext onDragEnd={onDragEnd}>
      <section className="group-list">
        {
          // <Droppable droppableId={task.id}>
          //   {(provided) =>
              // groups &&
              groups.map((group, idx) => {
                return <GroupPreview 
                // {...provided.droppableProps} 
                key={idx} group={group} board={board} />;
              }
              )
          //   }
          // </Droppable>
        }
      </section>
    // </DragDropContext>
  );
}
