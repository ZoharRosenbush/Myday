import { storageService } from './async-storage.service.js'
const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    remove
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function save(boardToSave) {
    if (boardToSave._id) {
        return storageService.put(STORAGE_KEY, boardToSave)
    } else {
        return storageService.post(STORAGE_KEY, boardToSave)
    }
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)

}

