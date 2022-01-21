import { boardService } from "../services/board.service.js";

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query();
      dispatch({ type: "SET_BOARDS", boards: boards });
    } catch (err) {
      console.log("cannot find boards:", err);
      throw err;
    }
  };
}

export function loadBoard(boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.getById(boardId);
console.log('board in action:', board);

      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log("cannot find board:", err);
      throw err;
    }
  };
}

export function addBoard(board) {
  return async (dispatch) => {
    try {
      const savedBoard = await boardService.save({ ...board });
      dispatch({
        type: "ADD_BOARD",
        board: { _id: savedBoard._id, title: savedBoard.title },
      });
    } catch (err) {
      console.log("Cannot add board", err);
    }
  };
}

export function   deleteTask(taskId, groupId, boardId){
  console.log('taskId:',taskId );
  console.log('groupId:',groupId );
  console.log('boardId:',boardId );
  
  return async (dispatch) => {
   
    try {
      const board = await boardService.deleteTask( taskId, groupId, boardId);
      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log('err:', err);
    }
  };
}


export function  addTask( value, groupId, boardId){
  return async (dispatch) => {
    console.log('value:', value);
    
    try {
      const board = await boardService.addTask( value, groupId, boardId);
      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log('err:', err);
    }
  };

}
export function  addGroup(boardId){
  return async (dispatch) => {
    try {
      const board = await boardService.addGroup( boardId);
      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log('err:', err);
    }
  };

}

export function removeBoard( boardId) {
  return async (dispatch) => {
    try {
      await boardService.remove(boardId);
      dispatch({ type: "REMOVE_BOARD", boardId: boardId });
    } catch (err) {
      console.log("Cannot delete board", err);
    }
  };
}
export function deleteGroup(groupId, boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.deleteGroup(groupId, boardId);
      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log('err:', err);
    }
  };
}









// Store - saveTask
export function saveTask(task, groupId, boardId) {
  // const activity = {
  //     "id": makeId(),
  //     "txt": "Changed Color",
  //     "createdAt": Date.now(),
  //     "byMember": userService.getLoggedinUser(),
  //     "task": task
  // }
  return async (dispatch) => {
    try {

      const board = await boardService.saveTask(task, groupId, boardId);
      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log('err:', err);
    }
  };
}
export function saveGroup(group, boardId) {

  // const activity = {
  //     "id": makeId(),
  //     "txt": "Changed Color",
  //     "createdAt": Date.now(),
  //     "byMember": userService.getLoggedinUser(),
  //     "task": task
  // }
  return async (dispatch) => {
    try {
      const board = await boardService.saveGroup(group, boardId);
      dispatch({ type: "SET_BOARD", board: board });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function setActiveModal(activeModal) {
  return (dispatch) => {
      dispatch({ type: "SET_ACTIVE_MODAL", activeModal: activeModal });
  };
}

// export function loadToys() {
//   return async (dispatch) => {
//     try {
//       const toys = await toyService.query();
//       const action = { type: "SET_TOYS", toys: toys };
//       dispatch(action);
//     } catch (err) {
//       console.log("cannot find toys", err);
//       throw err;
//     }
//   };
// }
// export function removeBoard(boardId) {
//   return async (dispatch) => {
//     try {
//       // const removedToy =
//       await toyService.remove(toyId);
//       dispatch({ type: "REMOVE_TOY", toyId: toyId });
//       // dispatch({
//       //   type: "SET_MSG",
//       //   msg: { txt: "toy Removed", type: "success" },
//       // });
//     } catch (err) {
//       console.log("Cannot remove toy", err);
//     }
//   };
// }

// export function toggleToy(toy) {
//   return async (dispatch) => {
//     const toyToSave = { ...toy, isDone: !toy.isDone };
//     try {
//       const savedToy = await toyService.save(toyToSave);

//       dispatch({ type: "UPDATE_TODO", toy: savedToy });
//       // dispatch({
//       //   type: "SET_MSG",
//       //   msg: { txt: "toy Update", type: "success" },
//       // });
//     } catch (err) {
//       console.log("err:", err);

//       // dispatch({
//       //   type: "SET_MSG",
//       //   msg: { txt: "toy did not Update", type: "danger" },
//       // });
//     }
//   };
// }

// export function setFilter(currFilterBy) {
//   return (dispatch) => {
//     dispatch({ type: "SET_FILTER", currFilterBy: currFilterBy });
//   };
// }

// export function updateFilter(currFilterBy) {
//   return async (dispatch) => {
//     try {
//       const toys = await toyService.query(currFilterBy);
//       const action = { type: "SET_TOYS", toys };
//       dispatch(action);
//     } catch (err) {
//       console.log("Cannot updae filter", err);
//     }
//   };
// }

// export function closeMsg ()  {
//   return (dispatch) => {
// dispatch({ type: 'SET_MSG', msg: null })
//   }
// }
