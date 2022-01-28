import { connect } from "react-redux";
import { BsPersonPlus } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { BsGraphUp } from 'react-icons/bs';
import { AiFillInfoCircle } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';


import { BoardControllers } from "./BoardControllers.jsx";
import { addGroup, updateBoardTitle,saveBoard } from "../../store/board.action.js";
import {utilService} from '../../services/utils.service.js'


export function _BoardHeader({ board, saveBoard, updateBoardTitle, addGroup }) {

  const boardCopy = utilService.createDeepCopy(board)

  function onAddGroup() {
    addGroup(boardCopy);
  }


  function onUpdateBoardTitle({ target }) {
    const value = target.textContent;
    if (!value) return;
    boardCopy.title = value;
    updateBoardTitle(boardCopy)
  };

  function onUpdateBoardDesc({ target }) {
    const value = target.textContent;
    if (!value) return;
    boardCopy.description = value;
    saveBoard(boardCopy);
  };

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
              <button className="icon-btn-container"><AiFillInfoCircle color="#676879" /></button>
              <button className="icon-btn-container"><AiOutlineStar color="#676879" /></button>
            </div>

            <div className="board-header-btns flex">
              <div className="last-seen-members icon-btn-container flex">
                <p>Last seen</p>
                {board.members &&
                  board.members.map((member, idx) => {
                    return <div key={idx} className={member.acronyms}>{member.acronyms}</div>
                  })}
              </div>

              <div className="icon-btn-container flex">
                <BsPersonPlus />
                <button>  Invite / 3</button>
              </div>
              <div className="icon-btn-container flex">
                <BsGraphUp />
                <button>Activity</button>
              </div>
              <div className="icon-btn-container plus-board flex">
                <AiOutlinePlus />
                <button>Add to board</button>
              </div>
              <div className="icon-btn-container flex">
                <button className="flex align-center dots" ><BsThreeDots /></button>
              </div>
            </div>
          </div>
          <div className="desc-container">
            <p
              className="board-description"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={onUpdateBoardDesc}

            >
              {board.description}
            </p>

          </div>
        </div>
      )
      }
      {/* <h1>{board.title}</h1> */}
      {board && <BoardControllers onAddGroup={onAddGroup} />}
    </section >
  );
}

function mapStateToProps({ boardModule }) {
  return {
    // board: boardModule.board,
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
