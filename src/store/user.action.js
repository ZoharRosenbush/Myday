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