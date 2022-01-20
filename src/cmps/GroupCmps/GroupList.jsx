import { useState } from "react";
import { GroupPreview } from "./GroupPreview.jsx";
export function GroupList({ board }) {
  const { groups } = board;
  console.log('groups:', groups);
  console.log('board:', board);
  

  return (
    <section className="group-list">
      {
      // groups &&
       groups.map((group, idx) => {
       return <GroupPreview key={idx} group={group} />;
      })}
    </section>
  );
}
