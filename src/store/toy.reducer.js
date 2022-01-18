// import {userService} from '../services/user.service.js'

const initialState = {
    toys: [],
    filterBy: {
        isInStock: 'ALL',
        name: '',
        labels: [],
    },
}


export function toyReducer(state = initialState, action) {

    let newState = state

    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: [...action.toys] }
        case 'ADD_TOY':
            return { ...state, toys: [action.toy, ...state.toys] }
        case 'REMOVE_TOY':
            newState = { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
            break;
        case 'UPDATE_TOY':
            return {
                ...state, toys: state.toys.map((toy) => {
                    return (toy._id === action.toy._id) ? action.toy : toy
                })
            }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        default:
            newState = state
    }


    return newState;
}