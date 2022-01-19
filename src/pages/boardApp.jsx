import React from "react";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";

export function boardApp() {
  return (
    <section>
      <BoardHeader />
      <BoardNav />
    </section>
  );
}
