import {
  boardService
} from "../services/board.service.js";

export function loadBoards() {
  console.log('loding boards🤩');
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

export function addBoard() {
  const newBoard = boardService.getNewBoard()

  return async (dispatch) => {
    try {
      const savedBoard = await boardService.saveBoard(newBoard)
      dispatch({
        type: "ADD_BOARD",
        board: {
          _id: savedBoard._id,
          title: savedBoard.title
        },
      })
    } catch (err) {
      console.log("Cannot add board", err);
    }
  };
}

export function updateBoard(board) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board,
      });
      await boardService.saveBoard(board)
    } catch (err) {
      console.log("Cannot update board", err);
    }
  }
}

export function updateBoardTitle(board) {
  const miniBoard = {title:board.title,_id:board._id}

  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board,
      })
      dispatch({
        type: "UPDATE_BOARDS",
        board: miniBoard,
      })
      await boardService.updateBoardTitle(board)
    } catch (err) {
      console.log("Cannot update board", err);
    }
  }


}

export function removeBoard(boardId) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "REMOVE_BOARD",
        boardId: boardId
      });
      await boardService.removeBoard(boardId);
    } catch (err) {
      console.log("Cannot delete board", err);
    }
  };
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
  const boardBeforeChange = board

  const groupIdx = board.groups.findIndex((group) => groupId === group.id);
  const filteredTasks = board.groups[groupIdx].tasks.filter((task) => {
    return task.id !== taskId;
  });
  board.groups[groupIdx].tasks = filteredTasks;

  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board
      });
      await boardService.saveBoard(board)
    } catch (err) {
      dispatch({
        type: "SET_BOARD",
        board: boardBeforeChange
      });
      // throw new Error
      console.log('err:', err);
    }
  };
}

export function addTask(taskTitle, groupId, board) {

  const newTask = boardService.addNewTask(taskTitle)

  const groupIdx = board.groups.findIndex((group) => groupId === group.id);
  board.groups[groupIdx].tasks.push(newTask);

  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board
      })
      await boardService.saveBoard(board)

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
  const newGroup = boardService.getNewGroup()
  board.groups.unshift(newGroup);
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board
      });
      await boardService.saveBoard(board)
    } catch (err) {
      console.log('err:', err);
    }
  };

}


export function deleteGroup(groupId, board) {
  const filteredGroups = board.groups.filter((group) => {
    return group.id !== groupId;
  });
  board.groups = filteredGroups

  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board
      });
      await boardService.saveBoard(board)
    } catch (err) {
      console.log('err:', err);
    }
  };
}

// Store - saveTask
export function saveTask(taskToSave, groupId, board, activity, comment) {

  if (activity) {
    activity.id = boardService.makeId()
    activity.byMember = {
      "fullname": "Lora Turner",
      "username": "Lora Turner",
      "_id": "61edc3c5652f5891aac4aed6",
      "acronyms": "LT",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg"
    }
    taskToSave.activities = [activity, ...taskToSave.activities]
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
    taskToSave.comments = [comment, ...taskToSave.comments]
  }

  const groupIdx = board.groups.findIndex((group) => groupId === group.id);
  const updatedtasks = board.groups[groupIdx].tasks.map((task) => {
    return task.id === taskToSave.id ? taskToSave : task
  });
  board.groups[groupIdx].tasks = updatedtasks

  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_BOARD",
        board: board
      });
      await boardService.saveBoard(board)
    } catch (err) {
      console.log('err:', err);
    }
  };
}


export function saveGroup(groupToSave, board) {

  const groupIdx = board.groups.findIndex(
    (group) => groupToSave.id === group.id
  );

  board.groups[groupIdx] = groupToSave;

  return async (dispatch) => {
    try {
      dispatch({ type: "SET_BOARD", board: board });
      await boardService.saveBoard(board)
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