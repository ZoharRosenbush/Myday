export function BoardControllers({onAddGroup}) {

  return (
    <section className="board-controllers flex">
      <button className="add-group-btn" onClick={onAddGroup}>New Group</button>
      <button className="controller-opt">Filter</button>
      <button className="controller-opt">Sort</button>
      <button className="controller-opt">Search</button>
      <button className="controller-opt">Persons</button>
    </section>
  );
}
