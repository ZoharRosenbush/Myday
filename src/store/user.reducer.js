
import {userService} from '../services/userService'
const initialState = {
    // TODO: REMOVE USER
    user: userService.getLoggedinUser() || null,
    users: null,
    admin: true
};
export function userReducer(state = initialState, action) {

    let newState = state;
    switch (action.type) {
        // case "UPDATE_USER":
        //     newState = {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             fullname: action.userPref.name,
        //             color: action.userPref.color,
        //             bgColor: action.userPref.bgColor,
        //         },
        //     };
        //     break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case "SET_USER":
            newState = {
                ...state,
                user: action.user,
            };
            break;
        default:
    }
    return newState;
}