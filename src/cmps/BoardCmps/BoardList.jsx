import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BsThreeDots } from 'react-icons/bs'
import { RiDeleteBinLine } from "react-icons/ri";
import { GrCircleAlert } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { removeBoard, setActiveModal } from '../../store/board.action.js'
class _BoardList extends React.Component {
  state = {
    isModalToDelete: false,
    boardInEdit: null
  };
  openModal = (boardId) => {
    this.setState((prevstate) => ({ ...prevstate, boardInEdit: boardId }))
    const activeModal = { cmpType: 'boardEdit', boardId: boardId }
    this.props.setActiveModal(activeModal)
  };
  toggleModalDelete = () => {
    this.setState((prevstate) => ({ ...prevstate, isModalToDelete: !prevstate.isModalToDelete }))
  };
  onRemoveBoard = () => {
    const { boardInEdit } = this.state
    this.props.removeBoard(boardInEdit)
    this.toggleModalDelete()
  }
  setClassName = (boardId) => {
    const { board } = this.props
    if (!board) return
    const className = (board._id === boardId) ? 'active' : ''
    return className
  }
  goToUrl = () => {
    const { boards } = this.props
    if (boards.length > 1) return `/2day/board/${boards[0]._id}`
    if (boards.length === 1) return '/2day/board'
  }
  render() {
    const { boards, board, activeModal } = this.props
    const { isModalToDelete } = this.state
    return (
      <section className="sidebar-nav-list">
        {boards.map((board, idx) => {
          return (
            <div className="flex" key={idx}>
              <div className={`board-title flex ${this.setClassName(board._id)}`}>
                <Link className="clean-link" to={`/2day/board/${board._id}`} >
                  {/* <RiBookLine size="19" style={{ transform: 'rotate(90px)' }} /> */}
                  {board.title}
                </Link>
                <button className="edit-board-btn" onClick={(ev) => {
                  ev.stopPropagation()
                  this.openModal(board._id)
                }}>
                  <BsThreeDots size="25px"
                    style={{ margin: "-9.5px", marginLeft: "-14px" }}
                  />
                </button>
              </div>
              {activeModal.cmpType === 'boardEdit' && activeModal.boardId === board._id &&
                <div className="board-modal">
                  <div
                    className="flex modal-board-items"
                  >
                    <div className="delete-board-container flex"
                      onClick={this.toggleModalDelete}>
                      <div>
                        <RiDeleteBinLine color="#323338c2" />{" "}
                      </div>
                      <span>Delete board</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          );
        })
        }
        {isModalToDelete && (
          < section className="modal-delete flex">
            <div className="title-modal-delete">
              {/* <div>
      <GrCircleAlert color="white" />
    </div> */}
              <span>Are you sure you want to delete?</span>
            </div>
            <div className="flex yes-no">
              <button onClick={this.toggleModalDelete} className="no-ans-delete">
                <HiOutlineX color="white" />
              </button>
              <Link className="clean-link" to={this.goToUrl}><button onClick={this.onRemoveBoard} className="yes-ans-delete">
                <AiOutlineCheck color="white" />
              </button></Link>
            </div>
          </section>
        )
        }
        {isModalToDelete && <div className="main-screen"></div>}
      </section >
    );
  }
}
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    activeModal: boardModule.activeModal
  };
}
const mapDispatchToProps = {
  removeBoard,
  setActiveModal
}
export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList);