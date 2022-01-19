import { boards } from '../helpers/monday.js'
import { storageService } from './async-storage.service.js'
const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById
}

function query(filterBy) {
    console.log('log in query')
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(boardId)
}