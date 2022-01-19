import { GroupPreview } from "./GroupPreview.jsx";
export function GroupList({ board }) {
  console.log("board in GroupList:", board);
  const { groups } = board;
  console.log("groups in GroupList :", groups);

  return (
    <section>
      <h1>Group List</h1>
      {groups.map((group, idx) => {
       return <GroupPreview key={idx} group={group} />;
      })}
    </section>
  );
}
