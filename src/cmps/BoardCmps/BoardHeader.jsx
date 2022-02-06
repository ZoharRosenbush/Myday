import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BsPersonPlus } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { BsGraphUp } from 'react-icons/bs';
import { AiFillInfoCircle } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { MainDashboardCmp } from "./MainDashboardCmp.jsx";


import { BoardControllers } from "./BoardControllers.jsx";
import { addGroup, updateBoardTitle, saveBoard } from "../../store/board.action.js";
import { utilService } from '../../services/utils.service.js'



export function _BoardHeader({ board, user, saveBoard, updateBoardTitle, addGroup }) {

  const [isDescShown, toggleDesc] = useState(true);
  // const [emailAdress, setEmailAdress] = useState('')
  const [isMiniModalShown, toggleMiniModal] = useState(false)

  let timeoutId;

  const boardCopy = utilService.createDeepCopy(board)

  function onAddGroup() {
    if (!user) {
      user = {
        "fullname": "Guest",
        "acronyms": "G",
        "_id": utilService.makeId(),
        "username": "guest",
        "userColor": "transparent"
      }
    }
    addGroup(boardCopy, user);
  }

  function onUpdateBoardTitle({ target }) {
    const value = target.textContent;
    if (!value) return;
    boardCopy.title = value;
    updateBoardTitle(boardCopy)
  };

  // function handleChange({ target }) {
  //   const value = target.value;
  //   setEmailAdress(value)
  // }

  function onUpdateBoardDesc({ target }) {
    const value = target.textContent;
    if (!value) return;
    boardCopy.description = value;
    saveBoard(boardCopy);
  };

  function CopyLinkClipboard() {

    navigator.clipboard.writeText(`https://app-2day.herokuapp.com/#/2day/board/${board._id}`)
    toggleMiniModal(true)
    timeoutId = setTimeout(() => {
      toggleMiniModal(false)
      clearTimeout(timeoutId)
    }, 2000)
  }

  return (
    <section className="board-header">
      {board && (
        <div className="board-header-top">
          <div className=" board-main-title">
            <div className="board-title-container">
              <h1
                className="board-header-title"
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={onUpdateBoardTitle}
              >
                {board.title}
              </h1>
              <button className="icon-btn-container" onClick={() => { toggleDesc(!isDescShown) }}><AiFillInfoCircle color="#676879" /></button>
              <button className="icon-btn-container"><AiOutlineStar color="#676879" /></button>
            </div>

            <div className="board-header-btns flex">
              <div className="last-seen-members icon-btn-container flex">
                <p>Last seen</p>
                {board.members &&
                  board.members.map((member, idx) => {
                    return <div key={idx} style={{ backgroundColor: member.userColor }} className={member.acronyms}>{member.acronyms}</div>
                  })}
              </div>

              <div className="icon-btn-container invite flex" onClick={CopyLinkClipboard}>
                <BsPersonPlus />
                <button>  Invite / 3</button>
                {isMiniModalShown && <div className="mini-modal">
                  Link copied to clipboard!
                </div>}
              </div>
              <div className="icon-btn-container activity flex">
                <BsGraphUp />
                <button>Activity</button>
              </div>
              <div className="icon-btn-container plus-board flex">
                <AiOutlinePlus />
                <button>Add to board</button>
              </div>
              <div className="icon-btn-container dots-icon flex">
                <button className="flex align-center dots" ><BsThreeDots /></button>
              </div>
            </div>
          </div>
          {isDescShown && <div className="desc-container">
            <p
              className="board-description"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={onUpdateBoardDesc}

            >
              {board.description}
            </p>
          </div>}
        </div>
      )
      }
      {/* <h1>{board.title}</h1> */}
      {board && <MainDashboardCmp />}
      {board && <BoardControllers onAddGroup={onAddGroup} />}
      {/* {<div className="main-screen">
        <div className="email-modal">
          <h1>Invite members to board!</h1>
          <form>
            <input value={emailAdress} type="email" required placeholder="Enter email" />
          </form>
          <div className="icon-btn-container plus-board flex">
            <AiOutlineMail />
            <button>Invite</button>
          </div>
        </div>

      </div>} */}
    </section >
  );
}

function mapStateToProps({ userModule }) {
  return {
    user: userModule.user,
  };
}
const mapDispatchToProps = {
  addGroup,
  updateBoardTitle,
  saveBoard
};

export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
