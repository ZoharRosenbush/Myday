import { Link } from "react-router-dom";

export function BoardList({ boards }) {

  return (
    <section className="sidebar-nav-list">
      {boards.map((board, idx) => {

        return (
          <div className="flex" key={idx}>
            {/* <ul key={idx}> */}
            {/* <li key={board._id}> */}
            <Link className="clean-link" to={`/myday/board/${board._id}`}>{board.title}</Link>
            {/* </li> */}
            {/* </ul> */}
          </div>
        );
      })}
    </section>
  );
}
