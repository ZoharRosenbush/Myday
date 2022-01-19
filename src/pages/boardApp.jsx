import React from "react";
import { connect } from "react-redux";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";

import {loadBoards} from '../store/board.action.js'


class _BoardApp extends React.Component{

  componentDidMount(){
    this.props.loadBoards()
    console.log('BoardApp loaded');
  }


  render(){
    const {boards} = this.props
    console.log('the boards in app',boards)
    return (
      <section>
      <BoardHeader />
      <BoardNav boards={boards} />
    </section>
  );
}
}

function mapStateToProps({ boardModule }) {
  return {
    boards: boardModule.boards,
    //   currFilterBy: toyModule.currFilterBy
  };
}
const mapDispatchToProps = {
  loadBoards
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);


