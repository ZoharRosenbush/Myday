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
    console.log('the borad is in serivce',boardId)
    return storageService.get(STORAGE_KEY,boardId)
}