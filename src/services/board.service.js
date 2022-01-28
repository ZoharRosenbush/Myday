// import { storageService } from "./async-storage.service.js";
import {
  httpService
} from "./http.service.js";
import {
  socketService
} from "./socket.service.js";
import {
  utilService
} from "./utils.service.js";
import {
  CgProfile
} from "react-icons/cg";

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


//maybe change later to getBoard()
async function getById(boardId) {
  const board = await httpService.get(`board/${boardId}`)
  return board
}

async function saveBoard(boardToSave) {
  if (boardToSave._id) {
    const updatedBoard = await httpService.put(`board/${boardToSave._id}`, boardToSave);
    socketService.emit('member updated board', boardToSave._id)
    console.log('finished saving boardd');
    return updatedBoard
  } else {
    const addedBoard = await httpService.post('board/', boardToSave);
    console.log('adding');
    socketService.emit('member updated board-list')
    return addedBoard
  }
}

async function updateBoardTitle(board) {
  await saveBoard(board)
  console.log('finihed 2 ');
  socketService.emit('member updated board-list')
}

async function removeBoard(boardId) {
  const removedBoardId = await httpService.delete(`board/${boardId}`);
  socketService.emit('member updated board-list')
  return removedBoardId
}




// **** GROUPS - CRUD ***


// 

// async function addGroup(board) {
//   try {

//     // console.log("board:", board);
//     // _saveGroup(newGroup, board);
//     saveBoard(board)
//     console.log('started adding group');

//   } catch (err) {
//     console.log("err:", err);
//   }
// }

// async function saveGroup(groupToSave, board) {
//   try {
//     const groupIdx = board.groups.findIndex(
//       (group) => groupToSave.id === group.id
//     );

//     board.groups[groupIdx] = groupToSave;
//     // _saveGroup(groupToSave, board._id);
//     saveBoard(board)
//     return board;
//   } catch (err) {
//     console.log("err:", err);
//   }
// }

// async function deleteGroup(groupId, board) {

//   try {
//     const filteredGroups = board.groups.filter((group) => {
//       return group.id !== groupId;
//     });
//     board.groups = filteredGroups
//     // _removeGroup(groupId, board._id)
//     saveBoard(board)
//     return board;
//   } catch (err) {
//     console.log("err:", err);
//   }
// }



// **** TASKS - CRUD ***


// async function saveTask(taskToSave, groupId, board) {
//   try {
//     const groupIdx = board.groups.findIndex((group) => groupId === group.id);
//     const tasksToSave = board.groups[groupIdx].tasks.map((task) => {
//       return task.id === taskToSave.id ? taskToSave : task;
//     });
//     board.groups[groupIdx].tasks = tasksToSave;
//     saveBoard(board);
//     return board;
//   } catch (err) {
//     console.log("err:", err);
//   }
// }

// async function addTask(value, groupId, board) {
//   try {
//     const groupIdx = board.groups.findIndex((group) => groupId === group.id);
//     board.groups[groupIdx].tasks.push(taskToSave);
//     saveBoard(board);
//     return board;
//   } catch (err) {
//     console.log("err:", err);
//   }
// }


// async function deleteTask(taskId, groupId, board) {
//   try {
//     const groupIdx = board.groups.findIndex((group) => groupId === group.id);
//     const newTasks = board.groups[groupIdx].tasks.filter((task) => {
//       return task.id !== taskId;
//     });
//     console.log('newTasks:', newTasks);
//     board.groups[groupIdx].tasks = newTasks;

//     saveBoard(board);
//     return board;
//   } catch (err) {
//     console.log("err:", err);
//   }
// }

// function _getNewBoards() {
//   const boards = [
//     getNewBoard()
//   ]
//   return boards
// }

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
      "fullname": "Guset",
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

// function _makeId(length = 4) {
//   var text = "";
//   var possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// function getNiceRandomColor() {
//   let red = "#E2445C";
//   let orange = "#FDAB3D";
//   let green = "#00C875";
//   let blue = "#0073ea";
//   let pink = "#FAA1F1";
//   let darkblue = "#292f4c";

//   let niceColors = [darkblue, pink, blue, green, orange, red];
//   let drawnNum = getRandomIntInclusive(0, niceColors.length - 1);
//   let randColor = niceColors[drawnNum];
//   return randColor;
// }
// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
// }



// function makeId(length = 4) {
//   var text = "";
//   var possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }


// async function saveBoard(boardToSave) {
//   if (boardToSave._id) {
//     const updatedBoard = await httpService.put(`board/${boardToSave._id}`, boardToSave);
//     socketService.emit('member updated board', boardToSave._id)
//     // console.log('finished updatinggg');
//     return updatedBoard
//   } else {
//     const addedBoard = await httpService.post('board/', boardToSave);
//     return addedBoard
//   }
// }

// async function removeBoard(boardId) {
//   const removedBoardId = await httpService.delete(`board/${boardId}`);
//   return removedBoardId
// }


// async function _saveGroup(groupToSave, boardId) {

//   //   const savedGroup = await httpService.post(`board/${boardId}/${groupToSave.id}`, groupToSave);
//   //   console.log('succesfuly added group');
//   //   return savedGroup
//   // }

//   // async function _removeGroup(groupToRemove, boardId) {

//   //   const removedGroupId = await httpService.delete(`board/${boardId}/${groupToRemove.id}`);
//   //   return removedGroupId
//   // }