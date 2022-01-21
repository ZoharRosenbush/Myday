import { connect } from "react-redux";
import { BsPersonPlus } from "react-icons/bs";
import { BoardControllers } from "./BoardControllers.jsx";
import { addGroup,updateBoard } from "../../store/board.action.js";
export function _BoardHeader({ board,updateBoard, addGroup }) {
  
  function onAddGroup() {
    addGroup(board._id);
  }

  function onUpdateBoardTitle({ target }) {
    const value = target.textContent;
    if (!value) return;
    board.title = value;
    updateBoard(board);
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
          <div className="flex justify-between title-btns">
            <h1
              className="board-title"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={onUpdateBoardTitle}
            >
              {board.title}
            </h1>
            <div className="board-header-btns">
              <BsPersonPlus />
              <button>Invite/4</button>
              <button>Activity</button>
            </div>
          </div>
          <p
            className="board-description"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={onUpdateBoardDesc}

          >
            {board.description}
          </p>
        </div>
      )}
      {/* <h1>{board.title}</h1> */}
      {board&& <BoardControllers onAddGroup={onAddGroup} />}
    </section>
  );
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}
const mapDispatchToProps = {
  addGroup,
};

export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
