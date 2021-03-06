// import {userService} from '../services/user.service.js'

const initialState = {
  boards: [],
  board: null,
  backupBoard: null,
  activeModal: {
    cmpType: null,
    boardId: null,
    taskId: null,
    groupId: null
  },
  isBoardNavOpen: false,
  isTaskDetailsOpen: false,
  activities: [],
  currFilterBy: {
    status: [],
    priority: [],
    type: [],
    role: [],
    member: []
  },
  search: "",
  boardsSearch: ""
};

export function boardReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case "SET_BOARDS":
      return {
        ...state, boards: [...action.boards]
      };
    case "UPDATE_BOARDS":
      return {
        ...state, boards: state.boards.map((board) => {
          return (board._id === action.board._id) ? action.board : board
        })
      }
    case "SET_SEARCH":
      return {
        ...state, search: action.search
      }
    case "SET_BOARDS_SEARCH":
      return {
        ...state, boardsSearch: action.boardsSearch
      }
    case "SET_FILTER":
      return {
        ...state, currFilterBy: { ...state.currFilterBy, ...action.currFilterBy }
      };
    case "SET_BOARD":
      return {
        ...state, board: {
          ...action.board
        }
      };
    case "SET_BACKUP_BOARD":
      const backupBoard = state.board
      return {
        ...state, backupBoard
      }
    case "RESTORE_BOARD":
      const boardBackup = state.backupBoard
      return {
        ...state, board: boardBackup
      };
    case "ADD_BOARD":
      return {
        ...state, boards: [...state.boards, action.board]
      }
    case "REMOVE_BOARD":
      return {
        ...state, boards: state.boards.filter(board => board._id !== action.boardId)
      }
    case "SET_ACTIVE_MODAL":
      return {
        ...state, activeModal: action.activeModal
      }
    case "SET_BOARD_NAV":
      return {
        ...state, isBoardNavOpen: action.isBoardNavOpen
      }
    case "SET_TASK_MODAL":
      return {
        ...state, isTaskDetailsOpen: action.isTaskDetailsOpen
      }
    //     case 'ADD_GROUP':
    //         return { ...state, board: { ...state.board, groups: [action.group, ...groups] } }
    //     case 'EDIT_GROUP':
    //         return {
    //             ...state, board: {
    //                 ...state.board, groups: state.board.groups.map((group) => {
    //                     return (group._id === action.group._id) ? action.group : group
    //                 })
    //             }
    //         }
    //     // case 'EDIT_TASK':
    //     //     return {...state, board:{...state.board,groups[action.idx]:}}
    //     // case 'ADD_TASK':
    //     //     return {
    //     //         ...state, board: {
    //     //             ...state.board, state.board.groups.find((group) => {
    //     //                return (group._id === action.group._id)? action.group : group)
    //     //             })
    //     //         }

    //     case 'UPDATE_TOY':
    //         return {
    //             ...state, toys: state.toys.map((toy) => {
    //                 return (toy._id === action.toy._id) ? action.toy : toy
    //             })
    //         }
    //     case 'SET_FILTER':
    //         return { ...state, filterBy: action.filterBy }
    default:
      newState = state
  }
  // // groups[action.group].tasks:[...tasks]
  return newState;
}

// update task (groupIdtaskId){
//     finds group

//     dispatch(EDITGROUP)

// }