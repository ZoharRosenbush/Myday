import React from "react";
import { BoardList } from "../cmps/BoardList.jsx";

export function BoardNav() {

    const addBoard = ()=>{
        console.log('adding new board');
    }

  return (
    <section className="board-nav">
      <h1>Main Workspace</h1>
      <button onClick={()=>addBoard()}>Add+</button>
      <BoardList />
    </section>
  );
}
