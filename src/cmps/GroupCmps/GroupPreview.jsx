import { TaskPreview } from "../TaskCmps/TaskPreview.jsx";
export function GroupPreview({ group }) {
  console.log("group in GroupPreview :", group);
  const { tasks } = group;
  console.log("tasks in GroupPreview :", tasks);
  return (
    <section>
      <h1>group details</h1>
      {tasks.map((task, idx) => {
        return <TaskPreview key={idx} task={task} groupId={group.id} />;
      })}
    </section>
  );
}
