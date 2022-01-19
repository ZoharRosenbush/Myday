import { Link } from "react-router-dom";
export function BoardList({ boards }) {
  return (
      <section>

    <h1>Board List</h1>
    {/* ////////should i render boardPreview for this list? */}
    {/* // boards.map(board=>{ */}
        {/* //   return <ul> <li><Link to=`/myday/board/:&{board._id}`>{board.name}</Link></li> </ul> */}
        {/* // }) */}
        <Link to='/myday/board/:${board._id}'>board</Link>
        </section>
    
  );
}
