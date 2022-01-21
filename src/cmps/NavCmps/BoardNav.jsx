import React from "react";
import { connect } from "react-redux";

import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards, addBoard, removeBoard } from '../../store/board.action.js'
import { boardService } from "../../services/board.service.js";
import { IoIosArrowForward } from 'react-icons/io'
// import { addToy } from '../store/toy.action.js'

export class _BoardNav extends React.Component {
  state = {
    isBoardNavOpen: false
  }
  componentDidMount() {
    this.props.loadBoards()
  }

  onToggleBoardNav() {
    const { isBoardNavOpen } = this.state
    console.log('opening');
    console.log(isBoardNavOpen);
    this.setState({ isBoardNavOpen: !isBoardNavOpen })
  }

  onAddBoard = () => {
    const newBoard = boardService.getNewBoard()
    this.props.addBoard(newBoard)
    //TODO: NEVIGATE THE PAGE TO THE NEW BOARD LINK
    // window.location.href = `/myday/board/${newBoard._id}`
  }

  onRemoveBoard = (boardId) => {
    console.log('removing', boardId);
    this.props.removeBoard(boardId)
  }

  render() {
    const { boards } = this.props
    const { isBoardNavOpen } = this.state
    console.log(isBoardNavOpen);
    return (
      <section>
        {!isBoardNavOpen && <section className="board-nav">
          <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
            <IoIosArrowForward color="#67686b" />

          </button>
        </section>}
        {isBoardNavOpen &&
          <section className="board-nav board-nav-open" >
            <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
              <IoIosArrowForward color="#67686b" />
            </button>
            <h2>Workspace</h2>
            <h2 className="main-workspace">Main Workspace</h2>
            <button>Add</button>
            <button>Filters</button>
            <button>Search</button>
            <button onClick={() => this.onAddBoard()} className="side-bar-fetures">Add +</button>
            <BoardList boards={boards} onRemoveBoard={this.onRemoveBoard} />
          </section>}
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