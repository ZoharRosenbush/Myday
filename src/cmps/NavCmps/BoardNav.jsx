import React from "react";
import { connect } from "react-redux";
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards, addBoard, setBoardNav } from '../../store/board.action.js'
import { boardService } from "../../services/board.service.js";

export class _BoardNav extends React.Component {
  state = {
    isBoardNavOpen: true,
    // isDeleteModalClicked: false
  }
  componentDidMount() {
    this.props.loadBoards()
    // console.log('nav did mount')
    // const { isBoardNavOpen } = this.state
    this.setState({ isBoardNavOpen: true }, () => {
      this.props.setBoardNav(this.state.isBoardNavOpen)
    })

    // socketService.setup()
    // socketService.on('board-list was updated', this.props.loadBoards)
  
  }

  
  // componentDidUpdate(prevProps, prevState) {

  //   // if (prevProps.boards !== this.props.boards) {
  //   //   this.props.loadBoards()
  //   // }

  //   const prevBoards = prevProps.boards

  //   if (prevBoards.length) {
  //     const { boards } = this.props
  //     // console.log('the boards',boards)
  //     // console.log('prevboards',prevBoards)
  //     boards.forEach((board, idx) => {
  //       if (!prevBoards[idx]) return
  //       else if (board.title !== prevBoards[idx].title) {
  //         console.log('hello!');
  //         // this.props.loadBoards()
  //       }
  //     })
  //   }
  // }

  onToggleBoardNav = () => {
    const { isBoardNavOpen } = this.state
    this.setState({ isBoardNavOpen: !isBoardNavOpen }, () => {
      this.props.setBoardNav(this.state.isBoardNavOpen)
    })
  }
  onAddBoard = () => {
    this.props.addBoard()
    //TODO: NEVIGATE THE PAGE TO THE NEW BOARD LINK
    // window.location.href = `/myday/board/${newBoard._id}`
  }
  onRemoveBoard = (boardId) => {
    this.props.removeBoard(boardId)
  }
  render() {
    // console.log('rendering nav')
    const { boards } = this.props
    const { isBoardNavOpen } = this.state
    const className = isBoardNavOpen ? "board-nav board-nav-open" : ' board-nav board-nav-closed'
    return (
      // <section>
      //   {!isBoardNavOpen && <section className="board-nav">
      //     <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
      //       <IoIosArrowForward color="#67686B" />
      //     </button>
      //   </section>}
      // isBoardNavOpen &&
      // <div>
      <React.Fragment>
        {
          <section className={className} >
            <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
              <IoIosArrowForward color="#67686B" />
            </button>
            <p className="workspace">Workspace</p>
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
            {boards && <BoardList boards={boards} onRemoveBoard={this.onRemoveBoard} />}</section>
        }
      </React.Fragment>
      // </div>
      // </section>
    )
  }
}
function mapStateToProps({ boardModule }) {
  return {
    boards: boardModule.boards,
  };
}
const mapDispatchToProps = {
  loadBoards,
  addBoard,
  setBoardNav
}
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);