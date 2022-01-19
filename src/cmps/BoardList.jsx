import { Link } from "react-router-dom";

import { boards } from "../helpers/monday.js";

export function BoardList() {
  return (
    <section>
      {boards.map((board, idx) => {
          console.log('board._id:', board._id);
          
        return (
          <ul key={idx}>
            <li key={board._id}>
              <Link to={`/myday/board/:${board._id}`}>{board.title}</Link>
            </li>
          </ul>
        );
      })}
    </section>
  );
}
