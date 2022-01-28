import {
  CgProfile
} from "react-icons/cg";
import {
  httpService
} from "./http.service.js";
import {
  socketService
} from "./socket.service.js";
import {
  utilService
} from "./utils.service.js";

// const STORAGE_KEY = "boardDB";

export const boardService = {
  query,
  getById,
  saveBoard,
  removeBoard,
  getNewBoard,
  updateBoardTitle,
  getNewGroup,
  addNewTask,

};


// ****BOARD - CRUD ***

async function query() {
  const boards = await httpService.get('board/');
  return boards
}

async function getById(boardId) {
  const board = await httpService.get(`board/${boardId}`)
  return board
}

async function saveBoard(boardToSave) {
  if (boardToSave._id) {
    const savedBoard = await httpService.put(`board/${boardToSave._id}`, boardToSave);
    socketService.emit('member updated board', boardToSave._id)
    return savedBoard
  } else {
    const addedBoard = await httpService.post('board/', boardToSave);
    if (socketService.socket) {
      socketService.emit('member updated board-list')
    }
    return addedBoard
  }
}

async function updateBoardTitle(board) {
  await saveBoard(board)
  if (socketService.socket) {
    socketService.emit('member updated board-list')
  }
}

async function removeBoard(boardId) {
  const removedBoardId = await httpService.delete(`board/${boardId}`)
  if (socketService.socket) {
    socketService.emit('member updated board-list')
  }
  return removedBoardId
}


function addNewTask(taskTitle, activity) {

  return {
    id: utilService.makeId(),
    title: taskTitle,
    status: "Empty",
    text: "",
    priority: "Empty",
    role: "Empty",
    type: "Empty",
    "cost": "Empty",
    activities: [activity],
    timeline: ["Jan 17-22", "Jan 19-22"],
    owner: [{
      "fullname": "Guest",
      "acronyms": "G",
      "_id": utilService.makeId(),
      "username": "guest",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
      "userColor": "transparent"
    }],
    comments: [],
  };
}

function getNewGroup(user) {
  return {
    id: utilService.makeId(),
    title: "New Group",
    tasks: [{
      id: utilService.makeId(),
      title: "New Task",
      status: "Empty",
      "cost": "Empty",
      priority: "Empty",
      text: "",
      role: "Empty",
      type: "Empty",
      activities: [{
        byMember: user,
        createdAt: Date.now(),
        id: utilService.makeId(),
        txt: "Created new task"
      }],
      timeline: ["Jan 17-22", "Jan 19-22"],
      owner: [{
        "fullname": "Guset",
        "acronyms": "G",
        "_id": utilService.makeId(),
        "username": "guest",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
        "userColor": "transparent"
      }],
      comments: [],
    },],
    style: {
      groupColor: utilService.getNiceRandomColor()
    },
  }
}

function getNewBoard(user) {
  if (!user) {
    user = {
      "fullname": "Guest",
      "acronyms": "G",
      "_id": utilService.makeId(),
      "username": "guest",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
      "userColor": "transparent"
    }
  }
  return {
    cmpsOrder: [
      "status-picker",
      "date-picker",
      "member-picker",
      "priority-picker",
      "text",
      "cost",
      "type-picker",
      "role-picker"
    ],
    title: "New Board",
    description: "This board is for managing a single project. You can customize this board to suit your project needs: add columns, subtasks, automations, dashboards and more!",
    createdBy: {
      "_id": "61edc3e7652f5891aac4c063",
      "acronyms": "AL",
      "fullname": "Ann Lee",
      "username": "Ann Lee",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg",
      "userColor": "#fcc4f7"
    },
    "lastSeen": [{
      "_id": "61edc3e7652f5891aac4c063",
      "acronyms": "AL",
      "fullname": "Ann Lee",
      "username": "Ann Lee",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg",
      "userColor": "#fcc4f7"
    },
    {
      "_id": "61edc551652f5891aac5830c",
      "acronyms": "HG",
      "fullname": "Henry Gold",
      "username": "Henry Gold",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
      "userColor": "#00c875"
    },
    {
      "_id": "61edc3c5652f5891aac4aed6",
      "acronyms": "LT",
      "fullname": "Lora Turner",
      "username": "Lora Turner",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg",
      "userColor": "#E2445C"
    }
    ],
    statuses: [{
      id: "la123",
      value: "Empty",
      bgColor: "#c4c4c4",
      color: "#c4c4c4"
    },
    {
      id: "la555",
      value: "Done",
      bgColor: "#00C875",
      color: "#fff"
    },
    {
      id: "la666",
      value: "Stuck",
      bgColor: "#E2445C",
      color: "#fff"
    },
    {
      id: "la777",
      value: "Working on it",
      bgColor: "#FDAB3D",
      color: "#fff",
    },
    ],
    priorities: [{
      id: "lb111",
      value: "Empty",
      bgColor: "#c4c4c4",
      color: "#c4c4c4"
    },
    {
      id: "lb222",
      value: "Low",
      bgColor: "#66ccff",
      color: "#fff"
    },
    {
      id: "lb333",
      value: "Medium",
      bgColor: "#0086c0",
      color: "#fff"
    },
    {
      id: "lb444",
      value: "High",
      bgColor: "#225091",
      color: "#fff"
    },
    ],
    "members": [{
      "_id": "61edc3e7652f5891aac4c063",
      "acronyms": "AL",
      "fullname": "Ann Lee",
      "username": "Ann Lee",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg",
      "userColor": "#fcc4f7"
    },
    {
      "_id": "61edc551652f5891aac5830c",
      "acronyms": "HG",
      "fullname": "Henry Gold",
      "username": "Henry Gold",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
      "userColor": "#00c875"

    },
    {
      "_id": "61edc3c5652f5891aac4aed6",
      "acronyms": "LT",
      "fullname": "Lora Turner",
      "username": "Lora Turner",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg",
      "userColor": "#e2445c"
    }
    ],
    types: [{
      id: "tp111",
      value: "Empty",
      bgColor: "#c4c4c4",
      color: "#c4c4c4"
    },
    {
      id: "tp222",
      value: "Quality",
      bgColor: "#fcc4f7",
      color: "#fff"
    },
    {
      id: "tp333",
      value: "Feature",
      bgColor: "#00c875",
      color: "#fff"
    },
    {
      id: "tp444",
      value: "Bug",
      bgColor: "#e2445c",
      color: "#fff"
    },
    {
      id: "tp555",
      value: "Improvement",
      bgColor: "#a25ddc",
      color: "#fff"
    },
    {
      id: "tp666",
      value: "Security",
      bgColor: "#ffadad",
      color: "#fff"
    },
    ],
    roles: [{
      id: "rl111",
      value: "Empty",
      bgColor: "#c4c4c4",
      color: "#c4c4c4"
    },
    {
      id: "rl222",
      value: "Dev",
      bgColor: "#279165",
      color: "#fff"
    },
    {
      id: "rl333",
      value: "Design",
      bgColor: "#0086c0",
      color: "#fff"
    },
    {
      id: "rl444",
      value: "Product",
      bgColor: "#a25ddc",
      color: "#fff"
    },
    ],
    groups: [{
      id: "GJKN10",
      title: "Group 1",
      tasks: [{
        id: "fdd2",
        title: "New Task",
        status: "Empty",
        priority: "Empty",
        cost: "Empty",
        role: "Empty",
        text: "hello",
        type: "Empty",
        activities: [{
          byMember: user,
          createdAt: Date.now(),
          id: utilService.makeId(),
          txt: "Created new task"
        }],
        timeline: ["Jan 17-22", "Jan 19-22"],
        owner: [{
          "fullname": "Guset",
          "acronyms": "G",

          "_id": utilService.makeId(),
          "username": "guest",
          "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
          "userColor": "transparent"
        }],
        comments: [],
      },],
      style: {
        groupColor: utilService.getNiceRandomColor()
      },
    },
    {
      id: "gds21",
      title: "Group 2",
      tasks: [{
        id: "csdf101",
        title: "New Task",
        status: "Empty",
        priority: "Empty",
        role: "Empty",
        text: "Enter text!",
        cost: "Empty",
        type: "Empty",
        activities: [{
          byMember: user,
          createdAt: Date.now(),
          id: utilService.makeId(),
          txt: "Created new task"
        }],
        timeline: ["Jan 17-22", "Jan 19-22"],
        owner: [{
          "fullname": "Guset",
          "acronyms": "G",

          "_id": utilService.makeId(),
          "username": "guest",
          "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
          "userColor": "transparent"
        },],
        comments: [],
      },],
      style: {
        groupColor: utilService.getNiceRandomColor()
      },
    },
    {
      id: "gzcdsxsv101",
      title: "Group 3",
      tasks: [{
        id: "cdszxvc101",
        title: "New Task",
        status: "Empty",
        priority: "Empty",
        role: "Empty",
        text: "Enter text!",
        cost: "Empty",
        type: "Empty",
        activities: [{
          byMember: user,
          createdAt: Date.now(),
          id: utilService.makeId(),
          txt: "Created new task"
        }],
        timeline: ["Jan 17-22", "Jan 19-22"],
        owner: [{
          "fullname": "Guset",
          "acronyms": "G",

          "_id": utilService.makeId(),
          "username": "guest",
          "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
          "userColor": "transparent"
        },],
        comments: [],
      },],
      style: {
        groupColor: utilService.getNiceRandomColor()
      },
    },
    ],
  }
}