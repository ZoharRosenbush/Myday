import { connect } from 'react-redux';
import { BsPersonPlus } from 'react-icons/bs'
import { BoardControllers } from './BoardControllers.jsx'
export function _BoardHeader({ board }) {
  console.log('board:', board);

  return (
    <section className="board-header">
      {board && <div className='board-header-top'>
        <div
          className='flex justify-between title-btns'
        >
          <h1 className='board-title' contentEditable
            suppressContentEditableWarning={true}
          >
            {board.title}
          </h1>
          <div className='board-header-btns'>
            <BsPersonPlus />
            <button>Invite/4</button>
            <button>Activity</button>
          </div>
        </div>
        <p className="board-description"
          contentEditable
          suppressContentEditableWarning={true}
        >{board.description}
        </p>
      </div>}
      {/* <h1>{board.title}</h1> */}
      <BoardControllers />
    </section>
  );
}


function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}
const mapDispatchToProps = {
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);