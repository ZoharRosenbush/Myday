import {
    userService
} from "../services/userService.js";
import { utilService } from '../services/utils.service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({
                type: 'LOADING_START'
            })
            const users = await userService.getUsers()
            dispatch({
                type: 'SET_USERS',
                users
            })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({
                type: 'LOADING_DONE'
            })
        }
    }
}



export function login(credentials) {
    console.log('the cred in useract', credentials)
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user

        } catch (err) {
            console.log('no user found', err)
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            const fullName = user.fullname.split(' ')
            user.acronyms = `${fullName[0].substring(0, 1)}${fullName[1].substring(0, 1)}`.toUpperCase()
            dispatch({
                type: 'SET_USER',
                user
            })

        } catch (err) {
            console.log('Cannot signup')
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })

        } catch (err) {
            console.log('Cannot logout');
        }
    }
}



// export function log(credentials) {
//   console.log('credentials', credentials);
//   return async (dispatch) => {
//     try {
//       const user = await userService.login(credentials);
//       console.log('user', user);

//       const action = { type: "SET_USER", user };
//       dispatch(action);
//     } catch (err) {
//       console.log("err login", err);
//     }
//   };
// }
// export function signup(credentials) {
//   return async (dispatch) => {
//     try {
//       const user = await userService.signup(credentials);
//       console.log('user', user);
//       const action = { type: "SET_USER", user };
//       dispatch(action);
//     } catch (err) {
//       console.log("err signup", err);
//     }
//   };
// }

// export function logout() {
//   console.log('logout action');
//   return async (dispatch) => {
//     try {
//       await userService.logout();
//       const action = { type: "SET_USER", user: null };
//       dispatch(action);
//     } catch (err) {
//         console.log("err logout", err);
//     }
//   };
// }