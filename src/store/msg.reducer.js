// import {userService} from '../services/user.service.js'

const initialState = {
    msg: {txt: ''}
}


export function msgReducer(state = initialState, action) {

    let newState = state

    switch (action.type) {
        case 'SET_MSG':
            newState = { ...state, msg: action.msg }
            break;
    }
    return newState;
}