import React from "react";
import { connect } from "react-redux";
import { IoIosArrowBack, IoMdHome } from 'react-icons/io'
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import { BoardList } from "../BoardCmps/BoardList.jsx";
import { loadBoards, addBoard, setBoardNav } from '../../store/board.action.js'
import { utilService } from "../../services/utils.service.js";
import { boardService } from "../../services/board.service.js";

export class _BoardNav extends React.Component {
  state = {
    isBoardNavOpen: true,
    // isDeleteModalClicked: false
  }
  componentDidMount() {
    this.props.loadBoards()
    this.setState({ isBoardNavOpen: true }, () => {
      this.props.setBoardNav(this.state.isBoardNavOpen)
    })
  }

  onToggleBoardNav = () => {
    const { isBoardNavOpen } = this.state
    this.setState({ isBoardNavOpen: !isBoardNavOpen }, () => {
      this.props.setBoardNav(this.state.isBoardNavOpen)
    })
  }
  onAddBoard = () => {
    let { user } = this.props

    if (!user) {
      user = {
        "fullname": "Guest",
        "acronyms": "G",
        "_id": utilService.makeId(),
        "username": "guest",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
        "userColor": "transparent"
      }
    }

    this.props.addBoard(user)
    //TODO: NEVIGATE THE PAGE TO THE NEW BOARD LINK
    // window.location.href = `/2day/board/${newBoard._id}`
  }

  render() {
    const { boards } = this.props
    const { isBoardNavOpen } = this.state
    const className = isBoardNavOpen ? "board-nav board-nav-open" : ' board-nav board-nav-closed'
    return (
      <React.Fragment>
        {
          <section className={className} >
            <button className="open-nav-btn" onClick={() => this.onToggleBoardNav()}>
              <IoIosArrowBack />
            </button>
            <p className="workspace">Workspace</p>
            <div className="main-workspace"><div className="m">M<div className="home"><IoMdHome /></div></div>Main Workspace</div>
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
            {boards && <BoardList boards={boards} />}</section>
        }
      </React.Fragment>
      // </div>
      // </section>
    )
  }
}
function mapStateToProps({ boardModule, userModule }) {
  return {
    boards: boardModule.boards,
    user: userModule.user,
  };
}
const mapDispatchToProps = {
  loadBoards,
  addBoard,
  setBoardNav
}
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);