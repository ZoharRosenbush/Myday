import React from "react";
import { connect } from "react-redux";
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'

import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards, addBoard, removeBoard, setBoardNav } from '../../store/board.action.js'
import { boardService } from "../../services/board.service.js";


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
    this.setState({ isBoardNavOpen: !isBoardNavOpen }, () => {
      this.props.setBoardNav(isBoardNavOpen)

    })
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
    const className = isBoardNavOpen ? "board-nav board-nav-open" : ' board-nav board-nav-open closed'
    console.log(isBoardNavOpen);
    return (
      // <section>
      //   {!isBoardNavOpen && <section className="board-nav">
      //     <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
      //       <IoIosArrowForward color="#67686b" />

      //     </button>
      //   </section>}
      // isBoardNavOpen &&
      <section className={className} >
        <div>
          <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
            <IoIosArrowForward color="#67686b" />
          </button>
          {
            isBoardNavOpen && <React.Fragment> <p className="workspace">Workspace</p>
              <p className="main-workspace">Main Workspace</p>
              <div className="side-bar-features-container">

                <button className="side-bar-features" onClick={() => this.onAddBoard()}>
                  <AiOutlinePlus size='19px' style={{ marginRight: "5px", marginTop: "5px" }} />
                  Add</button>

                <button className="side-bar-features">
                  <BiFilterAlt size='19px' style={{ marginRight: "5px", marginTop: "5px" }} />
                  Filters</button>

                <button className="side-bar-features">
                  <AiOutlineSearch size='19px' style={{ marginRight: "5px", marginTop: "5px" }} />
                  Search</button>

              </div>
              <BoardList boards={boards} onRemoveBoard={this.onRemoveBoard} /></React.Fragment>
          }

        </div>

      </section>
      // </section>

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
  removeBoard,
  setBoardNav
}
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);


