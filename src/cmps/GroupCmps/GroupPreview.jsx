import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
export function GroupPreview({ group }) {
  const { tasks } = group;
  return (
    <section>
      <h1>group details</h1>
      {tasks.map((task, idx) => {
        return <TaskPreview key={idx} task={task} groupId={group.id} />;
      })}
    </section>
  );
}
