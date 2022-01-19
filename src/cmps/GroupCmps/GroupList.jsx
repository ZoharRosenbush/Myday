import { GroupPreview } from "./GroupPreview.jsx";
export function GroupList({ board }) {
  const { groups } = board;

  return (
    <section>
      <h1>Group List</h1>
      {groups.map((group, idx) => {
       return <GroupPreview key={idx} group={group} />;
      })}
    </section>
  );
}
