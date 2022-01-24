import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { MainNav } from "../cmps/NavCmps/MainNav.jsx";
import { loadBoard } from "../store/board.action.js";
import { BoardHeader } from "../cmps/BoardCmps/BoardHeader.jsx";
import { BoardNav } from "../cmps/NavCmps/BoardNav.jsx";
import { GroupList } from "../cmps/GroupCmps/GroupList.jsx";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

import { setActiveModal, updateBoard } from "../store/board.action.js";

// import { boards } from '../helpers/monday.js'
class _BoardDetails extends React.Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(boardId);
    const activeModal = { cmpType: null, taskId: null };
    document.addEventListener("click", () => {
      this.props.setActiveModal(activeModal);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      this.props.loadBoard(boardId);
    }
  }

  componentWillUnmount() {
    const activeModal = { cmpType: null, taskId: null };
    document.removeEventListener("click", () => {
      this.props.setActiveModal(activeModal);
    });
  }

  // onDragEnd = (result) => {

  //   const { destination, source, draggableId } = result;
  //   const { group, board, updateBoard } = this.props;
  //   const groupToMove = board.groups.find(group => group.id === draggableId)
  //   if (groupToMove !== -1) {

  //     board.groups.splice(source.index, 1);
  //     board.groups.splice(destination.index, 0, groupToMove);
  //     updateBoard(board);

  //   }

  // };

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

          {board && (
            // <DragDropContext onDragEnd={this.onDragEnd}>
            //   <Droppable droppableId="droppable">
            //     {(provided, snapshot) => (
            //       <div
            //         {...provided.droppableProps}
            //         ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                  // >


                    <GroupList board={board} />


            //        {provided.placeholder}
            //      </div>
            //     )}
            //   </Droppable>
            // </DragDropContext>
          )}
        </section>
      </section>
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
