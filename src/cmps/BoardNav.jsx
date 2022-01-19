import React from "react";
import { BoardList } from "../cmps/BoardList.jsx";

export function BoardNav() {
  ///heloo

    const addBoard = ()=>{
        console.log('adding new board');
    }

  return (
    <section className="board-nav">
      <h1>Main Workspace</h1>
      <i className="fas arrow arrow-left"></i>
      <button onClick={()=>addBoard()}>Add +</button>
      <BoardList />
    </section>
  );
}
