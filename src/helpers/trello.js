// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level, 
// PUT /api/board/b123/task/t678

//    (no need for seperate APIs for mini-updates of task parts like members or status)
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities
// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task


// <BoardDetails> => <BoardGroup v-for>
// <BoardGroup> => <TaskPreview v-for>
// <TaskDetails> (+edit) - initially can be loaded in seperate route (later on we can place it in a modal and nested route)



// Store - saveTask
function storeSaveTask(task, activity) {
    const activity = {
        "id": makeId(),
        "txt": "Changed Color",
        "createdAt": Date.now(),
        "byMember": userService.getLoggedinUser(),
        "task": task
    }
    board = boardService.saveTask(boardId, groupId, task, activity)
    commit(board)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    return board
}

// boardStore-action
async function loadAndWatchBoard(boardId) {
    // load from service and commit to store
    // subscribe to socket and commit to store
}



const board = {
    "_id": "b101",
    "title": "Sprint 4",
    "description": "This board is for managing a single project. You can customize this board to suit your project needs: add columns, subtasks, automations, dashboards and more!",
    // "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u108",
        "fullname": "Abi Abambi",
        "username": "Abush",
        "imgUrl": "http://some-img"
    },
    // "labels": [
    //     {
    //         "id": "l101",
    //         "title": "Done",
    //         "color": "#61bd4f"
    //     }
    // ],
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
                    // "description": "description",
                    // think about adding more features such as like, seen, reply
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

    // for monday
    "cmpsOrder": ["status-picker", "member-picker", "date-picker", "priority-picker"]
}




const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus: 'Done',
        statuses: [{ "value": 'Done', "color": 'green' }, {}]
    }
}

const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers: ['m1', 'm2'],
        members: ['m1', 'm2', 'm3']
    }
}

const cmp3 = {
    type: 'date-picker',
    info: {
        selectedDate: '2022-09-07',
    }
}
const cmp4 = {
    type: 'priority-picker',
    info: {
        selectedStatus: 'High',
        priorities: [{}, {}]
    }
}




// {
//     "id": "g102",
//     "title": "Group 2",
//     "tasks": [
//         {
//             "id": "c103",
//             "title": "Do that"
//         },
//         {
//             "id": "c104",
//             "title": "Help me",
//             "status": "in-progress",
//             "description": "description",
//             "comments": [
//                 {
//                     "id": "ZdPnm",
//                     "txt": "also @yaronb please CR this",
//                     "createdAt": 1590999817436.0,
//                     "byMember": {
//                         "_id": "u101",
//                         "fullname": "Tal Tarablus",
//                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                     }
//                 }
//             ],
//             "checklists": [
//                 {
//                     "id": "YEhmF",
//                     "title": "Checklist",
//                     "todos": [
//                         {
//                             "id": "212jX",
//                             "title": "To Do 1",
//                             "isDone": false
//                         }
//                     ]
//                 }
//             ],
//             "members": [
//                 {
//                     "_id": "u101",
//                     "username": "Tal",
//                     "fullname": "Tal Tarablus",
//                     "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                 }
//             ],
//             "labelIds": ["l101", "l102"],
//             "createdAt": 1590999730348,
//             "dueDate": 16156215211,
//             "byMember": {
//                 "_id": "u101",
//                 "username": "Tal",
//                 "fullname": "Tal Tarablus",
//                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//             },
//             "style": {
//                 "bgColor": "#26de81"
//             }
//         }
// ],
// "style": {}
// }

const user = {
    "_id": "u108",
    "fullname": "Abi Abambi",
    // "username": "abi@ababmi.com",
    "username": "Abush",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }]
}

// For Monday Mostly:
// Dynamic Components: 
// <TaskPreview> => <tr> 
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>

function updateTask(cmpType, data) {
    // Switch
    // task.members = data;
    // task.status = data;
}

