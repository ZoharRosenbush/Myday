import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BsThreeDots } from 'react-icons/bs'
import { RiDeleteBinLine } from "react-icons/ri";
import { GrCircleAlert } from "react-icons/gr";
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

  render() {
    const { boards, board, activeModal } = this.props
    const { isModalToDelete } = this.state

    return (
      <section className="sidebar-nav-list">
        {boards.map((board, idx) => {
          return (
            <div className="flex" key={idx}>
              <div className={`board-title flex ${this.setClassName(board._id)}`}>
                <Link className="clean-link" to={`/myday/board/${board._id}`} >
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
              {isModalToDelete && (

                < section className="modal-delete">
                  <button onClick={() => { this.checkId(board._id) }}>checking</button>
                  <div className="flex title-modal-delete">
                    <div>
                      <GrCircleAlert />
                    </div>
                    <span>Are you sure you want to delete?</span>
                  </div>
                  <button onClick={this.toggleModalDelete} className="no-ans-delete">
                    No
                  </button>
                  <button onClick={this.onRemoveBoard} className="yes-ans-delete">
                    Yes
                  </button>
                </section>
              )
              }
              {isModalToDelete && <div className="main-screen"></div>}

            </div>
          );
        })
        }
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


