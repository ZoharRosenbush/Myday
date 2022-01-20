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
      fullname: "Abi Abambi",
      username: "Abush",
      imgUrl: "http://some-img",
    },
    statuses: [
      { id: "la123", value: "", color: "grey" },
      { id: "la555", value: "Done", color: "green" },
      { id: "la666", value: "Stuck", color: "red" },
      { id: "la777", value: "Working on it", color: "orange" },
    ],
    priorities: [
      { id: "lb111", value: "Low", color: "grey" },
      { id: "lb222", value: "Medium", color: "green" },
      { id: "lb333", value: "High", color: "red" },
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
        id: "g1012",
        title: "Group 1",
        tasks: [
          {
            id: "c101",
            title: "Group Title",
            status: "",
            priority: "High",
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
          },
          {
            id: "g12112",
            title: "Group 2",
            tasks: [
              {
                id: "c101",
                title: "Group Title",
                status: "",
                priority: "High",
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
              },
            ],
          },
        ],
        style: { groupColor: "red" },
      },
    ],
  };
  return newBoard;
}
