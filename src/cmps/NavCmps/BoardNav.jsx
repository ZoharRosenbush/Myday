import React from "react";
import { connect } from "react-redux";

import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards, addBoard, removeBoard } from '../../store/board.action.js'
import { boardService } from "../../services/board.service.js";
// import { addToy } from '../store/toy.action.js'

export class _BoardNav extends React.Component {

  componentDidMount() {
    this.props.loadBoards()
  }


  onAddBoard = () => {
    const newBoard = boardService.getNewBoard()
    this.props.addBoard(newBoard)
    //TODO: NEVIGATE THE PAGE TO THE NEW BOARD LINK
    window.location.href = `/myday/board/${newBoard._id}`
  }

  onRemoveBoard = (boardId) => {
    console.log('removing', boardId);
    this.props.removeBoard(boardId)
  }

  render() {
    const { boards } = this.props
    return (
      <section className="board-nav" >
        <h1>Main Workspace</h1>
        <i className="fas arrow arrow-left"></i>
        <button onClick={() => this.onAddBoard()} className="side-bar-fetures">Add +</button>
        <BoardList boards={boards} onRemoveBoard={this.onRemoveBoard} />
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
  addBoard,
  removeBoard
}
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);