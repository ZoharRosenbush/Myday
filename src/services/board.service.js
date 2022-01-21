import { storageService } from "./async-storage.service.js";
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
};

function query(filterBy) {
  return storageService.query(STORAGE_KEY);
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId);
}

function save(boardToSave) {
  if (boardToSave._id) {
    return storageService.put(STORAGE_KEY, boardToSave);
  } else {
    return storageService.post(STORAGE_KEY, boardToSave);
  }
}
async function saveTask(taskToSave, groupId, boardId) {
  try {
    const board = await getById(boardId);
    const groupIdx = board.groups.findIndex((group) => groupId === group.id);

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
      priority: "Empty",
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
    };
    const board = await getById(boardId);
    board.groups.push(groupToSave);
    console.log("board:", board);

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

function remove(boardId) {
  return storageService.remove(STORAGE_KEY, boardId);
}

function getNewBoard() {
  const newBoard = {
    cmpsOrder: [
      "status-picker",
      "member-picker",
      "date-picker",
      "priority-picker",
    ],
    title: "New Board",
    description:
      "This board is for managing a single project. You can customize this board to suit your project needs: add columns, subtasks, automations, dashboards and more!",
    createdBy: {
      _id: "u108",
      acronyms: "AA",
      fullname: "Abi Abambi",
      username: "Abush",
      imgUrl: "http://some-img",
    },
    statuses: [
      { id: "la123", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
      { id: "la555", value: "Done", bgColor: "#00d647", color: "#fff" },
      { id: "la666", value: "Stuck", bgColor: "#ff3d57", color: "#fff" },
      {
        id: "la777",
        value: "Working on it",
        bgColor: "#ffcb00",
        color: "#fff",
      },
    ],
    priorities: [
      { id: "lb111", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
      { id: "lb222", value: "Low", bgColor: "#66ccff", color: "#fff" },
      { id: "lb333", value: "Medium", bgColor: "#0086c0", color: "#fff" },
      { id: "lb444", value: "High", bgColor: "#225091", color: "#fff" },
    ],
    members: [
      {
        _id: "u101",
        acronyms: "ME",
        fullname: "May Elgrat",
        username: "May Elgrat",
        imgUrl:
          "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
      },
      {
        _id: "u108",
        acronyms: "LS",
        fullname: "Lee Segal",
        username: "Lee Segal",
        imgUrl: "http://some-img",
      },
      {
        _id: "u1099",
        acronyms: "ZR",
        fullname: "Zohar Rosenbush",
        username: "Zohar Rosenbush",
        imgUrl: "http://some-img",
      },
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
        style: { groupColor: "rgb(255 21 138)" },
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
        style: { groupColor: "rgb(0, 134, 192)" },
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
  let red = "#ff3d57";
  let orange = "#ffcb00";
  let green = "#00d647";
  let blue = "#0073ea";
  let darkblue = "#292f4c";

  let niceColors = [darkblue, blue, green, orange, red];
  let drawnNum = getRandomIntInclusive(0, niceColors.length);
  let randColor = niceColors[drawnNum];
  return randColor;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
