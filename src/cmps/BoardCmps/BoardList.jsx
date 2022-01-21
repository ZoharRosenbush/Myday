import React from "react";
import { Link } from "react-router-dom";
import { RiBookLine } from 'react-icons/ri'
import { BsThreeDots } from 'react-icons/bs'
import { RiDeleteBinLine } from "react-icons/ri";

export class BoardList extends React.Component {
  state = {
    openModal: {
      isBoardModalOpen: false,
      boardId: null
    },
    isModalToDelete: false,
  };

  toggleBoardModal = (boardId) => {
    console.log('boardId:', boardId);
    const { openModal } = this.state
    this.setState({ openModal: { isBoardModalOpen: !openModal.isBoardModalOpen, boardId: boardId } }, () => {
      console.log('this.state:', this.state);
    });
  };

  toggleModalDelete = () => {
    this.setState({ isBoardModalOpen: false });
    this.setState({ isModalToDelete: !this.state.isModalToDelete });
  };




  render() {
    const { boards, onRemoveBoard } = this.props
    const { openModal } = this.state
    console.log('openModal:', openModal);
    // console.log(board._id);

    return (
      <section className="sidebar-nav-list">
        {boards.map((board, idx) => {
          return (
            <div className="flex" key={idx}>

              <div className="board-title flex">
                <Link className="clean-link" to={`/myday/board/${board._id}`}>
                  {/* <RiBookLine size="19" style={{ transform: 'rotate(90px)' }} /> */}
                  {board.title}
                </Link>
                <button className="delete-board-btn" onClick={() => {
                  this.toggleBoardModal(board._id)
                  // onRemoveBoard(board._id)
                }}>
                  <BsThreeDots size="25px" style={{ marginLeft: "100px" }} />
                </button>
              </div>
              {openModal.isBoardModalOpen && (openModal.boardId === board._id) &&
                <div className="board-modal">
                  <div
                    className="flex modal-board-items"
                    onClick={this.toggelModalDelete}
                  >
                    <div>
                      <RiDeleteBinLine color="#323338c2" />{" "}
                    </div>
                    <span>Delete group</span>
                  </div>

                </div>
              }

              {/* {isModalToDelete && (
          <section className="modal-delete">
            <div className="flex title-modal-delete">
              <div>
                <GrCircleAlert />
              </div>
              <span>Are you sure you want to delete?</span>
            </div>
            <button onClick={this.toggelModalDelete} className="no-ans-delete">
              No
            </button>
            <button onClick={this.deleteGroup} className="yes-ans-delete">
              Yes
            </button>
          </section>
        )} */}



            </div>
          );
        })}
      </section>
    );
  }

}
