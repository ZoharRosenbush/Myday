import { boardService } from '../services/board.service.js';
import { utilService } from '../services/utils.service.js';


// **BOARD ACTIONS**

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query();
      dispatch({
        type: "SET_BOARDS",
        boards: boards
      });
    } catch (err) {
      console.log('Cannot load boards:', err);
      _alertUser(dispatch, 'Failed to load boards, please check your internet connection')
    }
  }
}

export function loadBoard(boardId, currFilterBy = null) {

  return async (dispatch) => {
    try {
      const board = await boardService.getById(boardId, currFilterBy);
      dispatch({
        type: "SET_BOARD",
        board: board
      });
    } catch (err) {
      console.log('Cannot load board:', err);
      _alertUser(dispatch, 'Failed to load board, please check your internet connection')
    }
  }
}

export function addBoard(user) {
  const newBoard = boardService.getNewBoard(user)

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
      console.log('Cannot add board:', err);
      _alertUser(dispatch, 'Failed to add board, please check your internet connection')
    }
  }
}

export function saveBoard(boardToSave) {
  return async (dispatch) => {
    _setBackupBoard(dispatch)
    try {
      dispatch({
        type: "SET_BOARD",
        board: boardToSave,
      });
      await boardService.saveBoard(boardToSave)
    } catch (err) {
      _restoreBoard(dispatch)
      _alertUser(dispatch, 'Failed to save board, please check your internet connection')
      console.log('Err in saving board:', err);
    }
  }
}

export function updateBoardTitle(boardToSave) {
  const miniBoard = { title: boardToSave.title, _id: boardToSave._id }

  return async (dispatch) => {
    try {
      _setBackupBoard(dispatch)
      dispatch({
        type: "SET_BOARD",
        board: boardToSave,
      })
      dispatch({
        type: "UPDATE_BOARDS",
        board: miniBoard,
      })
      await boardService.updateBoardTitle(boardToSave)
    } catch (err) {
      _restoreBoard(dispatch)
      _alertUser(dispatch, 'Failed to update title, please check your internet connection')
      console.log('Cannot update board title:', err);
    }
  }
}

export function removeBoard(boardId) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "REMOVE_BOARD",
        boardId: boardId
      })
      await boardService.removeBoard(boardId);
    } catch (err) {
      console.log('Cannot remove board:', err);
      _alertUser(dispatch, 'Failed to remove board, please check your internet connection')
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
    })

  }
}

export function updateSearch(search) {
  // console.log('search:', search);

  return (dispatch) => {

    dispatch({
      type: "SET_SEARCH",
      search: {
        search
      }
    })

  }
}

export function setBoardNav(isBoardNavOpen) {
  return (dispatch) => {
    dispatch({
      type: "SET_BOARD_NAV",
      isBoardNavOpen: isBoardNavOpen
    })
  }
}


// **GROUP ACTIONS**

export function saveGroup(groupToSave, boardToSave) {

  const groupIdx = boardToSave.groups.findIndex(
    (group) => groupToSave.id === group.id
  )
  boardToSave.groups[groupIdx] = groupToSave

  return saveBoard(boardToSave)

  // return async (dispatch) => {
  //   _setBackupBoard(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOARD",
  //       board: boardToSave,
  //     });
  //     await boardService.saveBoard(boardToSave)
  //   } catch (err) {
  //     _restoreBoard(dispatch)
  //     _alertUser(dispatch, 'Failed to save board, please check your internet connection')
  //     console.log('Err in saving board:', err);
  //   }
  // }
}

export function addGroup(boardToSave, user) {
  const newGroup = boardService.getNewGroup(user)
  boardToSave.groups.unshift(newGroup);

  return saveBoard(boardToSave)
  // return async (dispatch) => {
  //   _setBackupBoard(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOARD",
  //       board: boardToSave,
  //     });
  //     await boardService.saveBoard(boardToSave)
  //   } catch (err) {
  //     _restoreBoard(dispatch)
  //     _alertUser(dispatch, 'Failed to save board, please check your internet connection')
  //     console.log('Err in saving board:', err);
  //   }
  // }
}

export function deleteGroup(groupId, boardToSave) {
  const filteredGroups = boardToSave.groups.filter((group) => {
    return group.id !== groupId;
  });
  boardToSave.groups = filteredGroups

  return saveBoard(boardToSave)

  // return async (dispatch) => {
  //   _setBackupBoard(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOARD",
  //       board: boardToSave,
  //     });
  //     await boardService.saveBoard(boardToSave)
  //   } catch (err) {
  //     _restoreBoard(dispatch)
  //     _alertUser(dispatch, 'Failed to save board, please check your internet connection')
  //     console.log('Err in saving board:', err);
  //   }
  // }
}


// **TASK ACTIONS**

export function deleteTask(taskId, groupId, boardToSave) {
  const groupIdx = boardToSave.groups.findIndex((group) => groupId === group.id);
  const filteredTasks = boardToSave.groups[groupIdx].tasks.filter((task) => {
    return task.id !== taskId;
  })
  boardToSave.groups[groupIdx].tasks = filteredTasks;

  return saveBoard(boardToSave)
  // return async (dispatch) => {
  //   _setBackupBoard(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOARD",
  //       board: boardToSave,
  //     });
  //     await boardService.saveBoard(boardToSave)
  //   } catch (err) {
  //     _restoreBoard(dispatch)
  //     _alertUser(dispatch, 'Failed to save board, please check your internet connection')
  //     console.log('Err in saving board:', err);
  //   }
  // }
}


export function addTask(taskTitle, groupId, boardToSave, user, activity) {

  activity.id = utilService.makeId()
  activity.byMember = user
  const newTask = boardService.addNewTask(taskTitle, activity)

  const groupIdx = boardToSave.groups.findIndex((group) => groupId === group.id);
  boardToSave.groups[groupIdx].tasks.push(newTask);
  return saveBoard(boardToSave)
  // return async (dispatch) => {
  //   _setBackupBoard(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOARD",
  //       board: boardToSave,
  //     });
  //     await boardService.saveBoard(boardToSave)
  //   } catch (err) {
  //     _restoreBoard(dispatch)
  //     _alertUser(dispatch, 'Failed to save board, please check your internet connection')
  //     console.log('Err in saving board:', err);
  //   }
  // }
}

export function saveTask(taskToSave, groupId, boardToSave, user, activity, comment) {

  if (activity) {
    activity.id = utilService.makeId()
    activity.byMember = user
    taskToSave.activities = [activity, ...taskToSave.activities]
  }
  if (comment) {
    comment.id = utilService.makeId()
    comment.byMember = user
    taskToSave.comments = [comment, ...taskToSave.comments]
  }

  const groupIdx = boardToSave.groups.findIndex((group) => groupId === group.id);
  const updatedtasks = boardToSave.groups[groupIdx].tasks.map((task) => {
    return task.id === taskToSave.id ? taskToSave : task
  });
  boardToSave.groups[groupIdx].tasks = updatedtasks
  return saveBoard(boardToSave)
  
  // return async (dispatch) => {
  //   _setBackupBoard(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOARD",
  //       board: boardToSave,
  //     });
  //     await boardService.saveBoard(boardToSave)
  //   } catch (err) {
  //     _restoreBoard(dispatch)
  //     _alertUser(dispatch, 'Failed to save board, please check your internet connection')
  //     console.log('Err in saving board:', err);
  //   }
  // }
}


// **BOARD BACK UP **

function _setBackupBoard(dispatch) {
  dispatch({
    type: "SET_BACKUP_BOARD"
  })
}

function _restoreBoard(dispatch) {
  dispatch({
    type: "RESTORE_BOARD"
  })
}

function _alertUser(dispatch, txt) {
  dispatch({ type: 'SET_MSG', msg: { txt } })


}

// **MODALS ACTIONS**

export function setActiveModal(activeModal) {
  // console.log('active modal', activeModal);
  return (dispatch) => {
    dispatch({
      type: "SET_ACTIVE_MODAL",
      activeModal: activeModal
    });
  };
}

export function setTaskModal(isTaskDetailsOpen) {
  return (dispatch) => {
    dispatch({
      type: "SET_TASK_MODAL",
      isTaskDetailsOpen: isTaskDetailsOpen
    })
  }
}