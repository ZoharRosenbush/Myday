export const storageService = {
    query,
    get,
    // post,
    // put,
    // remove,
}

function query(entityType, filterBy, delay = 500) {
    let entities = JSON.parse(localStorage.getItem(entityType)) || _createBoards()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const board = entities.find(entity => entity._id === entityId)
            return board
        })
}


function _save(entityType, entities) {
    console.log('entityType:', entityType);
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 4) {
    console.log('make randId')
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _createBoards() {
    console.log('creating demo boards')
    const boards = [
        {
            "_id": _makeId(),
            "title": "Sprint 4",
            "description": "This board is for managing a single project. You can customize this board to suit your project needs: add columns, subtasks, automations, dashboards and more!",
            // "createdAt": 1589983468418,
            "createdBy": {
                "_id": "u108",
                "fullname": "Abi Abambi",
                "username": "Abush",
                "imgUrl": "http://some-img"
            },
            "members": [
                {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "username": "Talus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                {
                    "_id": "u108",
                    "fullname": "Abi Abambi",
                    "username": "Abush",
                    "imgUrl": "http://some-img"
                }
            ],
            "groups": [
                {
                    "id": "g101",
                    "title": "Group 1",
                    "tasks": [
                        {
                            "id": "c101",
                            "title": "Replace Logo",
                            "status": "Done",
                            "priority": "High",
                            "timeline": "Jan 18-23",
                            "owner": [{
                                "_id": "u108",
                                "fullname": "Abi Abambi",
                                "username": "Abush",
                                "imgUrl": "http://some-img"
                            }],
                            "comments": [
                                {
                                    "id": "ZdPnm",
                                    "txt": "also @yaronb please CR this",
                                    "createdAt": 15909998174360,
                                    "byMember": {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "username": "Talus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                }
                            ],
                        }
                    ],
                    "style": { "groupColor": "red" },
                    "activities": [
                        {
                            "id": "a101",
                            "txt": "Changed Color",
                            "createdAt": Date.now(),
                            "byMember": {
                                "_id": "u108",
                                "fullname": "Abi Abambi",
                                "imgUrl": "http://some-img"
                            },

                        }

                    ],
                },
            ],
            "cmpsOrder": ["status-picker", "member-picker", "date-picker", "priority-picker"]
        }
    ]
    localStorage.setItem('boardDB', JSON.stringify(boards))
    return boards;
}