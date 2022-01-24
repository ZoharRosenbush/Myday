import { storageService } from "./async-storage.service.js";
import { httpService } from "./http.service.js";
const STORAGE_KEY = "boardDB";

export const boardService = {
  query,
  getById,
  save,
  remove,
  getNewBoard,
  saveTask,
  saveGroup,
  addTask,
  addGroup,
  deleteGroup,
  deleteTask,
};

function query(filterBy) {
  return httpService.get('board/');
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`);
}

function save(boardToSave) {
  if (boardToSave._id) {
    return httpService.put(`board/${boardToSave._id}`, boardToSave);
  } else {
    return httpService.post('board/', boardToSave);
  }
}

function remove(boardId) {
  return httpService.delete(`board/${boardId}`);
}

async function saveTask(taskToSave, groupId, boardId) {
  console.log('taskToSave:', taskToSave);
  console.log('groupId:', groupId);

  try {
    const board = await getById(boardId);
    const groupIdx = board.groups.findIndex((group) => groupId === group.id);
    console.log('groupIdx:', groupIdx);

    const tasksToSave = board.groups[groupIdx].tasks.map((task) => {
      return task.id === taskToSave.id ? taskToSave : task;
    });
    board.groups[groupIdx].tasks = tasksToSave;
    save(board);
    return board;
  } catch (err) {
    console.log("err:", err);
  }
}

async function addTask(value, groupId, boardId) {
  try {
    const taskToSave = {
      id: _makeId(),
      title: value,
      status: "Empty",
      text: "",
      priority: "Empty",
      role: "Empty",
      type: "Empty",
      timeline: ["Jan 30-22", "Feb 02-22"],
      owner: [
        {
          _id: "u101",
          acronyms: "ME",
          fullname: "May Elgrat",
          username: "May Elgrat",
          imgUrl:
            "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
        },
      ],
      comments: [],
    };
    const board = await getById(boardId);
    const groupIdx = board.groups.findIndex((group) => groupId === group.id);
    board.groups[groupIdx].tasks.push(taskToSave);
    save(board);
    return board;
  } catch (err) {
    console.log("err:", err);
  }
}

async function addGroup(boardId) {
  try {
    const groupToSave = {
      id: _makeId(),
      title: "New Group",
      tasks: [
        {
          id: _makeId(),
          title: "New Task",
          status: "Empty",
          priority: "Empty",
          text: "",
          role: "Empty",
          type: "Empty",
          timeline: ["Jan 30-22", "Feb 02-22"],
          owner: [
            {
              fullname: "Ann Lee",
              _id: "u101",
              acronyms: "AL",
              username: "Ann Lee",
              imgUrl: "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg"
            }
          ],
          comments: [],
        },
      ],
      style: { groupColor: getNiceRandomColor() },
      activities: [],
    };
    const board = await getById(boardId);
    board.groups.push(groupToSave);
    // console.log("board:", board);

    save(board);
    return board;
  } catch (err) {
    console.log("err:", err);
  }
}

async function saveGroup(groupToSave, boardId) {
  try {
    const board = await getById(boardId);
    const groupIdx = board.groups.findIndex(
      (group) => groupToSave.id === group.id
    );
    board.groups[groupIdx] = groupToSave;
    save(board);
    return board;
  } catch (err) {
    console.log("err:", err);
  }
}

async function deleteGroup(groupId, boardId) {
  try {
    const board = await getById(boardId);
    const newGroups = board.groups.filter((group) => {
      return group.id !== groupId;
    });
    board.groups = newGroups;
    // const newReviews = book.reviews.filter((review) => review.id !== reviewId);
    // book.reviews = newReviews;
    // books[bookIdx] = book;

    save(board);
    return board;
  } catch (err) {
    console.log("err:", err);
  }
}

async function deleteTask(taskId, groupId, boardId) {
  try {
    const board = await getById(boardId);
    console.log('board in service:', board);

    const groupIdx = board.groups.findIndex((group) => groupId === group.id);
    const newTasks = board.groups[groupIdx].tasks.filter((task) => {
      return task.id !== taskId;
    });
    console.log('newTasks:', newTasks);
    board.groups[groupIdx].tasks = newTasks;

    save(board);
    return board;
  } catch (err) {
    console.log("err:", err);
  }
}



function getNewBoard() {
  const newBoard = {
    cmpsOrder: [
      "status-picker",
      "member-picker",
      "type-picker",
      "date-picker",
      "priority-picker",
      "role-picker",
      "text"
    ],
    title: "New Board",
    description:
      "This board is for managing a single project. You can customize this board to suit your project needs: add columns, subtasks, automations, dashboards and more!",
    createdBy: {
      "_id": "u101",
      "acronyms": "AL",
      "fullname": "Ann Lee",
      "username": "Ann Lee",
      "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg"
    },
    "lastSeen": [
      {
        "_id": "u101",
        "acronyms": "AL",
        "fullname": "Ann Lee",
        "username": "Ann Lee",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg"
      },
      {
        "_id": "u108",
        "acronyms": "HG",
        "fullname": "Henry Gold",
        "username": "Henry Gold",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg"
      },
      {
        "_id": "u1099",
        "acronyms": "LT",
        "fullname": "Lora Turner",
        "username": "Lora Turner",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg"
      }
    ],
    statuses: [
      { id: "la123", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
      { id: "la555", value: "Done", bgColor: "#00C875", color: "#fff" },
      { id: "la666", value: "Stuck", bgColor: "#E2445C", color: "#fff" },
      {
        id: "la777",
        value: "Working on it",
        bgColor: "#FDAB3D",
        color: "#fff",
      },
    ],
    priorities: [
      { id: "lb111", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
      { id: "lb222", value: "Low", bgColor: "#66ccff", color: "#fff" },
      { id: "lb333", value: "Medium", bgColor: "#0086c0", color: "#fff" },
      { id: "lb444", value: "High", bgColor: "#225091", color: "#fff" },
    ],
    "members": [
      {
        "_id": "u101",
        "acronyms": "AL",
        "fullname": "Ann Lee",
        "username": "Ann Lee",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968393/Ann_Lee_e6tybh.jpg"
      },
      {
        "_id": "u108",
        "acronyms": "HG",
        "fullname": "Henry Gold",
        "username": "Henry Gold",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg"
      },
      {
        "_id": "u1099",
        "acronyms": "LT",
        "fullname": "Lora Turner",
        "username": "Lora Turner",
        "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968384/Lora_Turner_gqzvpz.jpg"
      }
    ],
    types: [
      { id: "tp111", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
      { id: "tp222", value: "Quality", bgColor: "#fcc4f7", color: "#fff" },
      { id: "tp333", value: "Feature", bgColor: "#00c875", color: "#fff" },
      { id: "tp444", value: "Bug", bgColor: "#e2445c", color: "#fff" },
      { id: "tp555", value: "Improvement", bgColor: "#a25ddc", color: "#fff" },
      { id: "tp666", value: "Security", bgColor: "#ffadad", color: "#fff" },
    ],
    roles: [
      { id: "rl111", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
      { id: "rl222", value: "Dev", bgColor: "#279165", color: "#fff" },
      { id: "rl333", value: "Design", bgColor: "#0086c0", color: "#fff" },
      { id: "rl444", value: "Product", bgColor: "#a25ddc", color: "#fff" },
    ],
    groups: [
      {
        id: "GJKN10",
        title: "Group 1",
        tasks: [
          {
            id: "fdd2",
            title: "New Task",
            status: "Empty",
            priority: "Empty",
            role: "Empty",
            type: "Empty",
            timeline: ["Jan 30-22", "Feb 02-22"],
            owner: [
              {
                _id: "u1099",
                acronyms: "ZR",
                fullname: "Zohar Rosenbush",
                username: "Zohar Rosenbush",
                imgUrl: "http://some-img",
              },
            ],
            comments: [],
          },
        ],
        style: { groupColor: getNiceRandomColor() },
        activities: [],
      },
      {
        id: "gds21",
        title: "Group 2",
        tasks: [
          {
            id: "csdf101",
            title: "New Task",
            status: "Empty",
            priority: "Empty",
            role: "Empty",
            type: "Empty",
            timeline: ["Jan 30-22", "Feb 02-22"],
            owner: [
              {
                _id: "u1099",
                acronyms: "ZR",
                fullname: "Zohar Rosenbush",
                username: "Zohar Rosenbush",
                imgUrl: "http://some-img",
              },
            ],
            comments: [],
          },
        ],
        style: { groupColor: getNiceRandomColor() },
        activities: [],
      },
      {
        id: "gzcdsxsv101",
        title: "Group 3",
        tasks: [
          {
            id: "cdszxvc101",
            title: "New Task",
            status: "Empty",
            priority: "Empty",
            role: "Empty",
            type: "Empty",
            timeline: ["Jan 30-22", "Feb 02-22"],
            owner: [
              {
                _id: "u1099",
                acronyms: "ZR",
                fullname: "Zohar Rosenbush",
                username: "Zohar Rosenbush",
                imgUrl: "http://some-img",
              },
            ],
            comments: [],
          },
        ],
        style: { groupColor: getNiceRandomColor() },
        activities: [],
      },
    ],
  };
  return newBoard;
}

function _makeId(length = 4) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getNiceRandomColor() {
  let red = "#E2445C";
  let orange = "#FDAB3D";
  let green = "#00C875";
  let blue = "#0073ea";
  let pink = "#FAA1F1";
  let darkblue = "#292f4c";

  let niceColors = [darkblue, pink, blue, green, orange, red];
  let drawnNum = getRandomIntInclusive(0, niceColors.length - 1);
  let randColor = niceColors[drawnNum];
  return randColor;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
