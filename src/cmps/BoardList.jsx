import { Link } from "react-router-dom";

import { boards } from "../helpers/monday.js";

export function BoardList({ boards }) {
  return (
    <section>
      <h1>Board List</h1>
      {boards.map((board) => {
          console.log('board._id:', board._id);
          
        return (
          <ul>
            <li>
              <Link to={`/myday/board/:${board._id}`}>{board.title}</Link>
            </li>
          </ul>
        );
      })}
    </section>
  );
}
