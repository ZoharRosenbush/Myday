import React from "react";
import { connect } from "react-redux";

import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards } from '../../store/board.action.js'


export class _BoardNav extends React.Component {

  componentDidMount() {
    this.props.loadBoards()
    console.log('BoardApp loaded');
  }

  addBoard = () => {
    console.log('adding new board');
  }
  render() {
    const {boards}=this.props
    return (
      <section className="board-nav" >
        <h1>Main Workspace</h1>
        <i className="fas arrow arrow-left"></i>
        <button onClick={() => this.addBoard()}>Add +</button>
        <BoardList boards={boards} />
      </section>
    )

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
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);