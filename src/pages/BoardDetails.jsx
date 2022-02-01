import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import {  Droppable, DragDropContext } from "react-beautiful-dnd";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import { UserMsg } from "../cmps/UserMsg/UserMsg.jsx";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { TaskDetails } from '../cmps/TaskCmps/TaskDetails'
import { GroupList } from "../cmps/GroupCmps/GroupList.jsx";
import { socketService } from "../services/socket.service.js";
import { utilService } from '../services/utils.service.js';
import { setActiveModal, saveBoard, loadBoard, loadBoards } from "../store/board.action.js";

// import { boards } from '../helpers/monday.js'
class _BoardDetails extends React.Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(boardId);
    const emptyActiveModal = { cmpType: null, taskId: null };
    document.addEventListener("click", () => {
      if (this.props.activeModal.cmpType) {
        this.props.setActiveModal(emptyActiveModal);
      }
    });

    socketService.setup()
    socketService.emit('join board-room', boardId)
    socketService.on('board was updated', this.props.loadBoard)
    socketService.on('board-list was updated', this.props.loadBoards)
  }



  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      this.props.loadBoard(boardId)
      socketService.emit('join board-room', boardId)
    }
  }

  componentWillUnmount() {
    const activeModal = { cmpType: null, taskId: null };
    document.removeEventListener("click", () => {
      this.props.setActiveModal(activeModal);
    });
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
    const { board, saveBoard } = this.props;
    const boardCopy = utilService.createDeepCopy(board)
    const [group] = boardCopy.groups.splice(source.index, 1);
    boardCopy.groups.splice(destination.index, 0, group);
    saveBoard(boardCopy);
  }

  _onTaskDragEnd({ source, destination, draggableId }) {
    const { board, saveBoard } = this.props;
    const boardCopy = utilService.createDeepCopy(board)
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
    saveBoard(boardCopy);
  }

  render() {
    const { board, saveBoard, isBoardNavOpen } = this.props;

    const boardContainerClassName = isBoardNavOpen
      ? "board-container-open-nav"
      : "board-container";

    return (
      <section className="app-layout">
        {/* <Route path='/2day/board/:boardId/:groupId/:taskId' component={TaskDetails} /> */}
        <MainNav />
        <BoardNav />
        <Route path='/2day/board/:boardId/:groupId/:taskId' component={TaskDetails} />
        <section className={boardContainerClassName}>
          <BoardHeader board={board} user={this.props.user} />
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
                      goToTaskDetails={this.goToTaskDetails}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </DragDropContext>
          {/* <Route path="/2day/board/:boardId/:groupId/:taskId" component={TaskDetails} /> */}
          {/* <Route path="/2day/board/:boardId/:groupId/:taskId" component={TaskDetails} /> */}

        </section>
        <UserMsg />
      </section >
    );
  }
}

function mapStateToProps({ boardModule, userModule }) {
  return {
    board: boardModule.board,
    user: userModule.user,
    isBoardNavOpen: boardModule.isBoardNavOpen,
    activeModal: boardModule.activeModal
  }
}
const mapDispatchToProps = {
  loadBoard,
  setActiveModal,
  saveBoard,
  loadBoards
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
