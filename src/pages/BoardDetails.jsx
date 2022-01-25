import React from "react";
import { connect } from "react-redux";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import { loadBoard } from "../store/board.action.js";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { GroupList } from "../cmps/GroupCmps/GroupList.jsx";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import { socketService } from "../services/socket.service.js";

import { setActiveModal, updateBoard } from "../store/board.action.js";

// import { boards } from '../helpers/monday.js'
class _BoardDetails extends React.Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    // const {loadBoard} = this.props
    this.props.loadBoard(boardId);
    const activeModal = { cmpType: null, taskId: null };
    document.addEventListener("click", () => {
      this.props.setActiveModal(activeModal);
    });

    socketService.setup()
    socketService.emit('join board-room',boardId)
    socketService.on('board was updated',this.props.loadBoard)
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      this.props.loadBoard(boardId);
      // THIS.PROPS.LOADFILTEREDBOARDׁׂׂ
    }

    // if (prevProps.board !== this.props.board) {
    //   this.props.loadBoard(boardId);
    //   // THIS.PROPS.LOADFILTEREDBOARDׁׂׂ
    // }

    // No need - 

    // if (prevProps.fillteredBoard !== this.props.fillteredBoard) {
    //   this.props.loadBoard(boardId);
    //   // THIS.PROPS.LOADFILTEREDBOARDׁׂׂ
    // }
  }

  componentWillUnmount() {
    const activeModal = { cmpType: null, taskId: null };
    document.removeEventListener("click", () => {
      this.props.setActiveModal(activeModal);
    });
    socketService.terminate()
  }

  onDragEnd = ({ type, ...result }) => {
    if (!result.destination) return;
    if (type === 'board') {
      this._onGroupDragEnd(result);
    } else if (type === 'group') {
      this._onTaskDragEnd(result);
    }
  };

  _onGroupDragEnd({ source, destination }) {
    const { board, updateBoard } = this.props;
    const boardCopy = { ...board };
    const [group] = boardCopy.groups.splice(source.index, 1);
    boardCopy.groups.splice(destination.index, 0, group);
    updateBoard(boardCopy);
  }

  _onTaskDragEnd({ source, destination, draggableId }) {
    const { board, updateBoard } = this.props;
    const boardCopy = { ...board };
    const groupSourceIdx = boardCopy.groups.findIndex(
      (group) => group.id === source.droppableId
    );

    const task = boardCopy.groups[groupSourceIdx].tasks.find(
      (task) => task.id === draggableId
    );
    const groupDestinationIdx = boardCopy.groups.findIndex(
      (group) => group.id === destination.droppableId
    );

    boardCopy.groups[groupSourceIdx].tasks.splice(source.index, 1);
    boardCopy.groups[groupDestinationIdx].tasks.splice(destination.index, 0, task);
    updateBoard(boardCopy);
  }

  render() {
    const { board, updateBoard, isBoardNavOpen } = this.props;
    
    const boardContainerClassName = isBoardNavOpen
      ? "board-container-open-nav"
      : "board-container";


    return (
      <section>
        <MainNav />
        <BoardNav />
        <section className={boardContainerClassName}>
          <BoardHeader board={board} updateBoard={updateBoard} />

          <DragDropContext onDragEnd={this.onDragEnd}>
            {board?.groups && (
              <Droppable
                droppableId={board._id}
                type='board'
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="group-list-wrapper"
                  >
                    {/* isFilttered&& <GroupList board ={filteredBoard} */}
                    <GroupList
                      board={board}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </DragDropContext>
        </section>
      </section >
    );
  }
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
    isBoardNavOpen: boardModule.isBoardNavOpen,
    //   currFilterBy: toyModule.currFilterBy
  };
}
const mapDispatchToProps = {
  loadBoard,
  setActiveModal,
  updateBoard,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
