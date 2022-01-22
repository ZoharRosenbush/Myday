import { connect } from "react-redux";
import { BsPersonPlus } from "react-icons/bs";
import { BsGraphUp } from 'react-icons/bs';


import { BoardControllers } from "./BoardControllers.jsx";
import { addGroup,loadBoards } from "../../store/board.action.js";
export function _BoardHeader({ board, updateBoard,loadBoards, addGroup }) {
  function onAddGroup() {
    addGroup(board._id);
  }
  

  async function onUpdateBoardTitle({ target }) {
    const value = target.textContent;
    if (!value) return;
    board.title = value;
    try{
     await updateBoard(board);
     loadBoards()
    }catch(err){
      console.log('error in updating board');
    }
  };

  function onUpdateBoardDesc({ target }) {
    const value = target.textContent;
    if (!value) return;
    board.description = value;
    updateBoard(board);
  };

  return (
    <section className="board-header">
      {board && (
        <div className="board-header-top">
          <div className="flex justify-between board-main-title">
            <h1
              className="board-title"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={onUpdateBoardTitle}
            >
              {board.title}
            </h1>
            <div className="board-header-btns flex">
              <div className="icon-btn-container flex">
              <BsPersonPlus /> 
              <button>  Invite / 4</button>
              </div>
              <div className="icon-btn-container flex">
              <BsGraphUp />
              <button>Activity</button>
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
      )}
      {/* <h1>{board.title}</h1> */}
      {board && <BoardControllers onAddGroup={onAddGroup} />}
    </section>
  );
}

function mapStateToProps({ boardModule }) {
  return {
    // board: boardModule.board,
  };
}
const mapDispatchToProps = {
  addGroup,
  loadBoards
};

export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
