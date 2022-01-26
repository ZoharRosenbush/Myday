import {
  boardService
} from "../services/board.service.js";

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query();
      dispatch({
        type: "SET_BOARDS",
        boards: boards
      });

    } catch (err) {
      console.log("cannot find boards:", err);
      throw err;
    }
  };
}

export function loadBoard(boardId, currFilterBy = null) {
  // console.log('currFilterBy:', currFilterBy);

  return async (dispatch) => {
    try {
      const board = await boardService.getById(boardId, currFilterBy);
      dispatch({
        type: "SET_BOARD",
        board: board
      });
    } catch (err) {
      console.log("cannot find board:", err);
      throw err;
    }
  }
}

// FUNCTION - loadFilteredBoard(board,filterBy){
// const filteredBoard = boardService.filterBoard 
// dispatch({ type: "SET_FILTERED_BOARD", board: filteredBoard });

// }

export function addBoard(board) {
  return async (dispatch) => {
    try {
      const savedBoard = await boardService.saveBoard({
        ...board
      });
      dispatch({
        type: "ADD_BOARD",
        board: {
          _id: savedBoard._id,
          title: savedBoard.title
        },
      });
    } catch (err) {
      console.log("Cannot add board", err);
    }
  };
}

export function updateBoard(board) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_BOARD",
        board: board,
      });
      await boardService.saveBoard({
        ...board
      });


    } catch (err) {
      console.log("Cannot update board", err);
    }
  }
}


export function updateFilter(currFilterBy) {

  return (dispatch) => {

    dispatch({
      type: "SET_FILTER",
      currFilterBy: {
        ...currFilterBy
      }
    });

  }
}

export function deleteTask(taskId, groupId, board) {

  return async (dispatch) => {

    try {
      const updatedBoard = await boardService.deleteTask(taskId, groupId, board);
      dispatch({
        type: "SET_BOARD",
        board: updatedBoard
      });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addTask(value, groupId, board) {
  return async (dispatch) => {

    try {
      const updatedBoard = await boardService.addTask(value, groupId, board);
      dispatch({
        type: "SET_BOARD",
        board: updatedBoard
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

}
// export function addComment(value, taskId, boardId) {
//   return async (dispatch) => {
//     console.log('value:', value);

//     try {
//       const board = await boardService.addTask(value, groupId, boardId);
//       dispatch({ type: "SET_BOARD", board: board });
//     } catch (err) {
//       console.log('err:', err);
//     }
//   };
// }


export function addGroup(board) {
  return async (dispatch) => {
    try {
      const updatedBoard = await boardService.addGroup(board);
      console.log('recived board to action',updatedBoard);
      dispatch({
        type: "SET_BOARD",
        board: updatedBoard
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

}

export function removeBoard(boardId) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "REMOVE_BOARD",
        boardId: boardId
      });
      await boardService.remove(boardId);
    } catch (err) {
      console.log("Cannot delete board", err);
    }
  };
}
export function deleteGroup(groupId, board) {
  console.log('board:', board);
  
  return async (dispatch) => {
    try {
      const updatedBoard = await boardService.deleteGroup(groupId, board);
      dispatch({
        type: "SET_BOARD",
        board: updatedBoard
      });
    } catch (err) {
      console.log('err:', err);
    }
  };
}


// Store - saveTask
export function saveTask(task, groupId, board, activity, comment) {

  if (activity) {
    activity.id = boardService.makeId()
    activity.byMember = {
      "fullname": "Lora Turner",
      "username": "Lora Turner",
      "_id": "61edc3c5652f5891aac4aed6",
      "acronyms": "LT",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg"
    }
    task.activities = [activity, ...task.activities]
  }
  if (comment) {
    comment.id = boardService.makeId()
    comment.byMember = {
      "fullname": "Lora Turner",
      "username": "Lora Turner",
      "_id": "61edc3c5652f5891aac4aed6",
      "acronyms": "LT",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg"
    }
    task.comments = [comment, ...task.comments]
  }
  return async (dispatch) => {
    try {
      const updatedBoard = await boardService.saveTask(task, groupId, board);
      dispatch({
        type: "SET_BOARD",
        board: updatedBoard
      });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function saveGroup(group, board) { 
  
  return async (dispatch) => {
    try {
      
      const updatedBoard= await boardService.saveGroup(group, board);
      dispatch({ type: "SET_BOARD", board: updatedBoard });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function setActiveModal(activeModal) {
  // console.log('active modal',activeModal);
  return (dispatch) => {
    dispatch({
      type: "SET_ACTIVE_MODAL",
      activeModal: activeModal
    });
  };
}


export function setBoardNav(isBoardNavOpen) {
  return (dispatch) => {
    dispatch({
      type: "SET_BOARD_NAV",
      isBoardNavOpen: isBoardNavOpen
    })
  }
}

export function setTaskModal(isTaskDetailsOpen) {
  return (dispatch) => {
    dispatch({
      type: "SET_TASK_MODAL",
      isTaskDetailsOpen: isTaskDetailsOpen
    })
  }
}