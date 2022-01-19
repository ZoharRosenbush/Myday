import React from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/BoardNav.jsx";

export function MainApp() {
  return (
    <section>
      <BoardHeader />
      <BoardNav />
    </section>
  );
}
