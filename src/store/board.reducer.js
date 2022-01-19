// import {userService} from '../services/user.service.js'

const initialState = {
  boards: [],
  board: {},
  activities: [],
};

export function boardReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {


    case "SET_BOARDS":
      return { ...state, boards: [...action.boards] };

    case "SET_BOARD":
      return { ...state, board: { ...action.board } };

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
    //     case 'REMOVE_TOY':
    //         newState = { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
    //         break;
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
