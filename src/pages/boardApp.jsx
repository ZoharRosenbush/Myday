import React from "react";
import { connect } from "react-redux";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";

class _BoardApp extends React.Component{




  render(){
    return (
      <section>
      <BoardHeader />
      <BoardNav />
    </section>
  );
}
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    //   currFilterBy: toyModule.currFilterBy
  };
}
const mapDispatchToProps = {
  loadBoard
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);


