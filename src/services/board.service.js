import { storageService } from "./async-storage.service.js";
const STORAGE_KEY = "boardDB";

export const boardService = {
  query,
  getById,
  save,
  remove,
  getNewBoard,
  saveTask,
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
      { id: "la777", value: "Working on it", bgColor: "#ffcb00", color: "#fff" },
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
            timeline: "Jan 18-23",
            owner: [
              {
                _id: "u1099",
                acronyms: "ZR",
                fullname: "Zohar Rosenbush",
                username: "Zohar Rosenbush",
                imgUrl: "http://some-img",
              },
            ],
            comments: [

            ],
          },
        ],
        style: { groupColor: "rgb(255 21 138)" },
        activities: [

        ],
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
            timeline: "Jan 18-23",
            owner: [
              {
                _id: "u1099",
                acronyms: "ZR",
                fullname: "Zohar Rosenbush",
                username: "Zohar Rosenbush",
                imgUrl: "http://some-img",
              },
            ],
            comments: [

            ],
          },
        ],
        style: { groupColor: "rgb(162, 93, 220)" },
        activities: [

        ],
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
            timeline: "Jan 18-23",
            owner: [
              {
                _id: "u1099",
                acronyms: "ZR",
                fullname: "Zohar Rosenbush",
                username: "Zohar Rosenbush",
                imgUrl: "http://some-img",
              },
            ],
            comments: [

            ],
          },
        ],
        style: { groupColor: "rgb(0, 134, 192)" },
        activities: [

        ],
      },
    ],
  };
  return newBoard;
}
