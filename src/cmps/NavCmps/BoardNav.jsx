import React from "react";
import { connect } from "react-redux";

import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards, addBoard } from '../../store/board.action.js'
import { boardService } from "../../services/board.service.js";
// import { addToy } from '../store/toy.action.js'

export class _BoardNav extends React.Component {

  componentDidMount() {
    this.props.loadBoards()
    console.log('BoardApp loaded');
  }


  addBoard = () => {
    const newBoard = boardService.getNewBoard()
    this.props.addBoard(newBoard)
    //TODO: NEVIGATE THE PAGE TO THE NEW BOARD LINK
    // window.location.href = `/myday/board/${newBoard._id}`
  }
  render() {
    const { boards } = this.props
    return (
      <section className="board-nav" >
        <h1>Main Workspace</h1>
        <i className="fas arrow arrow-left"></i>
        <button onClick={() => this.addBoard()} className="side-bar-fetures">Add +</button>
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
  loadBoards,
  addBoard
}
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);